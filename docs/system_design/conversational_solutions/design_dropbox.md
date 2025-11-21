# Design Dropbox / Google Drive

## 1. Requirements

### Functional
- **Upload/Download**: Files.
- **Sync**: Automatic sync across devices.
- **Versioning**: Restore old versions.

### Non-Functional
- **Reliability**: Never lose data (ACID).
- **Bandwidth**: Optimize network usage.

---

## 2. Architecture

### Client
- **Watcher**: Monitors file system changes.
- **Chunker**: Splits files into 4MB chunks.
- **Hasher**: SHA-256 hash of each chunk.

### Backend
- **Block Server**: Stores chunks in S3/Blob Storage.
- **Metadata DB**: Stores file structure, permissions, chunk mapping.
- **Synchronization Service**: Notifies clients of changes.

---

## 3. Deep Dive

### Deduplication
- If user A uploads `movie.mp4` and user B uploads the same file:
    - Hashes match.
    - Only store one copy of the chunks in S3.
    - Add reference in Metadata DB for user B.
    - **Saves massive storage**.

### Delta Sync (Rsync)
- If a user modifies 1 byte of a 1GB file:
    - Only re-upload the changed chunk (4MB), not the whole file.

### Conflict Resolution
- **Last Write Wins (LWW)**: Simple, but data loss risk.
- **Versioning**: Keep both versions (e.g., "File (Conflicted Copy)"). Let user decide.
