const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  rating: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      value: Number
    }
  ]
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
