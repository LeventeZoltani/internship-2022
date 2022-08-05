import React from 'react';
import logo from './logo.png';

import style from './Footer.module.css';

const Footer = (props) => {
    return (
        <footer className={style.footer}>
            <h1>MUSIC@n</h1>
            {/* <img className={style.logo} src={logo} alt="Company Logo"/> */}
        </footer>
    );
};

export default Footer;
