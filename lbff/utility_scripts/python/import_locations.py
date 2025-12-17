import sqlite3
import csv

def import_locations_csv(csv_file_path='import/The Last Caretaker - Locations.csv', 
                         db_path='data/the_last_caretaker.db'):
    """
    Import POI data from 'The Last Caretaker - Locations.csv' into the poi table.
    
    CSV columns: X, Y, Name, Type, Bio Hostiles, Mech Hostiles, Salvage, Power, Beacon, Depth, Floor Depth, PSI, Notes
    DB columns:  x, y, name, type, bio_hostiles, mech_hostiles, salvage, power, beacon, depth, psi, notes
    """
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Open and read CSV file
        with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            
            # Prepare insert statement
            insert_query = '''
                INSERT OR REPLACE INTO poi 
                (name, x, y, type, bio_hostiles, mech_hostiles, salvage, power, beacon, depth, psi, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            '''
            
            # Track statistics
            rows_inserted = 0
            rows_failed = 0
            
            # Import each row
            for row_num, row in enumerate(csv_reader, start=2):  # start=2 because row 1 is header
                try:
                    # Extract and clean values
                    name = row.get('Name', '').strip()
                    if not name:
                        print(f"Skipping row {row_num}: No name provided")
                        rows_failed += 1
                        continue
                    
                    # Parse X and Y coordinates
                    x_val = row.get('X', '').strip()
                    y_val = row.get('Y', '').strip()
                    
                    try:
                        x = int(x_val) if x_val else None
                    except ValueError:
                        x = None
                        
                    try:
                        y = int(y_val) if y_val else None
                    except ValueError:
                        y = None
                    
                    # Parse Depth (handle values like "> 60")
                    depth_val = row.get('Depth', '').strip()
                    try:
                        # Remove ">" or other non-numeric characters and convert
                        depth_clean = depth_val.replace('>', '').strip()
                        depth = int(depth_clean) if depth_clean else None
                    except ValueError:
                        depth = None
                    
                    # Parse PSI
                    psi_val = row.get('PSI', '').strip()
                    try:
                        psi = int(psi_val) if psi_val else None
                    except ValueError:
                        psi = None
                    
                    # Other text fields
                    type_val = row.get('Type', '').strip() or None
                    bio_hostiles = row.get('Bio Hostiles', '').strip() or None
                    mech_hostiles = row.get('Mech Hostiles', '').strip() or None
                    salvage = row.get('Salvage', '').strip() or None
                    power = row.get('Power', '').strip() or None
                    beacon = row.get('Beacon', '').strip() or None
                    notes = row.get('Notes', '').strip() or None
                    
                    values = (
                        name,
                        x,
                        y,
                        type_val,
                        bio_hostiles,
                        mech_hostiles,
                        salvage,
                        power,
                        beacon,
                        depth,
                        psi,
                        notes
                    )
                    
                    cursor.execute(insert_query, values)
                    rows_inserted += 1
                    print(f"✓ Imported: {name}")
                    
                except Exception as e:
                    print(f"✗ Error on row {row_num}: {e}")
                    print(f"  Row data: {row}")
                    rows_failed += 1
            
            # Commit changes
            conn.commit()
            
            # Print summary
            print(f"\n{'='*50}")
            print(f"Import completed:")
            print(f"  ✓ Successfully imported: {rows_inserted} rows")
            if rows_failed > 0:
                print(f"  ✗ Failed: {rows_failed} rows")
            print(f"{'='*50}")
            
        conn.close()
        
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_file_path}' not found")
        return False
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False
    
    return True


if __name__ == "__main__":
    import_locations_csv()
