import sqlite3

conn = sqlite3.connect('data/the_last_caretaker.db')
cursor = conn.cursor()

# Get table schema
cursor.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='poi'")
result = cursor.fetchone()

if result:
    print("POI Table Schema:")
    print(result[0])
else:
    print("Table 'poi' not found")

# Get column info
cursor.execute("PRAGMA table_info(poi)")
columns = cursor.fetchall()
if columns:
    print("\nColumns:")
    for col in columns:
        print(f"  {col[1]} ({col[2]})")

conn.close()
