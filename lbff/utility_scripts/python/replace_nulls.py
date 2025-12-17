import sqlite3

def replace_nulls_with_unknown(db_path='data/the_last_caretaker.db'):
    """
    Replace NULL values with 'Unknown' for all text fields except x and y coordinates.
    """
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Text fields to update (excluding x, y, depth, psi which are integers, and name which should never be NULL)
        text_fields = ['type', 'bio_hostiles', 'mech_hostiles', 'salvage', 'power', 'beacon', 'notes']
        
        updates_made = 0
        
        for field in text_fields:
            cursor.execute(f"UPDATE poi SET {field} = 'Unknown' WHERE {field} IS NULL")
            count = cursor.rowcount
            if count > 0:
                print(f"Updated {count} rows in '{field}' column")
                updates_made += count
        
        conn.commit()
        print(f"\n✓ Total updates: {updates_made} NULL values replaced with 'Unknown'")
        
        conn.close()
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False
    
    return True


if __name__ == "__main__":
    replace_nulls_with_unknown()
