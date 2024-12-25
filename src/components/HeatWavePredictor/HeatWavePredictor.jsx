import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './HeatWavePredictor.css'

const HeatWavePredictor = () => {
    const [locationInput, setLocationInput] = useState('');

    const handleInputChange = (e) => {
        setLocationInput(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log("clicked");
        console.log(locationInput);
    }

    return (
        <div className="heat-wave-predictor">
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
        </div>
    );
};

export default HeatWavePredictor;