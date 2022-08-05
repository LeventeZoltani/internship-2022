import React, {Component} from 'react';
import PlayList from './PlayList';
//import PlayList from 'PlayList.js';
import decoration from './decoration.png';
import style from './Main.module.css';


export default function Main(props) {
        return(
         <main className={style.main}>
             <PlayList variant="dark" songs={props.songs}/>
             {/*<img className={style.decoration} src={decoration} alt="decoration"/>
             <h2>Hello Awesome App!</h2>
             <p>To get started edit a file in "./src" and save to reload.</p> */}
             {console.log(props.songs)}
         </main> 
         
        );
     }

