// Tier.js

import React from 'react';
import { useDrag } from 'react-dnd';
import './Tierlist.css';


const Tier = ({ name, height, color }) => {
  const [, drag] = useDrag({
    type: 'TIER',
  });


  return (
    <div ref={drag} className="tier" style={{ height: `${height}px` }}>
      <div className="tier-title-column">
        <div className="tier-title-box" style={{ backgroundColor: color }}>
          <div className="tier-title">{name}</div>
        </div>
      </div>
      <div className="tier-content-column">
        <div className="tier-content">
          <div className="tier-separator" />
          {}
        </div>
      </div>
    </div>
  );
};

export default Tier;
