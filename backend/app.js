const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notes = [
    { 
        id: 0, 
        title: 'Grocery List', 
        content: 'Milk, eggs, bread', 
        createdAt: new Date("2025-05-01T12:00:00Z").toISOString(),
        updatedAt: new Date("2025-05-01T12:00:00Z").toISOString(),
        userId: "user1"  // Assuming a future multi-user implementation
    },
    { 
        id: 1, 
        title: 'Meeting Notes', 
        content: 'Discussed project deadlines', 
        createdAt: new Date("2025-05-02T14:30:00Z").toISOString(),
        updatedAt: new Date("2025-05-02T14:30:00Z").toISOString(),
        userId: "user1"
    },
    { 
        id: 2, 
        title: 'Ideas', 
        content: 'New app features', 
        createdAt: new Date("2025-05-03T09:15:00Z").toISOString(),
        updatedAt: new Date("2025-05-03T09:15:00Z").toISOString(),
        userId: "user1"
    }
];
/**
 * Get all notes
 * @route GET /notes
 * @desc Retrieve all notes for the user
 * @access Public (will be restricted in multi-user implementation)
 */
app.get('/notes', (req, res) => {
    try {
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving notes", error: err.message });
    }
});

/**
 * Get a single note by ID
 * @route GET /notes/:id
 * @desc Retrieve a specific note by its ID
 * @access Public (will be restricted in multi-user implementation)
 */
app.get('/notes/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        const note = notes.find(n => n.id === noteId);
        
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving note", error: err.message });
    }
});

/**
 * Create a new note
 * @route POST /notes
 * @desc Create a new note with title and content
 * @access Public (will be restricted in multi-user implementation)
 */
app.post('/notes', (req, res) => {
    try {
        const { title, content } = req.body;
        
        // Validate request
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        
        // Generate a new ID (in a production app, this would be handled differently)
        const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 0;
        
        // Create new note with timestamps
        const currentTime = new Date().toISOString();
        const newNote = {
            id: newId,
            title,
            content,
            createdAt: currentTime,
            updatedAt: currentTime,
            userId: "user1"  // Placeholder for future multi-user implementation
        };
        
        // Add to notes array
        notes.push(newNote);
        
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: "Error creating note", error: err.message });
    }
});

/**
 * Update an existing note
 * @route PUT /notes/:id
 * @desc Update title and/or content of a note
 * @access Public (will be restricted in multi-user implementation)
 */
app.put('/notes/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        const { title, content } = req.body;
        
        // Find note index
        const noteIndex = notes.findIndex(n => n.id === noteId);
        
        // Check if note exists
        if (noteIndex === -1) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        // Validate request
        if (!title && !content) {
            return res.status(400).json({ message: "Title or content must be provided" });
        }
        
        // Update note
        const updatedNote = {
            ...notes[noteIndex],
            title: title || notes[noteIndex].title,
            content: content || notes[noteIndex].content,
            updatedAt: new Date().toISOString()
        };
        
        notes[noteIndex] = updatedNote;
        
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: "Error updating note", error: err.message });
    }
});

/**
 * Delete a note
 * @route DELETE /notes/:id
 * @desc Remove a note permanently
 * @access Public (will be restricted in multi-user implementation)
 */
app.delete('/notes/:id', (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        
        // Find note index
        const noteIndex = notes.findIndex(n => n.id === noteId);
        
        // Check if note exists
        if (noteIndex === -1) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        // Remove note
        const deletedNote = notes.splice(noteIndex, 1)[0];
        
        res.json({ message: "Note deleted successfully", deletedNote });
    } catch (err) {
        res.status(500).json({ message: "Error deleting note", error: err.message });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});