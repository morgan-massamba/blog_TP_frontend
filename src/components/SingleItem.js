import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const SingleItem = ({
    showImage,
    customWidth,
    title,
    categorie,
    description,
    imageUrl,
    createdAt,
    id,
    link,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/items/${id}`);
    };
    return (
        <>
            <Card
                className="mt-4 text-center"
                style={{
                    width: customWidth ? customWidth : 'auto',
                }}
            >
                {showImage && <Card.Img variant="top" src={imageUrl} />}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="text-muted">
                        Catégorie: {categorie?.toUpperCase()}
                    </Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    {link && (
                        <Button variant="primary" onClick={handleClick}>
                            See more
                        </Button>
                    )}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Created at {createdAt}</small>
                </Card.Footer>
            </Card>
        </>
    );
};

export default SingleItem;
