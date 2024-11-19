import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Filter.css";

function Filter() {
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [services, setServices] = useState([]);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [healthCenters, setHealthCenters] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    async function fetchAllMedicalCenters() {
      try {
        const response = await fetch("/users/medicCenters");
        if (!response.ok) {
          throw new Error("Failed to fetch medical centers");
        }
        const data = await response.json();
        setHealthCenters(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllMedicalCenters();
  }, []);

  useEffect(() => {
    async function fetchHealthCenters() {
      // Construct URL for API call
      const queryParams = new URLSearchParams({
        rating: rating,
        price: price,
        services: services,
        searchParam: searchParam,
      });
      const url = `/search?${queryParams.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setHealthCenters(data);
    }
    fetchHealthCenters();
  }, [rating, price, services, searchParam]);

  const handleSearch = async (event) => {
    event.preventDefault();
    // Retrieve selected checkboxes for services
    const servicesCheckboxes = document.getElementsByName("services");
    const servicesArray = Array.from(servicesCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    setServices(servicesArray);
  };

  const handleReset = () => {
    setServices([]);
    setRating(0);
    setPrice(1000);
    setSearchParam("");
  };

  return (
    <div className="SearchPage">
      <h1>Search for Health Centers</h1>

      <div className="SeachBar">
        <input
          className="Search"
          type="text"
          placeholder="Search medical centers ...       "
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </div>

      <div className="ResetBtn">
        <button type="button" onClick={handleReset}>
          Reset Filter
        </button>
      </div>

      <div className="FilterSection">
        <form>
          <label htmlFor="address">Enter your location:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />

          <label htmlFor="distance">Distance:</label>
          <br />
          <select
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            <option value="0">Any Distance</option>
            <option value="1">Less than 1 km</option>
            <option value="3">Less than 3 km</option>
            <option value="5">Less than 5 km</option>
            <option value="10">Less than 10 km</option>
          </select>
          <br />

          <label htmlFor="services">Services:</label>
          <br />
          <input
            className="checkbox1"
            type="checkbox"
            id="diagnostic-imaging"
            name="services"
            value="diagnostic-imaging"
          />
          <label htmlFor="diagnostic-imaging">Diagnostic imaging</label>
          <input
            type="checkbox"
            id="rehabilitation-services"
            name="services"
            value="rehabilitation-services"
          />
          <label htmlFor="rehabilitation-services">
            Rehabilitation services
          </label>
          <br />
          <input
            type="checkbox"
            id="pain-management"
            name="services"
            value="pain-management"
          />
          <label htmlFor="pain-management">Pain management</label>
          <input
            type="checkbox"
            id="mental-health-service"
            name="services"
            value="mental-health-service"
          />
          <label htmlFor="mental-health-services">Mental health services</label>
          <br />

          <label htmlFor="rating">Minimum Rating:</label>
          <input
            type="number"
            id="rating"
            min="0"
            max="10"
            step="1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <br />

          <label htmlFor="price">Maximum Price:</label>
          <input
            type="number"
            id="price"
            min="0"
            max="1000"
            step="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            defaultValue={1000}
          />
          <br />

          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>

      <div className="SearchResult">
        {/* <h2>Results</h2> */}
        <div className="MedicalCentersList">
          {healthCenters.length === 0 && (
            <p class="no-result">No medical center found.</p>
          )}
          {healthCenters?.map(center => (
            <div key={center._id} className="MedicalCenterCard">
              <Link to={`/medical-center/${center._id}`} className="CardLink">
                <h2>{center?.name}</h2>
                <p className="CardDescription">{center?.description}</p>
                <p>
                  <strong>Address:</strong> {center?.address}
                  <br />
                  <strong>Email:</strong> {center?.email}
                  <br />
                  <strong>Rating:</strong> {center?.rating}
                  <br />
                  <strong>Price:</strong> {center?.price}
                  <br />
                  <strong>Services:</strong>
                  <ul>
                    {center?.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
