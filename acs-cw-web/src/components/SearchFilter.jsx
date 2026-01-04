import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';
import './SearchFilter.css';

// Property type options
const typeOptions = [
    { value: 'any', label: 'Any Type' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
];

// Postcode area options
const postcodeOptions = [
    { value: '', label: 'Any Area' },
    { value: 'BR1', label: 'BR1 - Bromley' },
    { value: 'NW1', label: 'NW1 - Camden/Regent\'s Park' },
    { value: 'SE1', label: 'SE1 - Southbank/Borough' },
    { value: 'SW1', label: 'SW1 - Chelsea/Westminster' }
];

// Minimum bedroom options
const bedroomOptions = [
    { value: 0, label: 'No min' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6+' }
];

// Maximum bedroom options
const maxBedroomOptions = [
    { value: 10, label: 'No max' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6+' }
];

// Custom styles for the select dropdowns
const selectStyles = {
    control: function(base) {
        return {
            ...base,
            borderColor: '#ccc',
            boxShadow: 'none',
            '&:hover': { borderColor: '#003366' }
        };
    },
    option: function(base, state) {
        let backgroundColor = 'white';
        let color = '#333';
        
        if (state.isSelected) {
            backgroundColor = '#003366';
            color = 'white';
        } else if (state.isFocused) {
            backgroundColor = '#e6f0ff';
        }
        
        return {
            ...base,
            backgroundColor: backgroundColor,
            color: color
        };
    }
};

function SearchFilter({ filters, setFilters, handleSearch }) {
    
    // Update a filter field
    function handleChange(field, value) {
        setFilters(function(prev) {
            return { ...prev, [field]: value };
        });
    }

    // Handle price range changes
    function handlePriceChange(values) {
        setFilters(function(prev) {
            return { 
                ...prev, 
                minPrice: values[0], 
                maxPrice: values[1] 
            };
        });
    }

    // Format price for display
    function formatPrice(value) {
        return '£' + value.toLocaleString();
    }

    // Reset all filters
    function handleReset() {
        setFilters({
            type: 'any',
            minPrice: 100000,
            maxPrice: 1000000,
            minBeds: 0,
            maxBeds: 10,
            dateFrom: null,
            dateTo: null,
            postcode: ''
        });
    }

    return (
        <div className="search-panel">
            <h3>Filter Properties</h3>
            
            {/* Property Type Filter */}
            <div className="form-group">
                <label htmlFor="property-type">Property Type:</label>
                <Select 
                    inputId="property-type"
                    options={typeOptions} 
                    onChange={function(opt) { handleChange('type', opt.value); }}
                    value={typeOptions.find(function(opt) { return opt.value === filters.type; })}
                    styles={selectStyles}
                    classNamePrefix="react-select"
                />
            </div>

            {/* Price Range Slider */}
            <div className="form-group price-range-group">
                <label>Price Range:</label>
                <div className="price-display">
                    <span>{formatPrice(filters.minPrice)}</span>
                    <span> - </span>
                    <span>{formatPrice(filters.maxPrice)}</span>
                </div>
                <Slider
                    range
                    min={100000}
                    max={1000000}
                    step={25000}
                    value={[filters.minPrice, filters.maxPrice]}
                    onChange={handlePriceChange}
                    trackStyle={[{ backgroundColor: '#003366' }]}
                    handleStyle={[
                        { borderColor: '#003366', backgroundColor: '#fff' },
                        { borderColor: '#003366', backgroundColor: '#fff' }
                    ]}
                    railStyle={{ backgroundColor: '#ddd' }}
                />
            </div>

            {/* Bedrooms Filter */}
            <div className="form-group bedrooms-group">
                <label>Bedrooms:</label>
                <div className="bedroom-selects">
                    <div className="bedroom-select">
                        <span className="select-label">Min:</span>
                        <Select 
                            inputId="min-bedrooms"
                            options={bedroomOptions}
                            onChange={function(opt) { handleChange('minBeds', opt.value); }}
                            value={bedroomOptions.find(function(opt) { return opt.value === filters.minBeds; })}
                            styles={selectStyles}
                            classNamePrefix="react-select"
                        />
                    </div>
                    <div className="bedroom-select">
                        <span className="select-label">Max:</span>
                        <Select 
                            inputId="max-bedrooms"
                            options={maxBedroomOptions}
                            onChange={function(opt) { handleChange('maxBeds', opt.value); }}
                            value={maxBedroomOptions.find(function(opt) { return opt.value === filters.maxBeds; })}
                            styles={selectStyles}
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
            </div>

            {/* Date Added Filter */}
            <div className="form-group date-group">
                <label>Date Added:</label>
                <div className="date-pickers">
                    <div className="date-picker-wrapper">
                        <span className="select-label">From:</span>
                        <DatePicker 
                            selected={filters.dateFrom} 
                            onChange={function(date) { handleChange('dateFrom', date); }} 
                            dateFormat="dd/MM/yyyy"
                            className="date-widget"
                            placeholderText="Select date"
                            isClearable
                            maxDate={filters.dateTo || new Date()}
                        />
                    </div>
                    <div className="date-picker-wrapper">
                        <span className="select-label">To:</span>
                        <DatePicker 
                            selected={filters.dateTo} 
                            onChange={function(date) { handleChange('dateTo', date); }} 
                            dateFormat="dd/MM/yyyy"
                            className="date-widget"
                            placeholderText="Select date"
                            isClearable
                            minDate={filters.dateFrom}
                            maxDate={new Date()}
                        />
                    </div>
                </div>
            </div>

            {/* Postcode Area Filter */}
            <div className="form-group">
                <label htmlFor="postcode-area">Postcode Area:</label>
                <Select 
                    inputId="postcode-area"
                    options={postcodeOptions}
                    onChange={function(opt) { handleChange('postcode', opt.value); }}
                    value={postcodeOptions.find(function(opt) { return opt.value === filters.postcode; })}
                    styles={selectStyles}
                    classNamePrefix="react-select"
                />
            </div>

            {/* Action Buttons */}
            <div className="button-group">
                <button 
                    onClick={handleSearch} 
                    className="search-btn"
                >
                    🔍 Search
                </button>
                <button 
                    onClick={handleReset} 
                    className="reset-btn"
                >
                    ↻ Reset
                </button>
            </div>
        </div>
    );
}

export default SearchFilter;
