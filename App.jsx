import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieContainer from './Components/MovieContainer';
import Tierlist from './Components/Tierlist';
import SearchBar from './Components/SearchBar';
import AddMovie from './Components/AddMovie';
import RemoveSelectedMovie from './Components/RemoveSelectedMovie';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const App = () => {
	const [searchedMovie, setSearchedMovie] = useState('');
	const [listofMovies, SetlistofMovies] = useState([]);
	const [selectedMovies, setSelectedMovies] = useState([]);

	const searchForMovie = async (searchedMovie) => {
		const url = `http://www.omdbapi.com/?s=${searchedMovie}&apikey=(Removed for security reasons)`;
		const movieInformation = await fetch(url);
		const JsonMovieInformation = await movieInformation.json();
		if (JsonMovieInformation.Search) {SetlistofMovies(JsonMovieInformation.Search);
		} else {SetlistofMovies([])}
	};

	useEffect(() => {searchForMovie(searchedMovie);},[searchedMovie]);

	const selectMovie = (movie) => {
		const moviesSelected = [...selectedMovies, movie];
		setSelectedMovies(moviesSelected);
		saveMovie(moviesSelected);
	};

	const removeselectedMovie = (movie) => {
		const moviesSelected = selectedMovies.filter(
			(selectedmovie) => selectedmovie.imdbID !== movie.imdbID
		);
		
		setSelectedMovies(moviesSelected);
		saveMovie(moviesSelected);
	};

	const saveMovie = (items) => {
		const stringofitems=JSON.stringify(items)
		localStorage.setItem('save selected movies', stringofitems);
	};

	useEffect(() => {
		const moviesSelected = JSON.parse(localStorage.getItem('save selected movies')
		);
		if (moviesSelected) {setSelectedMovies(moviesSelected);}
	}, []);


	return (
    <>
		<DragDropContext>
		<div className='container-fluid Movie-Search'>
			<h1 className='Title'>Movie TierList</h1>
      <Tierlist/>
      <SearchBar searchMovie={searchedMovie} setSearchMovie={setSearchedMovie} />
			<div className='col'>
				<MovieContainer
					movies={listofMovies}
					handleSelectMovie={selectMovie}
					AddRmvSelectedMovies={AddMovie}
				/>
			</div>
		</div>
		<div className="container-fluid Movie-Container">
          <h3>Movies</h3>
          <div className='row'>
            <MovieContainer
              movies={selectedMovies}
              handleSelectMovie={removeselectedMovie}
              AddRmvSelectedMovies={RemoveSelectedMovie}
            />
          </div> 
        </div>
			</DragDropContext>
     </>
	);
};

export default App;