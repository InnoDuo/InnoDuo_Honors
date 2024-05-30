const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  stuID: String,
  contact: String,
  major: String,
  minor: String,
  advisor: String,
  graduationYear: Number,
  honorsSeminarsTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  honorsCoreTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  freshmanSeminarTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  researchMethodsTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  honorsProjectDone: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  cracadPresentation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  serviceDone: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('Student', studentSchema);