import React, { useState } from 'react';
import { fetchLocationCoords, fetchWeather } from "../../services/weather.js";
import TextField from "@mui/material/TextField";
import "./StormPredictor.css";

const StormPredictor = () => {
    const [locationInput, setLocationInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [windSpeed, setWindSpeed] = useState(null);
    const [storm, setStorm] = useState(null);

    const handleInputChange = (e) => {
        let newLocationInput = e.target.value.toLowerCase();
        newLocationInput = newLocationInput.charAt(0).toUpperCase() + newLocationInput.slice(1);
        setLocationInput(newLocationInput);
    };

    const handleSubmit = () => {
        fetchLocationCoords(locationInput)
            .then(response => {
                const lat = response.data[0].lat;
                const long = response.data[0].lon;

                fetchWeather(lat, long)
                    .then(response => {
                        const wind_speed = ((response.data.wind.speed * 3.6).toFixed(3));
                        setWindSpeed(wind_speed);

                        let newStorm = "";
                        if (wind_speed < 31)
                            newStorm = "Low Pressure";
                        else if (wind_speed >= 31 && wind_speed < 49)
                            newStorm = "Depression";
                        else if (wind_speed >= 49 && wind_speed < 61)
                            newStorm = "Deep Depression";
                        else if (wind_speed >= 61 && wind_speed < 88)
                            newStorm = "Cyclonic Storm";
                        else if (wind_speed >= 88 && wind_speed < 117)
                            newStorm = "Severe Cyclonic Storm";
                        else if (wind_speed > 221)
                            newStorm = "Super Cyclone";

                        setStorm(newStorm);
                    });
            });
        setSubmitted(true);
    };

    return (
        <div className="storm-predictor predictor">
            <h2>Storm Predictor</h2>
            <p className="content steps">
                <span className="label">Step 1</span>: Enter your location name.<br />
                <span className="label">Step 2</span>: Click the submit button.<br />
                <span className="label">Step 3</span>: Review the storm prediction.<br />
                <span className="label">Step 4 (optional)</span>: Verify our prediction sources at <a href="#">citations</a>.<br />
            </p>
            <TextField
                id="outlined-basic"
                label="Enter your city/closest city name"
                variant="outlined"
                size="small"
                style={{ width: "85%", marginTop: "16px" }}
                value={locationInput}
                onChange={handleInputChange}
            />
            <button
                className="submit-button"
                onClick={handleSubmit}>
                Submit
            </button>
            {submitted ? (
                <div className="storm-report display">
                    <span>Wind Speed: <span className="wind">{windSpeed} kmph<br /></span></span>
                    <span><span className="status">{storm}<br /></span></span>
                </div>
            ) : (
                <div className="storm-report">Input a location name and click submit to see results.</div>
            )}
        </div>
    );
};

export default StormPredictor;
