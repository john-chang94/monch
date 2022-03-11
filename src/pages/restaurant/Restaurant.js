import React from 'react'
import { useParams } from 'react-router-dom'

export default function Restaurant() {
    const { restaurantId } = useParams();
    
    return (
        <div>
            RESTAURANT {restaurantId}
        </div>
    )
}