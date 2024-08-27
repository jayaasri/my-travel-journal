// src/components/BucketList.js

import React, { Component } from 'react';
import staticBucketList from '../data/data1';

class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlace: '',
      bucketList: staticBucketList, // Initialize with static data
    };
  }

  // Handle input change
  handleChange = (e) => {
    this.setState({ newPlace: e.target.value });
  };

  // Add new place to the bucket list
  handleAddPlace = () => {
    const { newPlace, bucketList } = this.state;
    if (newPlace.trim()) {
      this.setState({
        bucketList: [...bucketList, { name: newPlace, visited: false }],
        newPlace: '',
      });
    }
  };

  // Toggle the visited status of a place
  handleToggleVisited = (index) => {
    const { bucketList } = this.state;
    const updatedList = bucketList.map((item, i) =>
      i === index ? { ...item, visited: !item.visited } : item
    );
    this.setState({ bucketList: updatedList });
  };

  // Render the component
  render() {
    const { newPlace, bucketList } = this.state;

    return (
      <div className="container mt-5">
        <h1 className="mb-4">Travel Bucket List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newPlace}
            onChange={this.handleChange}
            placeholder="Enter a place"
            className="form-control mb-2"
          />
          <button
            type="button"
            onClick={this.handleAddPlace}
            className="btn btn-primary"
          >
            Add Place
          </button>
        </div>

        <ul className="list-group">
          {bucketList.map((item, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                item.visited ? 'list-group-item-success' : ''
              }`}
            >
              <span>{item.name}</span>
              <button
                onClick={() => this.handleToggleVisited(index)}
                className="btn btn-sm btn-secondary"
              >
                {item.visited ? 'Unmark' : 'Mark as Visited'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BucketList;
