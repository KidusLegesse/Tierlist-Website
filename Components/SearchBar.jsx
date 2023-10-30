import React from 'react';

const SearchBar = (props) => {
	return (
		<div className='search-bar'>
			<input
				value={props.value}
				onChange={(event) => props.setSearchMovie(event.target.value)}
				placeholder='Search Movies...'
				
			></input>
		</div>
	);
};

export default SearchBar;