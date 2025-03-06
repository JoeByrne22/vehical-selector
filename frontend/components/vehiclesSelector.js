import React, { useState, useEffect } from 'react';

const VehicleSelector = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [submodels, setSubmodels] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedSubmodel, setSelectedSubmodel] = useState('');
    const [vehicleDetails, setVehicleDetails] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const fetchMakes = async () => {
            const response = await fetch('/api/vehicles/makes');
            if (response.ok) {
                const data = await response.json();
                setMakes(data);
            } else {
                console.error('Failed to fetch vehicle makes');
            }
        };
        fetchMakes();
    }, []);

    const fetchModels = async (make) => {
        const response = await fetch(`/api/vehicles/models/${make}`);
        if (response.ok) {
            const data = await response.json();
            setModels(data);
        } else {
            console.error('Failed to fetch vehicle models');
        }
    };

    const fetchSubmodels = async (make, model) => {
        const response = await fetch(`/api/vehicles/submodels/${make}/${model}`);
        if (response.ok) {
            const data = await response.json();
            setSubmodels(data);
        } else {
            console.error('Failed to fetch vehicle submodels');
        }
    };

    const fetchVehicleDetails = async (make, model, submodel) => {
        const response = await fetch(`/api/vehicles/details/${make}/${model}/${submodel}`);
        if (response.ok) {
            const data = await response.json();
            setVehicleDetails(data);
        } else {
            console.error('Failed to fetch vehicle details');
        }
    };

    const handleMakeClick = (make) => {
        setSelectedMake(make);
        fetchModels(make);
        setStep(2);
    };

    const handleModelClick = (model) => {
        setSelectedModel(model);
        fetchSubmodels(selectedMake, model);
        setStep(3);
    };

    const handleSubmodelClick = (submodel) => {
        setSelectedSubmodel(submodel);
        fetchVehicleDetails(selectedMake, selectedModel, submodel);
        setStep(4);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredMakes = makes.filter(make =>
        make.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMakes = filteredMakes.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            {step === 1 && (
                <div>
                    <h1>Select Make</h1>
                    <input
                        type="text"
                        placeholder="Search vehicle makes..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <ul>
                        {currentMakes.map((make, index) => (
                            <li key={index} onClick={() => handleMakeClick(make)}>
                                {make}
                            </li>
                        ))}
                    </ul>
                    <div>
                        {Array.from({ length: Math.ceil(filteredMakes.length / itemsPerPage) }, (_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h1>Select Model for {selectedMake}</h1>
                    <ul>
                        {models.map((model, index) => (
                            <li key={index} onClick={() => handleModelClick(model)}>
                                {model}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setStep(1)}>Back</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <h1>Select Submodel for {selectedMake} {selectedModel}</h1>
                    {submodels.length > 0 ? (
                        <ul>
                            {submodels.map((submodel, index) => (
                                <li key={index} onClick={() => handleSubmodelClick(submodel)}>
                                    {submodel || 'No submodel'}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No submodels available for this model.</p>
                    )}
                    <button onClick={() => setStep(2)}>Back</button>
                </div>
            )}
            {step === 4 && (
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
            )}
        </div>
    );
};

export default VehicleSelector;