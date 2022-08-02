import React, { Component } from 'react';

// import decoration from './decoration.png';
import style from './Main.module.css';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class Main extends Component {
    render() {
        return (
            <main className={style.main}>
                {/* <img className={style.decoration} src={decoration} alt="decoration" />
                <h2>Hello Awesome App!</h2>
                <p>To get started edit a file in "./src" and save to reload.</p> */}


                <Row xs={1} md={5} className="g-4">
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </main>
        );
    }
}

Main.propTypes = {};

export default Main;
