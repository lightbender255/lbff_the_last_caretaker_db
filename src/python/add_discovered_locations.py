import sqlite3
import csv

def add_discovered_locations(csv_file_path='import/discovered_locations.csv', 
                              db_path='data/the_last_caretaker.db'):
    """
    Add POI names from discovered_locations.csv that don't exist in the database yet.
    """
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Read existing POI names
        cursor.execute("SELECT name FROM poi")
        existing_names = {row[0].lower().strip() for row in cursor.fetchall()}
        
        print(f"Found {len(existing_names)} existing POIs in database")
        print()
        
        # Read CSV file
        with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            
            new_pois = []
            already_exists = []
            
            for row in csv_reader:
                name = row.get('name', '').strip()
                if not name:
                    continue
                
                # Check if name already exists (case-insensitive)
                if name.lower() in existing_names:
                    already_exists.append(name)
                else:
                    new_pois.append(name)
            
            # Display findings
            if already_exists:
                print(f"Already in database ({len(already_exists)}):")
                for name in already_exists:
                    print(f"  ✓ {name}")
                print()
            
            if new_pois:
                print(f"New POIs to add ({len(new_pois)}):")
                for name in new_pois:
                    print(f"  + {name}")
                print()
                
                # Insert new POIs with just the name
                insert_query = "INSERT INTO poi (name) VALUES (?)"
                for name in new_pois:
                    cursor.execute(insert_query, (name,))
                
                conn.commit()
                print(f"✓ Successfully added {len(new_pois)} new POIs to the database")
            else:
                print("No new POIs to add - all names already exist in the database")
        
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
    add_discovered_locations()
