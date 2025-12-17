const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../src/generated/client-local');

async function importData() {
    console.log('Importing data from SQL file...');
    const prisma = new PrismaClient();

    try {
        // Read and parse the SQL file
        const sqlPath = path.join(__dirname, '../data/poi_data.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf-8');
        
        // Extract INSERT statements
        const insertRegex = /INSERT INTO poi \([^)]+\) VALUES \(([^;]+)\);/g;
        const matches = [...sqlContent.matchAll(insertRegex)];
        
        console.log(`Found ${matches.length} POI records to import.`);
        
        for (const match of matches) {
            const values = match[1];
            // Parse the values (basic parsing - handles strings, numbers, and NULL)
            const parsed = parseValues(values);
            
            await prisma.poi.create({
                data: {
                    name: asString(parsed[0]),
                    x: asInt(parsed[1]),
                    y: asInt(parsed[2]),
                    type: asString(parsed[3]),
                    bio_hostiles: asString(parsed[4]),
                    mech_hostiles: asString(parsed[5]),
                    salvage: asString(parsed[6]),
                    power: asString(parsed[7]),
                    beacon: asString(parsed[8]),
                    depth_m: asInt(parsed[9]),
                    ocean_floor_depth_m: asInt(parsed[10]),
                    top_depth_m: asInt(parsed[11]),
                    max_explored_depth_m: asInt(parsed[12]),
                    max_psi_reached: asInt(parsed[13]),
                    notes: asString(parsed[14])
                }
            });
        }
        
        console.log('POIs imported successfully.');
        
        // Check for lookup values
        const lookupRegex = /INSERT INTO lookup_values \([^)]+\) VALUES \(([^;]+)\);/g;
        const lookupMatches = [...sqlContent.matchAll(lookupRegex)];
        
        if (lookupMatches.length > 0) {
            console.log(`Found ${lookupMatches.length} lookup values to import.`);
            
            for (const match of lookupMatches) {
                const values = match[1];
                const parsed = parseValues(values);
                
                await prisma.lookupValue.create({
                    data: {
                        category: parsed[1],
                        value: parsed[2]
                    }
                });
            }
            console.log('Lookup values imported successfully.');
        }
        
        const count = await prisma.poi.count();
        console.log(`Total POIs in database: ${count}`);
        
    } catch (error) {
        console.error('Import failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

function parseValues(valuesStr) {
    const values = [];
    let current = '';
    let inString = false;
    let escapeNext = false;
    
    for (let i = 0; i < valuesStr.length; i++) {
        const char = valuesStr[i];
        
        if (escapeNext) {
            current += char;
            escapeNext = false;
            continue;
        }
        
        if (char === '\\') {
            escapeNext = true;
            continue;
        }
        
        if (char === "'") {
            if (inString) {
                // Check for doubled single quote
                if (valuesStr[i + 1] === "'") {
                    current += "'";
                    i++;
                } else {
                    inString = false;
                }
            } else {
                inString = true;
            }
            continue;
        }
        
        if (char === ',' && !inString) {
            values.push(parseValue(current.trim()));
            current = '';
            continue;
        }
        
        current += char;
    }
    
    if (current.trim()) {
        values.push(parseValue(current.trim()));
    }
    
    return values;
}

function parseValue(str) {
    if (str === 'NULL') {
        return null;
    }
    
    // Return the raw value - we'll type cast later
    return str;
}

function asString(val) {
    if (val === null || val === '') {
        return null;
    }
    return String(val);
}

function asInt(val) {
    if (val === null || val === '') {
        return null;
    }
    const num = Number(val);
    if (isNaN(num)) {
        return null;
    }
    return num;
}

importData();
