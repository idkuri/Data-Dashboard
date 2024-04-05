import React, {useState, useEffect} from 'react';

const DetailsComponent = () => {
    const [data, setData] = useState(null)

    async function getData() {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split('/');
        const id = urlParts[urlParts.length - 1];

        // Now you have the ID from the URL
        console.log("ID:", id);
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries/" + id)
        const jsonData = await response.json()
        setData(jsonData)
      }

      useEffect(() => {
        getData()
      })
    
    return (
        (data != null && (
            <div>
                <p>Brewery Id: {data.id}</p>
                <p>Brewery Name: {data.name}</p>
                <p>Brewery Type: {data.type}</p>
                <p>Brewery City: {data.city}</p>
                <p>Brewery Country: {data.country}</p>  
                <p>Brewery Phone: {data.phone}</p>
                <p>Brewery Address: {data.street}</p>
                <p>Brewery Website: {data.website_url}</p>
            </div>
        ))
    );
};

export default DetailsComponent;