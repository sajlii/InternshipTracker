const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  applicationType: {
    type: String,
    enum: ['online', 'referral', 'campus', 'walk-in', 'other'],
    default: 'online'
  },
  status: {
    type: String,
    enum: ['wishlist', 'applied', 'interview', 'offered', 'rejected', 'accepted'],
    default: 'wishlist'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  },
  salary: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  jobDescription: {
    type: String,
    maxlength: [2000, 'Job description cannot exceed 2000 characters']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  websiteUrl: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Index for faster queries
internshipSchema.index({ userId: 1, status: 1 });
internshipSchema.index({ applicationDate: -1 });

module.exports = mongoose.model('Internship', internshipSchema);