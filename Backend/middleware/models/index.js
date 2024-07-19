const sequelize = require('../config/database');
const User = require('./User');
const Note = require('./Note');
const Tag = require('./Tag');

User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });

Note.hasMany(Tag, { foreignKey: 'noteId' });
Tag.belongsTo(Note, { foreignKey: 'noteId' });

module.exports = { sequelize, User, Note, Tag };