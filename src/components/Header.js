import React from 'react';
import style from './Header.module.css';

//nu erau
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';


const Header = () => {
    return (
        <header>
            {/* ?<h1>Internship <span className={style.secondaryColor}>React Starter</span> kit</h1> */}

            <Navbar expand="lg" bg="dark" variant="dark" >
                <Nav className={style.header}>
                    <img src="./Music.png"></img>
                    <Nav.Link href="#home">Search</Nav.Link>
                    <Nav.Link href="#admin">Autocomplete</Nav.Link>
                    <Nav.Link href="#favorites">Favorites</Nav.Link>
                    <Nav.Link href="#login">Login</Nav.Link>
                </Nav>
            </Navbar>

        </header>
    );
};

export default Header;
