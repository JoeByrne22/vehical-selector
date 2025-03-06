import React, { useState, useEffect } from 'react';
import MakeSelector from '../components/MakeSelector';
import ModelSelector from '../components/ModelSelector';
import SubmodelSelector from '../components/SubmodelSelector';
import VehicleDetails from '../components/VehicleDetails';

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
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {step === 1 && (
                <MakeSelector
                    makes={makes}
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    handleMakeClick={handleMakeClick}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    paginate={paginate}
                />
            )}
            {step === 2 && (
                <ModelSelector
                    selectedMake={selectedMake}
                    models={models}
                    handleModelClick={handleModelClick}
                    setStep={setStep}
                />
            )}
            {step === 3 && (
                <SubmodelSelector
                    selectedMake={selectedMake}
                    selectedModel={selectedModel}
                    submodels={submodels}
                    handleSubmodelClick={handleSubmodelClick}
                    setStep={setStep}
                />
            )}
            {step === 4 && (
                <VehicleDetails
                    selectedMake={selectedMake}
                    selectedModel={selectedModel}
                    selectedSubmodel={selectedSubmodel}
                    vehicleDetails={vehicleDetails}
                    setStep={setStep}
                />
            )}
        </div>
    );
};

export default VehicleSelector;