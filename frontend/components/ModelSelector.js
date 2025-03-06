import React from 'react';

const ModelSelector = ({ selectedMake, models, handleModelClick, setStep }) => {
    return (
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
    );
};

export default ModelSelector;