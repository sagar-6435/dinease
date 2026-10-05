const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  tableNumber: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    default: 4
  },
  qrCodeUrl: {
    type: String, 
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'OCCUPIED', 'RESERVED'],
    default: 'AVAILABLE'
  }
}, { timestamps: true });

// Ensure table numbers are unique per restaurant
tableSchema.index({ restaurantId: 1, tableNumber: 1 }, { unique: true });

module.exports = mongoose.model('Table', tableSchema);
