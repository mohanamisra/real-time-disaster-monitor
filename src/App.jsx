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

            <div className="dashboard-content">
                    <div className='sidebar'>
                        <div className="overview">
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
                        </div>
                        <div className="help-out">
                            <div className="content">
                                <h2>Help Out</h2>
                                <input type="search"/>
                                <p>Provide assistance and relief to disaster affected individuals.</p>
                                <ul className="jobs">

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="general-area">
                        <div className = "map">
                            <Map/>
                        </div>
                        <div className="tools">
                            <div className="ai-flood-predictor">
                                <h2>AI Flood Predictor</h2>
                            </div>
                            <div className="ai-damage-assement">
                                <h2>AI Damage Assessment Tool</h2>
                            </div>
                        </div>
                    </div>
            </div>

            <footer>
                Made by Mohana Misra
            </footer>
        </div>
    )
}

export default App
