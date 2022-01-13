import React from 'react';
import { useParams } from 'react-router-dom';
import SingleItem from '../components/SingleItem';

const ItemPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Article numero {id}</h1>
            <SingleItem showImage={true} customWidth="21rem" />
        </div>
    );
};

export default ItemPage;
