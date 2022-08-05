import React, { Component } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Typography, IconButton } from '@mui/material';
import formatDuration from './formatDuration';


import HeartButton from './HeartButton';
import style from './SongRow.module.css';


export default function SongRow(props) {
    
    return (
        <TableRow
            key={props.song.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            hover={true}
        >
            <TableCell sx={{ 'padding': 0 }}
                component="th"
                scope="row"
                align='center'
            >
                <IconButton onClick={() => {props.handlePlayClick(props.song)}}>
                    <PlayArrowIcon sx={{ fontSize: 20 }} ></PlayArrowIcon>
                </IconButton>
            </TableCell>

            <TableCell classnames={[style.tableCell, style.tableHeaderTitle]} component="th" scope="row" align='center'>
                <img className={style.tableCellImage} src={props.song.imageUrl} alt={props.song.title}></img>
            </TableCell>

            <TableCell className={style.tableCell}>
                <Typography variant='h6'>{props.song.title}</Typography>
            </TableCell>

            <TableCell className={style.tableCell} align="center"><Typography variant='h6'>{props.song.artist}</Typography></TableCell>
            <TableCell className={style.tableCell} align="center"><Typography variant='h6'>{props.song.album}</Typography></TableCell>
            <TableCell className={style.tableCell} align="center"><Typography variant='h6'>{props.song.genre}</Typography></TableCell>
            <TableCell className={style.tableCell} align="center"><Typography variant='h6'>{formatDuration(props.song.duration)}</Typography></TableCell>
            <TableCell className={style.tableCell} align="center">
                <HeartButton />
            </TableCell>
        </TableRow>
    );
}
