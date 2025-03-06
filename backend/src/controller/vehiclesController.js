const vehicles = require('../data/vehicles.json');

class VehiclesController {
    getUniqueMakes() {
        const makes = [...new Set(vehicles.map(vehicle => vehicle.make))];
        return makes;
    }

    getModelsByMake(make) {
        const models = [...new Set(vehicles.filter(vehicle => vehicle.make === make).map(vehicle => vehicle.model))];
        return models;
    }

    getSubmodelsByMakeAndModel(make, model) {
        const submodels = vehicles
            .filter(vehicle => vehicle.make === make && vehicle.model === model)
            .map(vehicle => vehicle.submodel)
            .filter(submodel => submodel !== null);
        return submodels;
    }

    getVehicleDetails(make, model, submodel) {
        const vehicle = vehicles.find(vehicle => vehicle.make === make && vehicle.model === model && vehicle.submodel === submodel);
        return vehicle || {};
    }
}

module.exports = VehiclesController;