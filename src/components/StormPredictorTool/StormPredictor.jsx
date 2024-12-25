import React, {useState} from 'react';
import TextField from "@mui/material/TextField";

const StormPredictor = () => {
    const [locationInput, setLocationInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [windSpeed, setWindSpeed] = useState(null);
    const [storm, setStorm] = useState(null);

    const handleInputChange = (e) => {
        let newLocationInput = e.target.value.toLowerCase();
        newLocationInput = newLocationInput.charAt(0).toUpperCase() + newLocationInput.slice(1);
        setLocationInput(newLocationInput);
        console.log(newLocationInput);
    }

    const handleSubmit = () => {
        console.log("clicked storm predictor su bmission");
    }

    return (
        <div className="storm-predictor predictor">
            <h2>Storm Predictor</h2>
            <p className="content steps">
                <span className="label">Step 1</span>: Enter your location name.<br/>
                <span className="label">Step 2</span>: Click the submit button.<br/>
                <span className="label">Step 3</span>: Review the heat wave prediction.<br/>
                <span className="label">Step 4 (optional)</span>: Verify our prediction sources at <a
                href="#">citations</a>.<br/>
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
                Submit
            </button>
            {submitted ? (
                <div className="heat-wave-report display">
                    <span>Wind Speed: <span className="wind">{windSpeed}m<br/></span></span>
                    <span><span className="status">{storm}<br/></span></span>
                </div>
            ) : (
                <div className="heat-wave-report">Input a location name and click submit to see results.</div>
            )}
        </div>
    );
};

export default StormPredictor;