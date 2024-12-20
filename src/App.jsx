import './App.css'
import {useState, useEffect} from 'react'
// import {fetchAllDisasters, fetchOngoingDisasters, fetchDisasterReport, fetchJobs} from "./services/index.js";
// import {fetchReports} from "./services/reports.js";
import Map from "./Map/Map.jsx";

function App() {
    const [totalDisasterCount, setTotalDisasterCount] = useState(0);
    const [ongoingDisasterCount, setOngoingDisasterCount] = useState(0);
    const [numAffected, setNumAffected] = useState(0);
    const [numShelters, setNumShelters] = useState(0);
    const [jobsList, setJobList] = useState([]);
    // const [ongoingDisasterList, setOngoingDisasterList] = useState(['Tropical Cyclone Fengal', 'Tropical Cyclone Remal']);

    useEffect(() => {
        // Fetch total disasters count
        fetch("/api/disasters")
            .then(res => res.json())
            .then(data => setTotalDisasterCount(data.totalCount))
            .catch(console.error);

        // Fetch ongoing disasters
        fetch("/api/disasters/ongoing")
            .then(res => res.json())
            .then(data => {
                data.data.forEach(disaster => {
                    fetch(`/api/disasters/${disaster.id}/reports`)
                        .then(res => res.json())
                        .then(reportData => {
                            console.log(reportData); // Handle disaster-specific reports
                        });
                });
                setOngoingDisasterCount(data.totalCount);
            })
            .catch(console.error);

        // Fetch jobs
        fetch("/api/jobs")
            .then(res => res.json())
            .then(data => {
                const newJobsList = data.data.map(job => ({
                    title: job.fields.title,
                    source: job.fields.source[0].name,
                    closing: job.fields.date.closing,
                    url: job.fields.url
                }));
                setJobList(newJobsList);
            })
            .catch(console.error);
    }, []);


    // useEffect(() => {
    //     fetchAllDisasters()
    //         .then(response => {
    //             setTotalDisasterCount(response.data.totalCount)
    //         });
    //
    //     fetchOngoingDisasters()
    //         .then(response => {
    //             // const newOngoingDisasterList = []
    //             response.data.data.forEach(disaster => {
    //                 // newOngoingDisasterList.push(disaster.fields.name.substring(0, disaster.fields.name.indexOf(" -")))
    //                 fetchDisasterReport(Number(disaster.id))
    //                     .then(response => {
    //                         // console.log(response.data.data[0].fields.url);
    //                         // fetchReports(response.data.data[0].fields.url)
    //                         //     .then(response => {
    //                         //         console.log(response.data);
    //                         //     })
    //                     })
    //             })
    //             setOngoingDisasterCount(response.data.totalCount)
    //             // setOngoingDisasterList(newOngoingDisasterList)
    //         });
    //
    //     fetchJobs()
    //         .then(response => {
    //             const newJobsList = [];
    //             response.data.data.forEach(job => {
    //                 const newJob = {
    //                     title: job.fields.title,
    //                     source: job.fields.source[0].name,
    //                     closing: job.fields.date.closing,
    //                     url: job.fields.url,
    //
    //                 };
    //                 newJobsList.push(newJob);
    //             })
    //             setJobList(newJobsList);
    //         });
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
                                    className="data">{numAffected}</span></li>
                                <li>No. of Active Shelters near Ongoing Disasters <span
                                    className="data">{numShelters}</span></li>
                            </ul>
                        </div>
                    </section>
                    <section className="help-out">
                        <div className="content">
                            <h2>Help Out</h2>
                            <input type="search"/>
                            <p>Provide assistance and relief to disaster affected individuals.</p>
                            <ul className="jobs">
                                {jobsList.map((job, index) => (
                                    <li key = {index}>{job.title}</li>
                                ))}
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
