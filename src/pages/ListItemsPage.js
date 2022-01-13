import React, { useEffect, useState } from 'react';
import SingleItem from '../components/SingleItem';
import axios from 'axios';

const ListItemsPage = () => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        async function loadItems() {
            try {
                const { data } = await axios.get(
                    'http://localhost:3000/api/items'
                );
                setItem(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadItems();
    }, []);
    const fefe = () => {
        console.log('hello world');
    };
    return (
        <div>
            <h1>Derniers articles</h1>
            {item.map(
                ({ _id, title, categorie, description, image, createdAt }) => (
                    <SingleItem
                        link={true}
                        showImage={false}
                        id={_id}
                        key={_id}
                        title={title}
                        categorie={categorie}
                        description={description}
                        imageUrl={image}
                        createdAt={createdAt}
                    />
                )
            )}
        </div>
    );
};

export default ListItemsPage;
