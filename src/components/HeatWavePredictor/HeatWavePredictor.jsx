import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './HeatWavePredictor.css'
import axios from "axios";
import {fetchHeatWaveReport, fetchLocationCoords, fetchWeather} from "../../services/weather.js";

const HeatWavePredictor = () => {
    const [locationInput, setLocationInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [maxTemp, setMaxTemp] = useState(null);
    const [elevation, setElevation] = useState(null);
    const [heatwave, setHeatwave] = useState(null);

    const handleInputChange = (e) => {
        let newLocationInput = e.target.value.toLowerCase();
        newLocationInput = newLocationInput.charAt(0).toUpperCase() + newLocationInput.slice(1);
        setLocationInput(newLocationInput);
    }

    const handleSubmit = (e) => {
        // fetchLocationCoords(locationInput)
        //     .then(response => {
        //         const lat = response.data[0].lat;
        //         const long = response.data[0].lon;
        //
        //         fetchWeather(lat, long)
        //             .then(response => {
        //                 const max_temp = response.data.main.temp_max;
        //                 fetchHeatWaveReport(lat, long)
        //                     .then(response => {
        //                         const new_elevation = response.data.results[0].elevation;
        //                         setMaxTemp(max_temp);
        //                         setElevation(new_elevation);
        //                         displayHeatwaveReport(max_temp, new_elevation);
        //                     })
        //             })
        //     });
        setSubmitted(true);
        // MOCK DATA FOR DEV
        const lat = 28.6517178;
        const long = 77.2219388;
        const max_temp = 15;
        const new_elevation = 226;
        setMaxTemp(max_temp);
        setElevation(new_elevation);
        displayHeatwaveReport(max_temp, new_elevation);
    }

    const displayHeatwaveReport = (max_temp, elevation) => {
        let tempHeatwave = "";
        if(elevation >= 600) {
            if(max_temp >= 30) {
                tempHeatwave = "Heatwave Likely";
            }
            else {
                tempHeatwave = "Heatwave Not Likely";
            }
        }
        else {
            if(max_temp >= 40) {
                tempHeatwave = "Heatwave Likely";
            }
            else {
                tempHeatwave = "Heatwave Not Likely";
            }
        }
        setHeatwave(tempHeatwave);
    }

    return (
        <div className="heat-wave-predictor predictor">
            <h2>Heat Wave Predictor</h2>
            <p className="content steps">
                <span className = "label">Step 1</span>: Enter your location name.<br/>
                <span className = "label">Step 2</span>: Click the submit button.<br/>
                <span className= "label">Step 3</span>: Review the heat wave prediction.<br/>
                <span className= "label">Step 4 (optional)</span>: Verify our prediction sources at <a href = "#">citations</a>.<br/>
            </p>
            <TextField
                id="outlined-basic"
                label="Enter your city/closest city name"
                variant="outlined"
                size="small"
                style={{width: "85%", marginTop: "16px"}}
                value={locationInput}
                onChange={handleInputChange}/>
            <button
                className="submit-button"
                onClick={handleSubmit}>
                Submit</button>
            {submitted ? (
                <div className = "heat-wave-report display">
                    <span>Elevation: <span className = "elevation">{elevation}m<br/></span></span>
                    <span>Max Temperature: <span className = "temp">{maxTemp}&deg;C<br/></span></span>
                    <span><span className="status">{heatwave}<br/></span></span>
                </div>
            ) : (
                <div className = "heat-wave-report">Input a location name and click submit to see results.</div>
            )}
        </div>
    );
};

export default HeatWavePredictor;