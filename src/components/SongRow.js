import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Typography, IconButton } from '@mui/material';

import HeartButton from './HeartButton';
import style from './SongRow.module.css';

export default function SongRow({ song }) {
    return (
        <TableRow
            key={song.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            hover={true}
        >
            <TableCell sx={{ 'padding': 0 }}
                component="th"
                scope="row"
                align='center'
            >
                <IconButton>
                    <PlayArrowIcon sx={{ fontSize: 20 }}></PlayArrowIcon>
                </IconButton>
            </TableCell>

            <TableCell classNames={[style.tableCell, style.tableHeaderTitle]} component="th" scope="row" align='center'>
                <img className={style.tableCellImage} src={song.imageUrl} alt={song.title}></img>
            </TableCell>

            <TableCell className={style.tableCell}>
                <Typography variant='h6'>{song.title}</Typography>
            </TableCell>

            <TableCell className={style.tableCell} align="center"><Typography variant='h6'>{song.artist}</Typography></TableCell>
            <TableCell className={style.tableCell} align="center"><Typography variant='h6'>{song.genre}</Typography></TableCell>
            <TableCell className={style.tableCell} align="center"><Typography variant='h6'>{song.duration}</Typography></TableCell>
            <TableCell className={style.tableCell} align="center">
                <HeartButton />
            </TableCell>
        </TableRow>
    )
}
