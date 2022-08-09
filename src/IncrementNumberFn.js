import React, {useState, useEffect} from 'react';

const IncrementNumberFn = props => {
    const [number, setNumber] = useState(0);

    useEffect(() => {
        setNumber(props.defaultNumber);

        return () => {
            //unmount
        }
    }, [props.defaultNumber]);

    const handleClick = () => {
        setNumber(number + 1);
    };

    return (
        <div>
            <button onClick={handleClick}>Increment number</button>
            <span>{number}</span>
        </div>
    );
};

export default IncrementNumberFn;
