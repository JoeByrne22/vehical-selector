import React from 'react';

const MakeSelector = ({ makes, searchTerm, handleSearch, handleMakeClick, currentPage, itemsPerPage, paginate }) => {
    const filteredMakes = makes.filter(make =>
        make.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMakes = filteredMakes.slice(indexOfFirstItem, indexOfLastItem);

    return (
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
    );
};

export default MakeSelector;