import React from 'react';
import {useEffect, useState} from "react";
import {fetchJobs} from "../../services/index.js";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import './Jobs.css'
import TextField from "@mui/material/TextField";

const filter = createFilterOptions();

const Jobs = () => {
    const [jobsList, setJobList] = useState([]);
    const [value, setValue] = useState(null);

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
                {/*<input type="search"/>*/}
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue({
                                title: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                title: newValue.inputValue,
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        const isExisting = options.some((option) => inputValue === option.title);
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={jobsList}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.title;
                    }}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                {option.title}
                            </li>
                        );
                    }}
                    style={{width: '90%', margin: '12px 0px'}}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Search for Jobs" size="small"/>
                    )}
                />

                <p>Provide assistance and relief to disaster affected individuals.</p>
                <ul className="jobs">
                    {jobsList.map((job, index) => (
                        <li className = "job-card" key={index}>
                            <div className="card-top">
                                <span className="title">{job.title}</span>
                                <span className="url"><span className="label"></span> <a href={job.url}
                                                                                                    aria-label="third-party link to apply to the jobs">(Click to Apply)</a></span>
                            </div>
                            <span className="source"><span className="label">Employer</span>: {job.source}</span>
                            <span className="closing"><span className= "label">Apply by</span>: {job.closing}</span>
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
};

export default Jobs;