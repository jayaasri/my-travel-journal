import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
function Home() {
    return (
        <div className="frontpage-container d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="display-3 text-white">Welcome to My Travel Journal</h1>
            <p className="lead text-white">Stories and Snapshots from My Adventures.</p>
            <Link to="/journal" className="btn btn-primary btn-lg mt-3">Explore My Journal</Link>
        </div>
    );
}

export default Home;
