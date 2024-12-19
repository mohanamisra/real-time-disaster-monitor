import './App.css'
import {useState, useEffect} from 'react'
import {fetchAllDisasters, fetchOngoingDisasters} from "./api/index.js";
import Map from "./Map/Map.jsx";

function App() {
    const [totalDisasterCount, setTotalDisasterCount] = useState(122);
    const [ongoingDisasterCount, setOngoingDisasterCount] = useState(2);
    const [ongoingDisasterList, setOngoingDisasterList] = useState(['Tropical Cyclone Fengal', 'Tropical Cyclone Remal']);

    // useEffect(() => {
    //     fetchAllDisasters()
    //         .then(response => {
    //             setTotalDisasterCount(response.data.totalCount)
    //         })
    //     fetchOngoingDisasters()
    //         .then(response => {
    //             const newOngoingDisasterList = []
    //             response.data.data.forEach(disaster => {
    //                 newOngoingDisasterList.push(disaster.fields.name.substring(0, disaster.fields.name.indexOf(" -")))
    //             })
    //             setOngoingDisasterCount(response.data.totalCount)
    //             setOngoingDisasterList(newOngoingDisasterList)
    //         })
    // }, []);

    return (
        <div className='app-container'>
            <header>
                <h1>Real-Time Disaster Monitoring in India</h1>
            </header>

            <section className="dashboard-content">
                <section className='sidebar'>
                    <section className="overview">
                        <h2>General Overview</h2>
                        <div className="content">
                            <ul>
                                <li>Total Disasters Count: <span className="data">{totalDisasterCount}</span></li>
                                <li>Ongoing Disasters: <span className="data">{ongoingDisasterCount}</span></li>
                                <li>Total People Affected Currently (estimated): <span
                                    className="data">{totalDisasterCount}</span></li>
                                <li>No. of Active Shelters near Ongoing Disasters <span
                                    className="data">{totalDisasterCount}</span></li>
                            </ul>
                        </div>
                    </section>
                    <section className="help-out">
                        <div className="content">
                            <h2>Help Out</h2>
                            <input type="search"/>
                            <p>Provide assistance and relief to disaster affected individuals.</p>
                            <ul className="jobs">

                            </ul>
                        </div>
                    </section>
                </section>

                <div className="general-area">
                    <section className="map">
                        <Map/>
                    </section>
                    <section className="tools">
                        <div className="ai-flood-predictor">
                            <h2>AI Flood Predictor</h2>
                        </div>
                        <div className="ai-damage-assement">
                            <h2>AI Damage Assessment Tool</h2>
                            <p>
                                <b>Step 1</b>: Upload an image whose damage you want to assess. We do not store any uploaded images.<br/>
                                <b>Step 2</b>: Click the submit button.<br/>
                                <b>Step 3</b>: A dialog box with opens up.<br/>
                                <b>Step 4</b>: Review the AI analysis.<br/>
                                <b>Step 5</b>: Close the dialog box.<br/>
                            </p>
                        </div>
                    </section>
                </div>
            </section>

            <footer>
                Made by Mohana Misra &#169;
            </footer>
        </div>
    )
}

export default App
