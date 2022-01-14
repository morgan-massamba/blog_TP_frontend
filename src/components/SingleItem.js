import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    loading,
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
                {loading ? (
                    <Row
                        style={{ height: '200px' }}
                        className="align-items-center justify-content-center"
                    >
                        <Col>
                            <Spinner animation="border" />
                        </Col>
                    </Row>
                ) : (
                    <>
                        {showImage && <Card.Img variant="top" src={imageUrl} />}
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="text-muted">
                                Catégorie: {categorie?.toUpperCase()}
                            </Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            {link && (
                                <Button variant="primary" onClick={handleClick}>
                                    Voir plus
                                </Button>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">
                                Crée le{' '}
                                {dayjs(createdAt).format('DD MMMM YYYY')}
                            </small>
                        </Card.Footer>
                    </>
                )}
            </Card>
        </>
    );
};

export default SingleItem;
