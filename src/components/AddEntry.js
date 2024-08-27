import React, { useState } from 'react';
import { useEntries } from '../EntryContext';

// Helper function to generate Google Maps link from address
const generateGoogleMapsLink = (address) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
};

const AddEntry = () => {
  const { entries, setEntries } = useEntries(); // Use context for entries state management
  const [currentEntry, setCurrentEntry] = useState({
    id: '',
    title: '',
    fromDate: '',
    tillDate: '',
    country: '',
    image: '',
    link: '',
    desc: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry((prev) => ({
      ...prev,
      [name]: value,
      link: name === 'country' ? generateGoogleMapsLink(value) : prev.link, // Auto-generate Google Maps link for country
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentEntry((prev) => ({
          ...prev,
          image: reader.result,
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new entry
  const handleAdd = () => {
    setEntries((prev) => [
      ...prev,
      { ...currentEntry, id: prev.length + 1 }, // Simple ID generation
    ]);
    resetForm();
  };

  // Update existing entry
  const handleUpdate = () => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === currentEntry.id ? currentEntry : entry
      )
    );
    resetForm();
  };

  // Delete entry
  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Select an entry for editing
  const handleEdit = (entry) => {
    setCurrentEntry(entry);
    setImagePreview(entry.image);
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setCurrentEntry({
      id: '',
      title: '',
      fromDate: '',
      tillDate: '',
      country: '',
      image: '',
      link: '',
      desc: '',
    });
    setImagePreview('');
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{isEditing ? 'Update Entry' : 'Add New Entry'}</h1>
      <form className="mb-4">
        <input
          type="text"
          name="title"
          value={currentEntry.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-control mb-2"
        />
        <input
          type="date"
          name="fromDate"
          value={currentEntry.fromDate}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="date"
          name="tillDate"
          value={currentEntry.tillDate}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="country"
          value={currentEntry.country}
          onChange={handleChange}
          placeholder="Country"
          className="form-control mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="link"
          value={currentEntry.link}
          placeholder="Google Maps Link"
          className="form-control mb-2"
          readOnly
        />
        <textarea
          name="desc"
          value={currentEntry.desc}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-2"
        />
        <button
          type="button"
          onClick={isEditing ? handleUpdate : handleAdd}
          className="btn btn-primary me-2"
        >
          {isEditing ? 'Update' : 'Add Entry'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </form>

      {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px', marginBottom: '20px' }} />}
      
      <h2>Existing Entries</h2>
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry.id} className="list-group-item mb-3">
            <h3>{entry.title}</h3>
            <p>{entry.fromDate} to {entry.tillDate}</p>
            <p>{entry.country}</p>
            {entry.image && <img src={entry.image} alt={entry.title} style={{ height: '100px' }} className="mb-2" />}
            <p>{entry.desc}</p>
            <a href={entry.link} target="_blank" rel="noopener noreferrer" className="d-block mb-2">View on Map</a>
            <button onClick={() => handleEdit(entry)} className="btn btn-warning me-2">Edit</button>
            <button onClick={() => handleDelete(entry.id)} className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntry;
