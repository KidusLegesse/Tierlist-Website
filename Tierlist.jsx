// TierList.js

import React, { useState , useEffect, useRef} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tier from './Tier';
import MovieContainer from './MovieContainer'; 
import './TierList.css';

const TierList = () => {
  const [tiers, setTiers] = useState(['A']);

  const defaultColors = ['#c0392b', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#8e44ad', '#95a5a6', '#a569bd'];

  const [selectedColor, setSelectedColor] = useState(defaultColors[0]); 

  const handleAddTier = () => {
  const startingTier = 'A';
  const alphabetChar = String.fromCharCode(startingTier.charCodeAt(0) + tiers.length);
  setTiers((prevTiers) => [...prevTiers, alphabetChar]);
  };

  const handleRemoveTier = () => {
    if (tiers.length > 1) {
      setTiers((prevTiers) => prevTiers.slice(0, -1));
    }
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleToggleSearchBar = () => {
    setShowSearchBar((prevShow) => !prevShow);
  };

  const boxWidth = 700; 
  const rowHeight = 70; 
  const boxHeight = tiers.length * rowHeight + (tiers.length - 1) * 10; 


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tier-list-container">
        <div className="tier-list-content">
          <div className="tier-list-box" style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}>
            {tiers.map((tier, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="tier-list-line" />}
                <Tier name={tier} height={rowHeight} key={index} title={tier.title} color={tier.color || defaultColors[index % defaultColors.length]}/>
                
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handleAddTier}>Add Tier</button>
        {tiers.length > 1 && <button onClick={handleRemoveTier}>Delete Tier</button>}
      </div>
      {}
      {showSearchBar && <MovieContainer/>}
      <div className="movie-container">
        <h3>Draggable Movie Covers</h3>
        <button onClick={handleToggleSearchBar}>+</button>
      </div>
    </DndProvider>
  );
};

export default TierList;
