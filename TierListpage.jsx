import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Tierlist from './Tierlist';


const TierListpage = () => {
  const [pageTitle, setPageTitle] = useState('Default Title'); 

  const handleTitleChange = (event) => {
    setPageTitle(event.target.value);
  };

  const handleTitleSubmit = (event) => {
    event.preventDefault(); 
  };
  return(
    <>
      <div className='Create-Page'>
      <h1>{pageTitle}</h1>
      <form onSubmit={handleTitleSubmit}>
        <input
          type="text"
          value={pageTitle}
          onChange={handleTitleChange}
          placeholder="Enter your page title"
        />
        <button type="submit">Submit</button>
      </form>
      </div>
      <Tierlist/>
    </>
    
  )

};

export default TierListpage;