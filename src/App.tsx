import React, { useState } from 'react';
import { Table, Button } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { loadData, aggregateMaxMinProduction, aggregateCropAverages } from './Components/dataUtils';
import './App.css'; 

function App() {
  const initialChunkSize = 10; // Initial number of rows to display
  const [maxMinChunkSize, setMaxMinChunkSize] = useState(initialChunkSize);
  const [cropAveragesChunkSize, setCropAveragesChunkSize] = useState(initialChunkSize);

  const data = loadData(); // Load data from dataUtils
  const maxMinProduction = aggregateMaxMinProduction(data); // Aggregate max and min production per year
  const cropAverages = aggregateCropAverages(data); // Aggregate crop averages between 1950-2020

  // Function to load more data for Max and Min Production table
  const loadMoreMaxMin = () => {
    setMaxMinChunkSize(prevSize => prevSize + 10);
  };

  // Function to show less data for Max and Min Production table
  const showLessMaxMin = () => {
    setMaxMinChunkSize(initialChunkSize);
  };

  // Function to load more data for Crop Averages table
  const loadMoreCropAverages = () => {
    setCropAveragesChunkSize(prevSize => prevSize + 10);
  };

  // Function to show less data for Crop Averages table
  const showLessCropAverages = () => {
    setCropAveragesChunkSize(initialChunkSize);
  };

  // Function to render the first table (Max and Min Production per Year)
  const renderMaxMinTable = () => (
    <div className="table-container">
      <h2>Max and Min Production per Year</h2>
      <Table className="custom-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Max Production</th>
            <th>Crop with Min Production</th>
          </tr>
        </thead>
        <tbody>
          {maxMinProduction.slice(0, maxMinChunkSize).map((row, index) => (
            <tr key={index}>
              <td>{row.Year}</td>
              <td>{row.MaxProductionCrop}</td>
              <td>{row.MinProductionCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="button-container">
        {maxMinChunkSize < maxMinProduction.length ? (
          <Button
            onClick={loadMoreMaxMin}
            variant="outline"
            className="load-more-button"
          >
            Load More <IconChevronDown size={16} />
          </Button>
        ) : (
          <Button
            onClick={showLessMaxMin}
            variant="outline"
            className="load-more-button"
          >
            Show Less <IconChevronUp size={16} />
          </Button>
        )}
      </div>
    </div>
  );

  // Function to render the second table (Crop Averages between 1950-2020)
  const renderCropAveragesTable = () => (
    <div className="table-container">
      <h2>Crop Averages between 1950-2020</h2>
      <Table className="custom-table">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield (Kg/Ha)</th>
            <th>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody>
          {cropAverages.slice(0, cropAveragesChunkSize).map((row, index) => (
            <tr key={index}>
              <td>{row.Crop}</td>
              <td>{row.AvgYield}</td>
              <td>{row.AvgArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="button-container">
        {cropAveragesChunkSize < cropAverages.length ? (
          <Button
            onClick={loadMoreCropAverages}
            variant="outline"
            className="load-more-button"
          >
            Load More <IconChevronDown size={16} />
          </Button>
        ) : (
          <Button
            onClick={showLessCropAverages}
            variant="outline"
            className="load-more-button"
          >
            Show Less <IconChevronUp size={16} />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="table-section">
        {renderMaxMinTable()}
      </div>
      <div className="table-section">
        {renderCropAveragesTable()}
      </div>
    </div>
  );
}

export default App;
