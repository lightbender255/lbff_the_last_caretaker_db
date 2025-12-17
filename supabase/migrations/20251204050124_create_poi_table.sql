/*
  # Create POI Table for The Last Caretaker

  ## Overview
  This migration creates the `poi` (Point of Interest) table for managing underwater locations
  from The Last Caretaker game database. The table stores all POI information including
  coordinates, resource information, and depth metrics.

  ## New Tables
  - `poi`
    - `id` (uuid, primary key)
    - `name` (text, required) - Name of the POI
    - `x` (numeric, nullable) - X coordinate
    - `y` (numeric, nullable) - Y coordinate
    - `type` (text, nullable) - Type of location
    - `bio_hostiles` (text, nullable) - Presence of biological hostiles (Yes/No/Unknown)
    - `mech_hostiles` (text, nullable) - Presence of mechanical hostiles (Yes/No/Unknown)
    - `salvage` (text, nullable) - Salvageable resources (Yes/No/In Progress)
    - `power` (text, nullable) - Power availability (Yes/No/Unknown)
    - `beacon` (text, nullable) - Beacon status (Yes/No/Restored/In Progress)
    - `depth_m` (numeric, nullable) - Depth in meters
    - `ocean_floor_depth_m` (numeric, nullable) - Ocean floor depth in meters
    - `top_depth_m` (numeric, nullable) - Top depth in meters
    - `max_explored_depth_m` (numeric, nullable) - Maximum explored depth in meters
    - `max_psi_reached` (numeric, nullable) - Maximum PSI pressure reached
    - `notes` (text, nullable) - User notes about the POI
    - `created_at` (timestamp) - Record creation time
    - `updated_at` (timestamp) - Record update time

  ## Security
  - Enable RLS on the `poi` table
  - Add policy allowing authenticated users to read and manage all POI data
  - Note: This app allows all authenticated users full access to the shared POI database
*/

CREATE TABLE IF NOT EXISTS poi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  x numeric,
  y numeric,
  type text,
  bio_hostiles text,
  mech_hostiles text,
  salvage text,
  power text,
  beacon text,
  depth_m numeric,
  ocean_floor_depth_m numeric,
  top_depth_m numeric,
  max_explored_depth_m numeric,
  max_psi_reached numeric,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE poi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all POIs"
  ON poi FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert POIs"
  ON poi FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update POIs"
  ON poi FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete POIs"
  ON poi FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_poi_name ON poi(name);
CREATE INDEX IF NOT EXISTS idx_poi_type ON poi(type);
