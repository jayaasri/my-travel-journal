import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddEntry from './components/AddEntry';
import BucketList from './components/BucketList';
import Journal from './components/Journal';

import { useEntries } from './EntryContext'; // Adjust import as needed

function App() {
  const { entries } = useEntries(); // Fetch entries from context

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addEntry" element={<AddEntry />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/bucket-list" element={<BucketList />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
