// Service Model
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'default-icon.svg'
    },
    category: {
        type: String,
        enum: ['cloud', 'development', 'consulting', 'support', 'other'],
        default: 'other'
    },
    features: [{
        type: String
    }],
    pricing: {
        type: String,
        default: 'Contact for pricing'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Service', serviceSchema);
