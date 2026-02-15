// Services Routes
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET - Get all active services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch services'
        });
    }
});

// GET - Get service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch service'
        });
    }
});

// POST - Create new service (admin only)
router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create service'
        });
    }
});

// PUT - Update service (admin only)
router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.json({
            success: true,
            message: 'Service updated successfully',
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update service'
        });
    }
});

// DELETE - Delete service (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete service'
        });
    }
});

module.exports = router;
