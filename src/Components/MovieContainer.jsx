
import React from 'react';

const MovieContainer = (props) => {
	const AddorRemove = props.AddRmvSelectedMovies;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='posters'>
					<img src={movie.Poster} alt='movie'></img><p>{movie.Title}</p>
			
					<div
						onClick={() => props.handleSelectMovie(movie)}
						className='Icon'
					>
						<AddorRemove />
					</div>
					
				</div>
			))}

		</>
	);
};

export default MovieContainer;