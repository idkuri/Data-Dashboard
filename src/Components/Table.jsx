import React, { useEffect, useState } from 'react';
import "../App.css"
import { Link } from "react-router-dom";


const Table = ({ data, cityFilter, countryFilter, stateFilter, searchQuery }) => {
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

            if (searchQuery.length > 0) {
                filteredData = filteredData.filter(item => item.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
            }

            setFilterData(filteredData);
        }
    }

    useEffect(() => {
        filterData()
    }, [data, countryFilter, cityFilter, stateFilter, searchQuery])

    return (
        <div className='table'>
            {filteredData.length > 0 ? (
                <>
                    <div className='tableRow'>
                        <div className="tableHeaderCell">Name</div>
                        <div className="tableHeaderCell">Country</div>    
                        <div className="tableHeaderCell">City</div>
                        <div className="tableHeaderCell">State</div>
                        <div className="tableHeaderCell">Brewery Type</div>
                        {/* <div className="tableHeaderCell">Website</div> */}
                        <div className="tableHeaderCell">Details</div>
                    </div>
                    {filteredData.map((item, key) => (
                        <div className='tableRow' key={key}>
                            <div className="tableCell">{item.name}</div>
                            <div className="tableCell">{item.country}</div>
                            <div className="tableCell">{item.city}</div>
                            <div className="tableCell">{item.state}</div>
                            <div className="tableCell">{item.brewery_type}</div>
                            <div className="tableCell">
                                <Link to={"/" + item.id}>
                                    Details
                                </Link>
                            </div>
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