import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../../services';

import Restaurants from '../../components/Restaurants';

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(() => {
        const handleFetchData = async () => {
            const restaurants = await getRestaurants();
            setRestaurants(restaurants);
        }

        handleFetchData();
    }, [])
    return (
        <div>
            <div>
                <p>Featured</p>
            </div>
            <Restaurants restaurants={restaurants} />
        </div>
    )
}