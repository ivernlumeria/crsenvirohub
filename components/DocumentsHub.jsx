'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const BUCKET_NAME = 'Documents';

const PERMIT_OPTIONS = ['All Permits', 'PE 32614', 'PE 31452', 'PE 24047', 'PE 19330'];
const DOC_TYPES = ['Permit', 'Report', 'Correspondence', 'Other'];

const DocumentsHub = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filterPermit, setFilterPermit] = useState('All Permits');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [permit, setPermit] = useState(PERMIT_OPTIONS[1]);
  const [docType, setDocType] = useState(DOC_TYPES[0]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert('Please provide a title and select a file.');
      return;
    }

    setUploading(true);
    try {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = permit + '/' + timestamp + '_' + safeName;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from('documents').insert([
        {
          title: title,
          description: description,
          permit: permit,
          doc_type: docType,
          file_path: filePath,
          file_url: urlData.publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      setTitle('');
      setDescription('');
      setFile(null);
      e.target.reset();

      alert('Document uploaded successfully!');
      loadDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc) => {
    const confirmed = confirm('Delete "' + doc.title + '"?');
    if (!confirmed) return;

    try {
      const { error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([doc.file_path]);

      if (storageError) console.error('Storage delete error:', storageError);

      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', doc.id);

      if (dbError) throw dbError;

      setDocuments(documents.filter(function (d) { return d.id !== doc.id; }));
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document');
    }
  };

  const filteredDocs =
    filterPermit === 'All Permits'
      ? documents
      : documents.filter(function (d) { return d.permit === filterPermit; });

  const docTypeColor = (type) => {
    if (type === 'Permit') return 'bg-blue-100 text-blue-800';
    if (type === 'Report') return 'bg-green-100 text-green-800';
    if (type === 'Correspondence') return 'bg-amber-100 text-amber-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full h-full flex gap-4 bg-gray-50 p-4 overflow-y-auto">
      <div className="w-96 bg-white shadow-lg rounded-lg p-5 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Upload Document</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder="e.g. RSE Report Q2 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Related Permit</label>
            <select
              value={permit}
              onChange={(e) => setPermit(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              {PERMIT_OPTIONS.filter(function (p) { return p !== 'All Permits'; }).map(function (p) {
                return (
                  <option key={p} value={p}>
                    {p}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              {DOC_TYPES.map(function (t) {
                return (
                  <option key={t} value={t}>
                    {t}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder="Optional notes about this document"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File *</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded transition"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </div>

      <div className="flex-1 bg-white shadow-lg rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Documents ({filteredDocs.length})
          </h2>
          <select
            value={filterPermit}
            onChange={(e) => setFilterPermit(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            {PERMIT_OPTIONS.map(function (p) {
              return (
                <option key={p} value={p}>
                  {p}
                </option>
              );
            })}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading documents...</p>
        ) : filteredDocs.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {filteredDocs.map(function (doc) {
              return (
                <div
                  key={doc.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-gray-800">{doc.title}</h3>
                      <span className={'text-xs px-2 py-0.5 rounded-full font-medium ' + docTypeColor(doc.doc_type)}>
                        {doc.doc_type}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {doc.permit}
                      </span>
                    </div>
                    {doc.description && (
                      <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 font-medium">View or Download</a>
                    <button
                      onClick={function () { handleDelete(doc); }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsHub;