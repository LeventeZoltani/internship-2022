import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //nu era
import 'bootstrap/dist/css/bootstrap.min.css'; //nu era

const App = () => {
    return (
        <>
            <Header/>
            <Main/>
            <Footer/>
        </>
    );
};

export default App;
