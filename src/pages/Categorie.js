import React, { useEffect, useState } from 'react';
import SingleItem from '../components/SingleItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import PaginationComponent from '../components/Pagination';
import { useParams } from 'react-router-dom';

const Categorie = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const { categorie } = useParams();

    useEffect(() => {
        async function loadItems(categorie) {
            try {
                const { data } = await axios.get(
                    'http://localhost:3000/api/items?categorie=' + categorie
                );
                setItems(data.data);
                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        loadItems(categorie);
    }, [categorie]);

    const handlePagination = async (index) => {
        try {
            setLoading(true);

            const { data } = await axios.get(
                `http://localhost:3000/api/items?categorie=${categorie}&page=${index}`
            );

            setItems(data.data);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Articles concernant la thématique {categorie.toUpperCase()}</h2>
            <Row xs={1} md={2} lg={3} xl={4}>
                {items.map(
                    ({
                        _id,
                        title,
                        categorie,
                        description,
                        image,
                        createdAt,
                    }) => (
                        <Col key={_id}>
                            <SingleItem
                                link={true}
                                showImage={false}
                                id={_id}
                                title={title}
                                categorie={categorie}
                                description={description}
                                imageUrl={image}
                                createdAt={createdAt}
                                loading={loading}
                            />
                        </Col>
                    )
                )}
            </Row>
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                handleClick={handlePagination}
                disabled={loading || totalPages === 1}
            />
        </div>
    );
};

export default Categorie;
