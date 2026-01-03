const Internship = require('../models/Internship');
const { validationResult } = require('express-validator');

// Create new internship
exports.createInternship = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const internshipData = {
      ...req.body,
      userId: req.userId
    };

    const internship = await Internship.create(internshipData);

    res.status(201).json({
      success: true,
      message: 'Internship added successfully',
      internship
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create internship'
    });
  }
};

// Get all internships for logged-in user
exports.getAllInternships = async (req, res) => {
  try {
    const { status, priority, search, sortBy } = req.query;

    const filter = { userId: req.userId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOptions = {};
    if (sortBy === 'date') sortOptions = { applicationDate: -1 };
    else if (sortBy === 'company') sortOptions = { companyName: 1 };
    else if (sortBy === 'status') sortOptions = { status: 1 };
    else sortOptions = { createdAt: -1 };

    const internships = await Internship.find(filter).sort(sortOptions);

    res.json({
      success: true,
      count: internships.length,
      internships
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch internships'
    });
  }
};

// Get single internship
exports.getInternship = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.json({
      success: true,
      internship
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch internship'
    });
  }
};

// Update internship
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.json({
      success: true,
      message: 'Internship updated successfully',
      internship
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update internship'
    });
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.json({
      success: true,
      message: 'Internship deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete internship'
    });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const stats = await Internship.aggregate([
      { $match: { userId: req.userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusCounts = {
      wishlist: 0,
      applied: 0,
      interview: 0,
      offered: 0,
      rejected: 0,
      accepted: 0
    };

    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
    });

    const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

    res.json({
      success: true,
      statistics: {
        total,
        byStatus: statusCounts
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch statistics'
    });
  }
};