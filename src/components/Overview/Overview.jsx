import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import {fetchAllDisasters, fetchOngoingDisasters, fetchDisasterReport} from "../../services/index.js";
import {fetchAffectedHospitals, fetchAffectedSchools} from "../../services/nearby.js";
import {earthquakeLocations, cycloneLocations, landslideLocations} from "../../services/data.js";
import './Overview.css'

const Overview = () => {
    const [totalDisasterCount, setTotalDisasterCount] = useState(null);
    const [ongoingDisasterCount, setOngoingDisasterCount] = useState(null);
    const [numAffected, setNumAffected] = useState(null);
    const [numShelters, setNumShelters] = useState(null);
    const [totalHospitalsCount, setTotalHospitalsCount] = useState(237);
    const [totalSchoolsCount, setTotalSchoolsCount] = useState(26);
    const allLocations = [...earthquakeLocations, ...cycloneLocations, ...landslideLocations];

    const calcTotalHospitalsAffected = async () => {
        const hospitalPromises = allLocations.map(async (location) => {
            const hospitals = await fetchAffectedHospitals(location[0], location[1]);
            return hospitals.map(hospital => hospital.id);
        });

        const hospitalIdsArrays = await Promise.all(hospitalPromises);
        const uniqueHospitalIds = new Set(hospitalIdsArrays.flat());
        const uniqueHospitalCount = uniqueHospitalIds.size;
        setTotalSchoolsCount(uniqueHospitalCount);
    };

    const calcTotalSchoolsAffected = async () => {
        const schoolPromises = allLocations.map(async (location) => {
            const schools = await fetchAffectedSchools(location[0], location[1]);
            return schools.map(school => school.id);
        });

        const schoolIdsArrays = await Promise.all(schoolPromises);
        const uniqueSchoolIds = new Set(schoolIdsArrays.flat());
        const uniqueSchoolCount = uniqueSchoolIds.size;
        setTotalSchoolsCount(uniqueSchoolCount);
    };

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
        calcTotalHospitalsAffected();
        calcTotalSchoolsAffected();
    }, []);

    return (
        <section className = "overview">
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
            <div className = "border"></div>
        </section>
    );
};

export default Overview;