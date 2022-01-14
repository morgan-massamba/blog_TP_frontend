import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleItem from '../components/SingleItem';
import axios from 'axios';

const ItemPage = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        async function loadItem(id) {
            try {
                const { data } = await axios.get(
                    'http://localhost:3000/api/items/' + id
                );
                setItem(data.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        loadItem(id);
    }, [id]);

    return (
        <div>
            <h2>Mon article: </h2>
            {item && (
                <SingleItem
                    link={false}
                    id={item._id}
                    title={item.title}
                    categorie={item.categorie}
                    description={item.description}
                    imageUrl={item.image}
                    createdAt={item.createdAt}
                    showImage={true}
                    customWidth="23rem"
                    loading={loading}
                />
            )}
        </div>
    );
};

export default ItemPage;
