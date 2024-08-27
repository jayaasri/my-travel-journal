import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card(props) {
    return (
        <div className="d-flex justify-content-center my-3">
            <div className="card text-center" style={{ maxWidth: "540px" }}>
                <img src={props.image} className="card-img-top img-fluid" alt={props.title} style={{ maxHeight: "300px", objectFit: "cover" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">📍 {props.country}</h6>
                    <p className="card-text">{props.fromDate} - {props.tillDate}</p>
                    <p className="card-text">{props.desc}</p>
                    <a href={props.link} className="card-link">View on Google Maps</a>
                </div>
            </div>
        </div>
    );
}
