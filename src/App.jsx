import './App.css'
import Overview from "./components/Overview/Overview.jsx";
import Map from "./components/Map/Map.jsx";
import Jobs from "./components/Jobs/Jobs.jsx";
import DamageAssessor from "./components/DamageAssessmentTool/DamageAssessor.jsx";
import FloodPredictor from "./components/FloodPredictor/FloodPredictor.jsx";

function App() {
    return (
        <div className='app-container'>
            <header>
                <h1>Real-Time Disaster Monitoring in India</h1>
            </header>

            <section className="dashboard-content">
                <section className='sidebar'>
                    <Overview/>
                </section>

                <div className="general-area">
                    <section className="map">
                        <Map/>
                    </section>
                    <section className="tools">
                        <Jobs/>
                        <FloodPredictor/>
                        <DamageAssessor/>
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
