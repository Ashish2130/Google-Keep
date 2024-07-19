// routes/notes.js

const express = require('express');
const authMiddleware = require('../middleware/auth');
const Note = require('../models/Note');

const router = express.Router();

// Create a new note
router.post('/', authMiddleware, async (req, res) => {
  const { content, tags, color } = req.body;
  const userId = req.user.id;

  try {
    const newNote = new Note({
      content,
      tags,
      color,
      user: userId
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all notes
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a note
router.put('/:id', authMiddleware, async (req, res) => {
  const { content, tags, color, archived } = req.body;
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    let note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Update note fields
    note.content = content;
    note.tags = tags;
    note.color = color;
    note.archived = archived;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a note
router.delete('/:id', authMiddleware, async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    let note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Soft delete by setting deletedAt timestamp
    note.deletedAt = Date.now();

    await note.save();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
