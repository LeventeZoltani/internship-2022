import React from 'react';

import style from './Header.module.css';

const Header = () => {
    return (
        <header className={style.header}>
            <h1>Internship <span className={style.secondaryColor}>React Starter</span> kit</h1>
        </header>
    );
};

export default Header;
