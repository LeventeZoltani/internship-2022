import React, {Component} from 'react';
import PropTypes from 'prop-types';

class IncrementNumber extends Component {

    state = {
        number: null,
    }

    static defaultProps = {
        defaultNumber: 0,
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            number: this.props.defaultNumber
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.defaultNumber !== this.props.defaultNumber && this.props.defaultNumber > this.state.number) {
            this.setState({
                number: this.props.defaultNumber,
            });
        }
    }

    handleClick() {
        this.setState({
            number: this.state.number + 1,
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Increment number</button>
                <span>{this.state.number}</span>
            </div>
        );
    }
}

IncrementNumber.propTypes = {
    defaultNumber: PropTypes.number.isRequired,
};

export default IncrementNumber;
