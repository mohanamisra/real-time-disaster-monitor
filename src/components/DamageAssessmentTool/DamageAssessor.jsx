import React from 'react';
import "./DamageAssessor.css"

const DamageAssessor = () => {
    return (
        <div className="ai-damage-assessment">
            <h2>AI Damage Assessment Tool</h2>
            <p>
                <span className = "label">Step 1</span>: Upload an image whose damage you want to assess. We do not store any uploaded
                images.<br/>
                <span className = "label">Step 2</span>: Click the submit button.<br/>
                <span className= "label">Step 3</span>: A dialog box with opens up.<br/>
                <span className= "label">Step 4</span>: Review the AI analysis.<br/>
                <span className= "label">Step 5</span>: Close the dialog box.<br/>
            </p>
        </div>
    );
};

export default DamageAssessor;