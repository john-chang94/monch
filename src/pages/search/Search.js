import React from 'react'
import { Restaurants } from '../../components/Restaurants'
import { SearchBar } from '../../components/SearchBar'

import { useRestaurants } from '../../contexts/RestaurantsContext';

export const Search = () => {
    const { searchResults } = useRestaurants();

    return (
        <div>
            <SearchBar />
            <Restaurants restaurants={searchResults} />
        </div>
    )
}