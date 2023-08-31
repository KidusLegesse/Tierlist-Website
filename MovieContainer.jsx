
import React, { useState , useEffect, useRef} from 'react';
import axios from 'axios';
import DraggableItem from './DraggableItem'; 

const MovieContainer = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchBarRef = useRef(null);
  const [isSearchBarVisible, setSearchBarVisible] = useState(true);

  const closeSearch = () => {
    setSearchBarVisible(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        closeSearchBar();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (!searchQuery) return;

    setSearchResults([]);
    setLoading(true);

    const url = '';
    const params = {
      q: searchQuery,
    };

    const headers = {

    };

    
    axios
      .get(url, { params, headers })
      .then((response) => {
        
        const movies = response.data;

        if (movies && movies.length > 0) {
          
          const formattedResults = movies.map((movie) => ({
            name: movie.title,
            imageUrl: movie.image ? movie.image.url : '',
          }));

          
          setSearchResults(formattedResults);
        } else {
          
          console.log('No movies found.');
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      });
  };

  return (
    <>  
      <div ref={searchBarRef} className="overlay">
        <div ref={searchBarRef} className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button className= "close-button" onClick={closeSearch}>X</button>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading && <div>Loading...</div>}
      {searchResults.map((movie) => (
      <DraggableItem key={movie.name} name={movie.name} imageUrl={movie.imageUrl} />
      ))}
    </>

  );
};

export default MovieContainer;
