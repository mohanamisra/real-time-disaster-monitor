import React from 'react';
import {useEffect, useState} from "react";
import {fetchJobs} from "../../services/index.js";

const Jobs = () => {
    const [jobsList, setJobList] = useState([]);

    useEffect(() => {
        fetchJobs()
            .then(response => {
                const newJobsList = [];
                response.data.data.forEach(job => {
                    const newJob = {
                        title: job.fields.title,
                        source: job.fields.source[0].name,
                        closing: job.fields.date.closing,
                        url: job.fields.url,

                    };
                    newJobsList.push(newJob);
                })
                setJobList(newJobsList);
            })
    }, []);
    return (
        <ul className="jobs">
            {jobsList.map((job, index) => (
                <li key={index}>
                    <span className="title">{job.title}</span>
                    <span className="source">{job.source}</span>
                    <span className="closing">Apply by: {job.closing}</span>
                    <span className="url"><a href={job.url}>Link to apply</a></span>
                </li>
            ))}
        </ul>
    );
};

export default Jobs;