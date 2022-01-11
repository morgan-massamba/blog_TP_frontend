import React from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
const HomePage = () => {
    return (
        <div className="pt-4">
            <h1 className="text-center">Blogger.</h1>
            <Row className="justify-content-center my-4">
                <Image
                    src="logo-blog.png"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'contain',
                    }}
                ></Image>
            </Row>
            <h4 className="text-center">
                Blogger is the best place where you can post your content and
                play quiz games.
            </h4>
            <p className="text-center">Discover our content.</p>
        </div>
    );
};

export default HomePage;
