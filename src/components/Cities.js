import React, { useState, useEffect } from "react";
import axios from "axios";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await axios.get(`http://localhost:3000/api/cities`);
      setCities(response.data);
    };
    fetchCities();
  }, []);

  const handleClick = ({ target }, key) => {
    const selectedCityObject = cities.find((city) => city.id === key);

    const fetchForecast = async () => {
          const response = await axios.get(`http://localhost:3000/api/forecast?insee=${selectedCityObject.insee}`);
          setForecast(response.data);
      };
      fetchForecast();
    };

  return (
    <div className="cities-container">
      <table>
        <thead>
          <tr>
            <th>Code Insee</th>
            <th>City</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {cities?.map((city, index) => {
            return (
              <tr
                onClick={({ target }) => handleClick(target, index)}
                key={index}
              >
                <td>{city.insee}</td>
                <td>{city.name}</td>
                <td>{city.population.toLocaleString().replace(/,/g, " ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Cities;
