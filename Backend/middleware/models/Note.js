// models/Note.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  color: { type: String, default: '#ffffff' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  archived: { type: Boolean, default: false },
  deletedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
