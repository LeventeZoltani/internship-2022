import React, {Component} from 'react';

// import decoration from './decoration.png';
import style from './Main.module.css';
import SongList from './SongList';

class Main extends Component {
    render() {
        return (
            <main className={style.main}>
                <SongList />
            </main>
        );
    }
}

Main.propTypes = {};

export default Main;
