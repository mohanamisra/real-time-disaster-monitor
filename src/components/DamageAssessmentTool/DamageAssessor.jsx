import React, { useState, useEffect } from 'react';
import "./DamageAssessor.css";
import * as tf from "@tensorflow/tfjs";
import uploadImage from "../../assets/upload_image.webp";
import Modal from 'react-modal';

const labels = ['damage_drought', 'damage_earthquake', 'damage_human', 'damage_infrastructure', 'damage_landslide', 'damage_nature', 'damage_urbanfire', 'damage_water', 'damage_wildfire', 'no_damage_human', 'no_damage_infrastructure', 'no_damage_nature', 'no_damage_water'];

const DamageAssessor = () => {
    const [model, setModel] = useState(null);
    const [fileName, setFileName] = useState('');
    const [predictedClass, setPredictedClass] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageDataUrl, setImageDataUrl] = useState(''); // Store the image data URL

    useEffect(() => {
        const loadModel = async () => {
            const modelUrl = `public/tfjs_model/model.json`;
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
                const predictedIndex = flatPrediction.indexOf(Math.max(...flatPrediction));
                const predictedLabel = labels[predictedIndex];

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

    return (
        <div className="ai-damage-assessment">
            <h2>AI Damage Assessment Tool</h2>
            <p>
                <span className="label">Step 1</span>: Upload an image whose damage you want to assess. We do not store any uploaded
                images.<br />
                <span className="label">Step 2</span>: Click the submit button.<br />
                <span className="label">Step 3</span>: A dialog box opens up.<br />
                <span className="label">Step 4</span>: Review the AI analysis.<br />
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
                <h2>Prediction Result</h2>
                <div>
                    <img src={imageDataUrl} alt="Uploaded" className="uploaded-image" style={{width:"300px"}}/>
                </div>
                <p>The uploaded image belongs to the class: <strong>{predictedClass}</strong></p>
                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal>
        </div>
    );
};

export default DamageAssessor;
