import React, { useState, useEffect } from 'react';
import "./DamageAssessor.css";
import * as tf from "@tensorflow/tfjs";
import uploadImage from "../../assets/upload_image.webp";
import Modal from 'react-modal';

// const labels = [['damage_drought', 'damage_earthquake', 'damage_fire', 'damage_human', 'damage_infrastructure', 'damage_landslide', 'damage_water', 'no_damage_human', 'no_damage_infrastructure', 'no_damage_water']]
const labels = ['Drought Damage', 'Earthquake Damage', 'Fire Damage', 'Injured Human', 'Infrastructure Damage', 'Landslide Damage', 'Water Disaster', 'Human', 'Undamaged Infrastructure', 'Aquatic Landscape']
const DamageAssessor = () => {
    const [model, setModel] = useState(null);
    const [fileName, setFileName] = useState('');
    const [predictedClass, setPredictedClass] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [predictedIndex, setPredictedIndex] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            const modelUrl = `/tfjs_model/model.json`;
            try {
                const loadedModel = await tf.loadLayersModel(modelUrl);
                setModel(loadedModel);
            } catch (error) {
                console.error("Error loading model:", error);
            }
        };
        loadModel();
    }, []);

    const preprocessImage = async (file) => {
        const imageBitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0, 256, 256);

        const imageData = ctx.getImageData(0, 0, 256, 256);
        let tensor = tf.browser.fromPixels(imageData)
            .expandDims()
            .div(255.0);

        return tensor;
    };

    const handleFileUpload = async (file) => {
        if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
            setFileName(file.name);

            // Create a data URL for the uploaded image
            const imageUrl = URL.createObjectURL(file);
            setImageDataUrl(imageUrl);

            if (model) {
                const preprocessedImage = await preprocessImage(file);
                const prediction = model.predict(preprocessedImage).arraySync();
                const flatPrediction = prediction.flat();
                console.log(flatPrediction);
                const newPredictedIndex = flatPrediction.indexOf(Math.max(...flatPrediction));
                const predictedLabel = labels[newPredictedIndex];

                setPredictedIndex(newPredictedIndex);
                setPredictedClass(predictedLabel);
                setIsModalOpen(true);
            } else {
                alert("Model is not loaded yet. Please try again later.");
            }
        } else {
            alert("Invalid file type. Please upload an image with .jpg, .jpeg, .png, or .webp extension.");
        }
    };

    const handleChange = async (e) => {
        if (e.target.files.length) {
            await handleFileUpload(e.target.files[0]);
        }
    };

    const resourcesMap = {
        0: {
            text: "Drought Management Resources",
            url: "https://agriwelfare.gov.in/en/Drought",
        },
        1: {
            text: "Earthquake-related Damage Management",
            url: "https://ndma.gov.in/Natural-Hazards/Earthquakes",
        },
        2: {
            text: "Fire-related Damage Management",
            url: "https://ndma.gov.in/Response/Fire-Service",
        },
        3: {
            text: "Post-Trauma Care Resources",
            url: "https://www.mohfw.gov.in/?q=basicpage-6",
        },
        4: {
            text: "Damaged Infrastructure Grievance Redressal",
            url: "https://morth.nic.in/public-grievances",
        },
        5: {
            text: "Landslide Damage Management",
            url: "https://ndma.gov.in/index.php/Natural-Hazards/Landslide",
        },
        6: {
            text: "Water-related Disaster Management",
            url: "https://ndma.gov.in/index.php/Natural-Hazards/Urban-Floods",
        },
        7: {
            text: "No damage detected",
            url: "",
        },
        8: {
            text: "No damage detected",
            url: "",
        },
        9: {
            text: "No damage detected",
            url: "",
        },
    }

    return (
        <div className="ai-damage-assessment">
            <h2>AI Damage Assessment Tool</h2>
            <p>
                <span className="label">Step 1</span>: Upload an image whose damage you want to assess. We do not store any uploaded
                images.<br />
                <span className="label">Step 2</span>: Click the submit button.<br />
                <span className="label">Step 3</span>: A dialog box opens up.<br />
                <span className="label">Step 4</span>: Review the damage classification and linked government resources to mitigate/report damage.<br />
                <span className="label">Step 5</span>: Close the dialog box.<br />
            </p>
            <div className="upload-section">
                <img src={uploadImage} alt="Section for uploading images" />
                <label htmlFor="file-upload" className="file-upload-label">
                    Drag and drop an image here or click to upload
                </label>
                <input
                    type="file"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.webp"
                    className="file-upload-input"
                    onChange={handleChange}
                />
                {fileName && <p className="file-name">Uploaded: {fileName}</p>}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Prediction Result"
                className="modal"
                ariaHideApp={false}
                overlayClassName="overlay"
            >
                <h2 className = "modal-heading">Damage Classification</h2>
                <img src={imageDataUrl} alt="Uploaded" className="uploaded-image" />
                <p>Damage Detected: <strong>{predictedClass}</strong></p>
                <button className = "modal-button" onClick={() => setIsModalOpen(false)}>Close</button>
                <div className="modal-content">
                    <p>Emergency Contact: <span className="data">108/112</span></p>
                    <p>Police Services Contact: <span className="data">100</span></p>
                    {predictedIndex !== null && resourcesMap[predictedIndex] && (
                        <>
                            <p className="disaster-text">{resourcesMap[predictedIndex].text}</p>
                            {resourcesMap[predictedIndex].url && (
                                <a className="disaster-url" href={resourcesMap[predictedIndex].url} target="_blank" rel="noopener noreferrer">
                                    Click here to learn more
                                </a>
                            )}
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default DamageAssessor;
