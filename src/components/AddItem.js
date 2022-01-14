import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const [validated, setValidated] = useState(false);
    const [previewImg, setPreviewImg] = useState('/placeholder.jpg');
    const titleRef = useRef();
    const descriptionRef = useRef();
    const inputFileRef = useRef();
    const navigate = useNavigate();
    const [item, setItem] = useState({
        title: '',
        description: '',
        categorie: 'php',
    });
    const handleChange = ({ target: { value, name, files } }) => {
        if (name === 'image') {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                let preview = reader.result;
                setPreviewImg(preview);
            });

            const fileImage = files[0];

            if (fileImage) {
                reader.readAsDataURL(fileImage);
            }
        } else {
            setItem({
                ...item,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);

        if (
            titleRef?.current?.validity?.valid === false ||
            descriptionRef?.current?.validity?.valid === false
        ) {
            return;
        }

        try {
            let formData = new FormData();

            formData.append('title', item.title);
            formData.append('description', item.description);
            formData.append('categorie', item.categorie);
            formData.append('file', inputFileRef.current.files[0]);

            const { data } = await axios.post(
                'http://localhost:3000/api/items',
                formData
            );

            toast.success(data.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            navigate('/items');
        } catch (error) {
            const errorMessage = error.response.data.message
                ? error.response.data.message
                : error.message;
            console.log(error.response);
            toast.error(errorMessage, {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    return (
        <div>
            <h2>Créer un article</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        ref={titleRef}
                        required
                        type="title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={item.title}
                        name="title"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Select
                        onChange={handleChange}
                        name="categorie"
                        aria-label="Default select example"
                        value={item.categorie}
                    >
                        <option value="">Choississez une catégorie</option>
                        <option value="php">PHP</option>
                        <option value="js">JS</option>
                        <option value="python">Python</option>
                        <option value="mongodb">MongoDB</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        ref={descriptionRef}
                        required
                        placeholder="Description"
                        onChange={handleChange}
                        value={item.description}
                        name="description"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a description.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <InputGroup>
                        <Image
                            src={previewImg}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'contain',
                            }}
                        ></Image>
                        <Form.Control
                            ref={inputFileRef}
                            type="file"
                            required
                            placeholder="Image"
                            onChange={handleChange}
                            name="image"
                        />
                    </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Créer un article
                </Button>
            </Form>
        </div>
    );
};

export default AddItem;
