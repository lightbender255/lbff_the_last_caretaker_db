import sqlite3
import csv
import sys

def import_poi_csv(csv_file_path, db_path='data/the_last_caretaker.db'):
    """
    Import POI data from a CSV file into the poi table.
    
    CSV should have headers matching the table columns:
    name, x, y, type, bio_hostiles, mech_hostiles, salvage, power, beacon, depth, psi, notes
    
    Args:
        csv_file_path: Path to the CSV file
        db_path: Path to the SQLite database (default: data/the_last_caretaker.db)
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
                    # Extract values, converting empty strings to None for INTEGER fields
                    values = (
                        row.get('name', '').strip() or None,
                        int(row.get('x', '')) if row.get('x', '').strip() else None,
                        int(row.get('y', '')) if row.get('y', '').strip() else None,
                        row.get('type', '').strip() or None,
                        row.get('bio_hostiles', '').strip() or None,
                        row.get('mech_hostiles', '').strip() or None,
                        row.get('salvage', '').strip() or None,
                        row.get('power', '').strip() or None,
                        row.get('beacon', '').strip() or None,
                        int(row.get('depth', '')) if row.get('depth', '').strip() else None,
                        int(row.get('psi', '')) if row.get('psi', '').strip() else None,
                        row.get('notes', '').strip() or None
                    )
                    
                    cursor.execute(insert_query, values)
                    rows_inserted += 1
                    
                except Exception as e:
                    print(f"Error on row {row_num}: {e}")
                    print(f"Row data: {row}")
                    rows_failed += 1
            
            # Commit changes
            conn.commit()
            
            # Print summary
            print(f"\nImport completed:")
            print(f"  ✓ Successfully imported: {rows_inserted} rows")
            if rows_failed > 0:
                print(f"  ✗ Failed: {rows_failed} rows")
            
        conn.close()
        
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_file_path}' not found")
        sys.exit(1)
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python import_poi_csv.py <csv_file_path>")
        print("\nExample:")
        print("  python import_poi_csv.py data/poi_data.csv")
        sys.exit(1)
    
    csv_path = sys.argv[1]
    import_poi_csv(csv_path)
