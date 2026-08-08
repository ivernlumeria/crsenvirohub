import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to save polygons to Supabase
export async function savePolygon(polygonData) {
  const { data, error } = await supabase
    .from('polygons')
    .insert([
      {
        name: polygonData.name,
        coordinates: polygonData.coordinates,
        layer_name: polygonData.layer_name,
        color: polygonData.color,
        created_at: new Date(),
      },
    ]);

  if (error) {
    console.error('Error saving polygon:', error);
    return null;
  }
  return data;
}

// Helper function to fetch all polygons
export async function getPolygons() {
  const { data, error } = await supabase
    .from('polygons')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching polygons:', error);
    return [];
  }
  return data;
}

// Helper function to delete a polygon
export async function deletePolygon(id) {
  const { error } = await supabase
    .from('polygons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting polygon:', error);
    return false;
  }
  return true;
}
