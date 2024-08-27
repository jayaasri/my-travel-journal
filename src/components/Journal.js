import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import withEntries from '../withEntries'; // Path to the HOC
import { Link } from 'react-router-dom';

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: null,
      hasError: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Update state based on props changes if needed
    if (nextProps.entries !== prevState.entries) {
      return { entries: nextProps.entries };
    }
    return null;
  }

  componentDidMount() {
    // Code to run after the component mounts
    console.log("Journal component mounted.");
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Determine if component should update
    return nextProps.entries !== this.state.entries || nextState.hasError !== this.state.hasError;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture information before changes are made
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Perform actions after component updates
    console.log("Journal component updated.");
  }

  componentWillUnmount() {
    // Cleanup if necessary
    console.log("Journal component will unmount.");
  }

  static getDerivedStateFromError(error) {
    // Handle errors and update state
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error information
    console.error("Error occurred:", error, info);
  }

  exportToPDF = () => {
    const doc = new jsPDF();
    const content = document.getElementById('journal-content');
    
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('travel-journal.pdf');
    });
  };

  render() {
    const { entries } = this.props; // Use entries from props

    return (
      <div className="container mt-5">
        <h1 className="mb-4">Journal Entries</h1>
        <button onClick={this.exportToPDF} className="btn btn-danger mb-4">
          Export as PDF
        </button>
        <div id="journal-content">
          {entries.map((entry) => (
            <div key={entry.id} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{entry.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{entry.fromDate} to {entry.tillDate}</h6>
                <p className="card-text">{entry.country}</p>
                {entry.image && <img src={entry.image} alt={entry.title} className="img-fluid mb-2" />}
                <p className="card-text">{entry.desc}</p>
                <a href={entry.link} target="_blank" rel="noopener noreferrer" className="card-link">View on Map</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withEntries(Journal);
