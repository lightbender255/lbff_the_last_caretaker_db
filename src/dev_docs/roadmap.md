# Feature & UX Roadmap

## 1. User Experience (UX) Improvements
- **Toast Notifications**: Replace silent failures/successes with non-intrusive toast popups (e.g., "POI Saved", "Deleted").
- **Keyboard Shortcuts**:
    - `Ctrl/Cmd + N`: Open Add Modal
    - `Ctrl/Cmd + F`: Focus Search
    - `Esc`: Close Modal
- **Copy Coordinates**: One-click button to copy "X, Y" to clipboard for easy pasting into game/chat.
- **Tooltips**: Add hover tooltips to column headers explaining abbreviations (e.g., "Max PSI", "Bio Hostiles").
- **Row Highlighting**: Conditional formatting based on danger level (e.g., high hostile count = red tint).

## 2. Data Management
- **Import/Export**:
    - Export DB to CSV/JSON for backup.
    - Import from CSV (bulk add).
- **Duplicate Detection**: Warn user when adding a POI with a name or coordinates that already exist.
- **Advanced Filtering**:
    - Range sliders for Depth and PSI.
    - Multi-select for Types (e.g., show "Wreck" AND "Cave").

## 3. Major Features
- **Interactive Map View**:
    - Plot POIs on a 2D canvas using X/Y coordinates.
    - Click point to edit/view details.
    - Zoom/Pan controls.
- **Image Attachments**: Allow users to attach screenshots or map snippets to a POI record.
- **Analytics Dashboard**:
    - Charts showing distribution of POI types.
    - Depth distribution graphs.

## 4. Technical / Polish
- **Fix Window Border Artifact**: Resolve the visual glitch with rounded corners on transparent windows.
- **Pagination**: Implement server-side pagination if the dataset is expected to grow beyond ~1000 records.
- **Settings Page**: Allow users to customize:
    - Default sort order.
    - Theme accents.
    - "Always on Top" toggle.
