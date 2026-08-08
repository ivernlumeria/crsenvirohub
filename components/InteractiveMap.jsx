'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '@/lib/supabase';

const InteractiveMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const drawnItems = useRef(new L.FeatureGroup());
  const [polygons, setPolygons] = useState([]);
  const [permits, setPermits] = useState([]);
  const [loading, setLoading] = useState(false);

  // Color palette for permits
  const permitColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#95E1D3'];

  // Initialize map and load data
  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    // Create map centered on Madagascar
    map.current = L.map(mapContainer.current).setView([-18.8792, 46.8696], 7);

    // Add OpenTopoMap tiles
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution:
        'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
    }).addTo(map.current);

    // Add drawn items layer group
    map.current.addLayer(drawnItems.current);

    // Create layer control
    const baseLayers = {
      OpenTopoMap: L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 17,
          attribution:
            'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
        }
      ),
      OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }),
      Satellite: L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Tiles &copy; Esri',
        }
      ),
    };

    const overlayLayers = {
      'User Drawn Shapes': drawnItems.current,
    };

    L.control.layers(baseLayers, overlayLayers, { position: 'topright' }).addTo(map.current);

    // Load permit boundaries from GeoJSON
    loadPermitBoundaries();

    // Load saved polygons from Supabase
    loadPolygons();
  }, []);

  // Load permit boundaries from GeoJSON file
  const loadPermitBoundaries = async () => {
    try {
      const response = await fetch('/pesites.json');
      const data = await response.json();

      // Verified order: PE 32614 / PE 31452 / PE 24047 / PE 19330
      const permitNames = ['PE 32614', 'PE 31452', 'PE 24047', 'PE 19330'];

      const loadedPermits = [];
      let colorIndex = 0;

      const geometries = data.type === 'GeometryCollection' ? data.geometries : data.features.map(f => f.geometry);

      geometries.forEach((geometry) => {
        const color = permitColors[colorIndex % permitColors.length];
        const name = permitNames[colorIndex] || `Permit ${colorIndex + 1}`;
        let layer = null;

        if (geometry.type === 'Polygon') {
          const coords = geometry.coordinates[0].map((point) => [point[1], point[0]]);
          layer = L.polygon(coords, {
            color,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.3,
          })
            .bindPopup(`<strong>${name}</strong><br>Permit Boundary`)
            .addTo(map.current);
        } else if (geometry.type === 'MultiPolygon') {
          const layerGroup = L.layerGroup();
          geometry.coordinates.forEach((polygonCoords) => {
            const coords = polygonCoords[0].map((point) => [point[1], point[0]]);
            L.polygon(coords, {
              color,
              weight: 2,
              opacity: 0.8,
              fillOpacity: 0.3,
            })
              .bindPopup(`<strong>${name}</strong><br>Permit Boundary`)
              .addTo(layerGroup);
          });
          layerGroup.addTo(map.current);
          layer = layerGroup;
        }

        loadedPermits.push({
          name,
          color,
          coordinates: geometry.coordinates,
          type: geometry.type,
          layer, // stored so we can zoom to it from the legend
        });

        colorIndex++;
      });

      setPermits(loadedPermits);
    } catch (error) {
      console.error('Error loading permit boundaries:', error);
      alert('Could not load permit boundaries. Check pesites.json format in console.');
    }
  };

  // Zoom map to a permit's boundary
  const zoomToPermit = (permit) => {
    if (!permit.layer || !map.current) return;
    const bounds = permit.layer.getBounds();
    map.current.fitBounds(bounds, { padding: [40, 40] });
  };

  // Load polygons from Supabase
  const loadPolygons = async () => {
    try {
      const { data, error } = await supabase
        .from('polygons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPolygons(data || []);

      // Add saved polygons to map
      data?.forEach((polygon) => {
        addPolygonToMap(polygon);
      });
    } catch (error) {
      console.error('Error loading polygons:', error);
    }
  };

  // Add polygon to map display
  const addPolygonToMap = (polygon) => {
    if (polygon.coordinates && polygon.coordinates[0]) {
      const coords = polygon.coordinates[0].map((point) => [point[1], point[0]]);
      L.polygon(coords, {
        color: polygon.color || '#3388ff',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.3,
      })
        .bindPopup(`<strong>${polygon.name}</strong>`)
        .addTo(drawnItems.current);
    }
  };

  // Save polygon to Supabase
  const savePolygon = async (polygonData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('polygons').insert([polygonData]);

      if (error) throw error;

      setPolygons([...polygons, polygonData]);
      alert('Polygon saved to database!');
    } catch (error) {
      console.error('Error saving polygon:', error);
      alert('Error saving polygon');
    } finally {
      setLoading(false);
    }
  };

  // Delete polygon from Supabase
  const deletePolygon = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('polygons').delete().eq('id', id);

      if (error) throw error;

      setPolygons(polygons.filter((p) => p.id !== id));
      // Refresh map
      drawnItems.current.clearLayers();
      loadPolygons();
    } catch (error) {
      console.error('Error deleting polygon:', error);
      alert('Error deleting polygon');
    } finally {
      setLoading(false);
    }
  };

  // Update polygon in Supabase
  const updatePolygon = async (id, updates) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('polygons').update(updates).eq('id', id);

      if (error) throw error;

      setPolygons(polygons.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    } catch (error) {
      console.error('Error updating polygon:', error);
      alert('Error updating polygon');
    } finally {
      setLoading(false);
    }
  };

  const handlePolygonRename = (id, newName) => {
    updatePolygon(id, { name: newName });
  };

  return (
    <div className="w-full h-full flex gap-4 bg-gray-50">
      {/* Map Container */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1" ref={mapContainer} style={{ height: '100vh' }} />
      </div>

      {/* Sidebar with Legend and Polygon Management */}
      <div className="w-96 bg-white shadow-lg overflow-y-auto p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Legend & Management</h2>

        {/* Permit Boundaries Legend */}
        <div className="mb-6 pb-4 border-b">
          <h3 className="font-semibold mb-3 text-gray-700">
            Permit Boundaries ({permits.length})
          </h3>
          {permits.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Loading permits...</p>
          ) : (
            <div className="space-y-2">
              {permits.map((permit, idx) => (
                <div
                  key={idx}
                  onClick={() => zoomToPermit(permit)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-1 py-1 transition"
                >
                  <div
                    className="w-4 h-4 rounded flex-shrink-0"
                    style={{
                      backgroundColor: permit.color,
                      border: '1px solid #333',
                    }}
                  />
                  <span className="text-sm text-gray-700">{permit.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Drawn Polygons */}
        <div className="mb-6 border-t pt-4 flex-1">
          <h3 className="font-semibold mb-3 text-gray-700">
            Your Polygons ({polygons.length})
          </h3>
          {polygons.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No saved polygons yet. Coming soon: drawing tools!
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {polygons.map((polygon) => (
                <div
                  key={polygon.id}
                  className="bg-gray-100 p-3 rounded hover:bg-gray-200 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={polygon.name}
                        onChange={(e) =>
                          handlePolygonRename(polygon.id, e.target.value)
                        }
                        className="w-full text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-blue-400 px-1"
                      />
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: polygon.color || '#3388ff' }}
                        />
                        <span className="text-xs text-gray-500">
                          {new Date(polygon.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePolygon(polygon.id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 disabled:text-gray-400 ml-2 flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-3 rounded text-xs text-gray-700 border-l-4 border-blue-400">
          <strong>Status:</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>✅ Real permit boundaries loaded from pesites.json</li>
            <li>✅ Click a permit in the legend to zoom to it</li>
            <li>✅ Connected to Supabase</li>
            <li>⏳ Drawing tools coming next</li>
          </ul>
        </div>

        {loading && (
          <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded text-sm text-center">
            Saving...
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;