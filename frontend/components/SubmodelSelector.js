import React from 'react';

const SubmodelSelector = ({ selectedMake, selectedModel, submodels, handleSubmodelClick, setStep }) => {
    return (
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
    );
};

export default SubmodelSelector;