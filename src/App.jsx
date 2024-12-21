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
                    <section className="overview">
                        <Overview/>
                    </section>
                    <section className="help-out">
                        <div className="content">
                            <h2>Help Out</h2>
                            <input type="search"/>
                            <p>Provide assistance and relief to disaster affected individuals.</p>
                            <Jobs/>
                        </div>
                    </section>
                </section>

                <div className="general-area">
                    <section className="map">
                        <Map/>
                    </section>
                    <section className="tools">
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
