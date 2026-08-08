'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const InteractiveMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const drawnItems = useRef(new L.FeatureGroup());
  const [polygons, setPolygons] = useState([]);

  // Define permit boundaries
  const permitBoundaries = {
    PE_32614: {
      name: 'PE 32614',
      color: '#FF6B6B',
      coordinates: [
        [-19.8, 44.5],
        [-19.8, 44.6],
        [-19.9, 44.6],
        [-19.9, 44.5],
      ],
    },
    PE_31452: {
      name: 'PE 31452',
      color: '#4ECDC4',
      coordinates: [
        [-19.85, 44.7],
        [-19.85, 44.8],
        [-19.95, 44.8],
        [-19.95, 44.7],
      ],
    },
    PE_24047: {
      name: 'PE 24047',
      color: '#45B7D1',
      coordinates: [
        [-19.7, 44.4],
        [-19.7, 44.5],
        [-19.8, 44.5],
        [-19.8, 44.4],
      ],
    },
    PE_19330: {
      name: 'PE 19330',
      color: '#FFA07A',
      coordinates: [
        [-19.75, 44.6],
        [-19.75, 44.7],
        [-19.85, 44.7],
        [-19.85, 44.6],
      ],
    },
  };

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

    // Add permit polygons
    Object.entries(permitBoundaries).forEach(([key, permit]) => {
      L.polygon(permit.coordinates, {
        color: permit.color,
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.3,
      })
        .bindPopup(`<strong>${permit.name}</strong><br>Permit Area`)
        .addTo(map.current);
    });

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
  }, []);

  const handlePolygonRename = (id, newName) => {
    setPolygons(
      polygons.map((p) =>
        p.id === id ? { ...p, name: newName } : p
      )
    );
  };

  const handlePolygonDelete = (id) => {
    setPolygons(polygons.filter((p) => p.id !== id));
  };

  return (
    <div className="w-full h-full flex gap-4 bg-gray-50">
      {/* Map Container */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1" ref={mapContainer} style={{ height: '100vh' }} />
      </div>

      {/* Sidebar with Legend */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Legend & Layers</h2>

        {/* Map Layers Legend */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-700">Permit Boundaries</h3>
          <div className="space-y-2">
            {Object.entries(permitBoundaries).map(([key, permit]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: permit.color,
                    border: '1px solid #333',
                  }}
                />
                <span className="text-sm text-gray-700">{permit.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Drawn Polygons */}
        <div className="mb-6 border-t pt-4">
          <h3 className="font-semibold mb-3 text-gray-700">Your Polygons</h3>
          {polygons.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              Draw polygons on the map to see them here
            </p>
          ) : (
            <div className="space-y-2">
              {polygons.map((polygon) => (
                <div
                  key={polygon.id}
                  className="bg-gray-100 p-2 rounded flex items-center justify-between hover:bg-gray-200 transition"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: polygon.color }}
                    />
                    <input
                      type="text"
                      value={polygon.name}
                      onChange={(e) =>
                        handlePolygonRename(polygon.id, e.target.value)
                      }
                      className="text-xs bg-transparent border-0 focus:outline-none flex-1 min-w-0"
                    />
                  </div>
                  <button
                    onClick={() => handlePolygonDelete(polygon.id)}
                    className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 p-3 rounded text-xs text-gray-700 border-l-4 border-blue-400">
          <strong>How to use:</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Use layer controls (top-right) to toggle visibility</li>
            <li>Click permits to see their info</li>
            <li>More drawing tools coming soon!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;