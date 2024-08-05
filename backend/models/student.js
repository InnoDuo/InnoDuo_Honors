const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  studentId: String,
  phoneNo: Number,
  major: String,
  minor: String,
  advisor: String,
  classification: String,
  gradYear: Number,
  username: String,
  password: String,
  role: String,
  verified: Boolean,
  // THE FOLLOWING ARE COMMENTED BECAUSE WE ARE IMPLEMENTING THEM IN CATALOG (nta45)
  // contact: String,
  // honorsSeminarsTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  // honorsCoreTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  // freshmanSeminarTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  // researchMethodsTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  // honorsProjectDone: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  // cracadPresentation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  // serviceDone: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('Student', studentSchema);