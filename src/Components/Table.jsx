import React, { useEffect, useState } from 'react';
import "../App.css"

const Table = ({ data, cityFilter, countryFilter, stateFilter }) => {
    // Filter the data based on provided filters
    const [filteredData, setFilterData] = useState([])

    function filterData() {
        if (data != null) {
            let filteredData = data;
        
            if (countryFilter.length > 0) {
                filteredData = filteredData.filter(item => countryFilter.includes(item.country));
            }
        
            if (stateFilter.length > 0) {
                filteredData = filteredData.filter(item => stateFilter.includes(item.state));
            }
        
            if (cityFilter.length > 0) {
                filteredData = filteredData.filter(item => cityFilter.includes(item.city));
            }
            setFilterData(filteredData);
        }
    }

    useEffect(() => {
        filterData()
    }, [data, countryFilter, cityFilter, stateFilter])

    return (
        <div className='table'>
            {filteredData.length > 0 ? (
                <>
                    <div className='tableRow'>
                        <div className="tableHeaderCell">Name</div>
                        <div className="tableHeaderCell">Country</div>    
                        <div className="tableHeaderCell">City</div>
                        <div className="tableHeaderCell">State</div>
                        <div className="tableHeaderCell">Website</div>
                    </div>
                    {filteredData.map((item, key) => (
                        <div className='tableRow' key={key}>
                            <div className="tableCell">{item.name}</div>
                            <div className="tableCell">{item.country}</div>
                            <div className="tableCell">{item.city}</div>
                            <div className="tableCell">{item.state}</div>
                            <div className="tableCell">{item.website_url}</div>
                        </div>
                    ))}
                </>
            ) : (
                <div>No matching data found.</div>
            )}
        </div>
    );
};

export default Table;