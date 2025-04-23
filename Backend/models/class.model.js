const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  student: [{
    type: String,
    ref: 'user'
  }],
  assignment: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Assignment'
  }]
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;