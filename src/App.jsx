import './App.css'
import {useState, useEffect} from 'react'
import {fetchAllDisasters, fetchOngoingDisasters} from "./api/index.js";

function App() {
    const [totalDisasterCount, setTotalDisasterCount] = useState(0);
    const [ongoingDisasterCount, setOngoingDisasterCount] = useState(0);
    const [ongoingDisasterList, setOngoingDisasterList] = useState([]);

    useEffect(() => {
        fetchAllDisasters()
            .then(response => {
                setTotalDisasterCount(response.data.totalCount)
            })
        fetchOngoingDisasters()
            .then(response => {
                const newOngoingDisasterList = []
                response.data.data.forEach(disaster => {
                    newOngoingDisasterList.push(disaster.fields.name.substring(0, disaster.fields.name.indexOf(" -")))
                })
                setOngoingDisasterCount(response.data.totalCount)
                setOngoingDisasterList(newOngoingDisasterList)
            })
    }, []);

    return (
        <>
            <p>Total Disasters: {totalDisasterCount}</p>
            <p>Currently Ongoing: {ongoingDisasterCount}</p>
            {ongoingDisasterList.map((disaster, index) => {
                return (
                    <p key={index}>{disaster}</p>
                )
            })}
        </>
    )
}

export default App
