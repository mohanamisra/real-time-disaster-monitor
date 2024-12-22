import React from 'react';
import {useEffect, useState} from "react";
import {fetchJobs} from "../../services/index.js";
import './Jobs.css'

const Jobs = () => {
    const [jobsList, setJobList] = useState([]);

    useEffect(() => {
        fetchJobs()
            .then(response => {
                const newJobsList = [];
                response.data.data.forEach(job => {
                    let date = job.fields.date.closing.substring(0, 10);
                    date = date.replaceAll("-", "/");
                    let dateVals = date.split("/");
                    dateVals = dateVals.reverse();
                    let jobDate = dateVals.join("/");
                    console.log(dateVals);
                    const newJob = {
                        title: job.fields.title,
                        source: job.fields.source[0].name,
                        closing: jobDate,
                        url: job.fields.url,

                    };
                    newJobsList.push(newJob);
                })
                setJobList(newJobsList);
            })
    }, []);
    return (
        <section className="help-out">
            <div className="content">
                <h2>Help Out</h2>
                <input type="search"/>
                <p>Provide assistance and relief to disaster affected individuals.</p>
                <ul className="jobs">
                    {jobsList.map((job, index) => (
                        <li className = "job-card" key={index}>
                            <span className="title">{job.title}</span>
                            <span className="source"><span className = "label">Employer</span>: {job.source}</span>
                            <span className="closing"><span className = "label">Apply by</span>: {job.closing}</span>
                            <span className="url"><span className = "label">Apply here:</span> <a href={job.url} aria-label="third-party link to apply to the jobs">Click here</a></span>
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
};

export default Jobs;