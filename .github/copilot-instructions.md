# Copilot Instructions for The Last Caretaker POI Tracker

## Project Overview
This is an Electron desktop application that provides a SQLite database interface for tracking Points of Interest (POIs) and other data from the game "The Last Caretaker". The application allows users to create, edit, and manage POI records through a grid-based UI.

## Technology Stack
- **Runtime**: Electron (desktop application framework)
- **Backend**: SQLite database (via sql.js)
- **Cloud Sync**: Supabase for remote database functionality
- **Frontend**: HTML/JavaScript (vanilla)
- **Build Tool**: electron-builder
- **Dev Tool**: Vite (for web components)
- **Scripting**: JavaScript (Node.js) and Python for utility scripts

## Project Structure
```
├── .github/              # GitHub configuration and workflows
│   └── workflows/        # CI/CD workflows
├── data/                 # SQLite database files
├── src/
│   ├── electron/         # Main Electron app files
│   │   ├── main.js       # Main process
│   │   ├── renderer.js   # Renderer process
│   │   ├── preload.js    # Preload script for IPC
│   │   └── index.html    # Main UI
│   ├── web/              # Web-based components
│   ├── lib/              # Shared libraries (e.g., Supabase client)
│   └── utility_scripts/  # Data migration and utility scripts
│       ├── javascript/   # Node.js utility scripts
│       └── python/       # Python utility scripts
├── supabase/             # Supabase configuration and migrations
│   └── migrations/       # SQL migration files
├── import/               # Data import files
└── build/                # Build resources (icons, etc.)
```

## Development Commands
- `npm start` - Start the Electron application in production mode
- `npm run dev` - Start the Electron application in development mode with hot reload
- `npm run dist` - Build distributable packages (MSI for Windows, DEB for Linux)

## Key Dependencies
- `electron` - Desktop application framework
- `sql.js` - SQLite compiled to WebAssembly for in-browser/Electron use
- `@supabase/supabase-js` - Cloud database sync
- `vite` - Build tool for web components
- `electron-builder` - Package and build Electron apps

## Code Style and Conventions
- Use ES6+ JavaScript features
- Prefer `const` and `let` over `var`
- Use async/await for asynchronous operations
- Follow existing file naming conventions (lowercase with underscores for utility scripts)
- Add comments for complex database queries or data transformations

## Database Schema
- Primary table: `poi` - stores Point of Interest data from the game
- Database file location: `data/the_last_caretaker.db`
- Migrations are stored in `supabase/migrations/`
- Use SQL files for schema changes

## IPC Communication
The app uses Electron's IPC (Inter-Process Communication):
- Main process handles database operations
- Renderer process handles UI
- Preload script exposes safe IPC methods to renderer

## Testing
- No formal test suite currently exists
- Manual testing by running `npm run dev`
- Build verification through GitHub Actions CI/CD

## Build and Release
- CI/CD runs on push to `main` branch
- Builds for both Ubuntu (AppImage, DEB) and Windows (MSI, EXE)
- Tagged releases trigger automatic GitHub releases

## Utility Scripts
- JavaScript utilities in `src/utility_scripts/javascript/` - for data migration and analysis
- Python utilities in `src/utility_scripts/python/` - for data import and schema management
- These are standalone scripts, not part of the main app

## Important Notes
- The database file is watched for changes and auto-reloads
- Supabase integration allows cloud sync (optional feature)
- Icon generation scripts support both Python and JavaScript
- The app is designed for single-user desktop use

## When Making Changes
1. **Database changes**: Create new migration files in `supabase/migrations/`
2. **UI changes**: Modify `src/electron/index.html` and `src/electron/renderer.js`
3. **Main process logic**: Update `src/electron/main.js`
4. **Build configuration**: Modify `package.json` build section
5. **Ignore**: Do not commit `node_modules/`, `dist/`, or log files (see `.gitignore`)

## Common Tasks
- **Add a new POI field**: Update database schema, UI HTML, and renderer logic
- **Add utility script**: Place in appropriate language folder under `src/utility_scripts/`
- **Update database**: Use migration files, not direct schema edits
- **Change build output**: Modify `build` section in `package.json`
