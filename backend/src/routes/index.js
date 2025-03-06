const express = require('express');
const VehiclesController = require('../controller/vehiclesController.js');

const router = express.Router();
const vehiclesController = new VehiclesController();

router.get('/makes', async (req, res) => {
    try {
        const makes = vehiclesController.getUniqueMakes();
        res.json(makes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve unique makes' });
    }
});

router.get('/models/:make', async (req, res) => {
    const { make } = req.params;
    try {
        const models = vehiclesController.getModelsByMake(make);
        if (models.length === 0) {
            return res.status(404).json({ error: 'No models found for the specified make' });
        }
        res.json(models);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve models' });
    }
});

router.get('/submodels/:make/:model', async (req, res) => {
    const { make, model } = req.params;
    try {
        const submodels = vehiclesController.getSubmodelsByMakeAndModel(make, model);
        res.json(submodels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve submodels' });
    }
});

router.get('/details/:make/:model/:submodel', async (req, res) => {
    const { make, model, submodel } = req.params;
    try {
        const details = vehiclesController.getVehicleDetails(make, model, submodel);
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve vehicle details' });
    }
});

module.exports = router;