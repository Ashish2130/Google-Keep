const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Note = require('./Note');

const Tag = sequelize.define('Tag', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  noteId: { type: DataTypes.INTEGER, references: { model: Note, key: 'id' } }
});

module.exports = Tag;