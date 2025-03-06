import React from 'react';

const VehicleDetails = ({ selectedMake, selectedModel, selectedSubmodel, vehicleDetails, setStep }) => {
    return (
        <div>
            <h1>Vehicle Details for {selectedMake} {selectedModel} {selectedSubmodel}</h1>
            <ul>
                <li>Date of Manufacture: {vehicleDetails.dateOfManufacture}</li>
                <li>Transmission: {vehicleDetails.transmission}</li>
                <li>Fuel Type: {vehicleDetails.fuel}</li>
                <li>Engine Size: {vehicleDetails.engineSize}</li>
            </ul>
            <button onClick={() => setStep(3)}>Back</button>
            <button onClick={() => alert('Find Parts functionality not implemented yet')}>Find Parts</button>
        </div>
    );
};

export default VehicleDetails;