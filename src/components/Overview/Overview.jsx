import React from 'react';
import {useState, useEffect} from 'react'
import {fetchAllDisasters, fetchOngoingDisasters, fetchDisasterReport} from "../../api/index.js";

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
                // const newOngoingDisasterList = []
                response.data.data.forEach(disaster => {
                    // newOngoingDisasterList.push(disaster.fields.name.substring(0, disaster.fields.name.indexOf(" -")))
                    fetchDisasterReport(Number(disaster.id))
                        .then(response => {
                            // console.log(response.data.data[0]);
                        })
                })
                setOngoingDisasterCount(response.data.totalCount)
                // setOngoingDisasterList(newOngoingDisasterList)
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