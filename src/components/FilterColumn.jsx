import React from 'react';

const FilterColumn = ({ filters, setFilters }) => {
    return (
        <div className="filter-column">
            <h3>Filtri</h3>
            <div>
                <label>Nome</label>
                <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
            </div>
            <div>
                <label>URL</label>
                <input
                    type="text"
                    value={filters.url}
                    onChange={(e) => setFilters({ ...filters, url: e.target.value })}
                />
            </div>
        </div>
    );
};

export default FilterColumn;
