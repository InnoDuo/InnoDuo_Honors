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
  honorsCoreTaken: Boolean,
  freshmanSeminarTaken: Boolean,
  researchMethodsTaken: Boolean,
  honorsProjectDone: Boolean,
  cracadPresentation: Boolean,
  serviceDone: Boolean
});

module.exports = mongoose.model('Student', studentSchema);