import React from 'react';
import { useParams } from 'react-router-dom';

const ItemPage = () => {
    const { id } = useParams();

    return <div>Article numéro {id} </div>;
};

export default ItemPage;
