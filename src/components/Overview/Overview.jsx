import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import {fetchAllDisasters, fetchOngoingDisasters, fetchDisasterReport} from "../../services/index.js";

const Overview = () => {
    const [totalDisasterCount, setTotalDisasterCount] = useState(0);
    const [ongoingDisasterCount, setOngoingDisasterCount] = useState(0);
    const [numAffected, setNumAffected] = useState(0);
    const [numShelters, setNumShelters] = useState(0);

    useEffect(() => {
        fetchAllDisasters()
            .then(response => {
                setTotalDisasterCount(response.data.totalCount)
            });

        fetchOngoingDisasters()
            .then(response => {
                response.data.data.forEach(disaster => {
                    fetchDisasterReport(Number(disaster.id))
                        .then(response => {
                            const reportUrl = response.data.data[0].fields.url;
                            axios.get(`http://localhost:3000/fetch-report?url=${encodeURIComponent(reportUrl)}`)
                                .then(response => {
                                    console.log(response.data.report); // Log the report content
                                })
                                .catch(error => {
                                    console.error("Error fetching report from server:", error);
                                });
                        })
                })
                setOngoingDisasterCount(response.data.totalCount)
            });
    }, []);

    return (
        <>
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
        </>
    );
};

export default Overview;