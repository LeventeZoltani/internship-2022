import React, {useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import IncrementNumber from "./IncrementNumber";
import IncrementNumberFn from "./IncrementNumberFn";
import Footer from './components/Footer';

const App = () => {
    const [number, setNumber] = useState(30);

    const handleChangeNumber = () => {
        setNumber(number + 1);
    };

    return (
        <>
            <Header/>
            <Main/>
            <IncrementNumber
                defaultNumber={number}
            />
            <IncrementNumberFn
                defaultNumber={number}
            />
            <button onClick={handleChangeNumber}>
                Add new default number
            </button>
            <Footer/>
        </>
    );
};

export default App;
