import React from 'react';
import logo from './logo.png';

import style from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <img className={style.logo} src={logo} alt="Company Logo"/>
        </footer>
    );
};

export default Footer;
