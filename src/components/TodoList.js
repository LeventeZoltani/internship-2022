import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import style from './TodoList.module.css';

class TodoList extends Component {

    state = {
        list: [],
        input: '',
    }

    static defaultProps = {
        variant: 'dark',
    };

    constructor(props) {
        super(props);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAddTodo(e) {
        e.preventDefault();

        this.setState({
            list: this.state.list.concat({
                label: this.state.input,
                checked: false,
            }),
            input: '',
        });
    }

    handleChange(e) {
        this.setState({
            input: e.target.value,
        });
    }

    handleChecked(member) {
        return () => {
            this.setState({
                list: this.state.list.map((item, index) => {
                    if (index === member) {
                        return {
                            ...item,
                            checked: !item.checked,
                        }
                    }
                    return item;
                })
            });
        }
    }

    getVariant() {
        return style[this.props.variant];
    }

    render() {
        return (
            <div className={style.container}>
                <form onSubmit={this.handleAddTodo}>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="add-todo"
                        value={this.state.input}
                    />
                    <button
                        className={this.getVariant()}
                        onClick={this.handleAddTodo}
                        disabled={!this.state.input}
                    >
                        Add todo
                    </button>
                </form>
                <List>
                    {Array.isArray(this.state.list) ? this.state.list.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemButton onClick={this.handleChecked(index)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={item.checked}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText id={index.toString()} primary={item.label}/>
                            </ListItemButton>
                        </ListItem>
                    )) : null}
                </List>
            </div>
        );
    }
}

TodoList.propTypes = {
    variant: PropTypes.oneOf([
        'dark',
        'light'
    ]),
};

export default TodoList;
