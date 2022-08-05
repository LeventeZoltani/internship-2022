import React, { Component } from 'react';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Typography, Box, Slide } from '@mui/material';

import SongRow from './SongRow';
import style from './SongList.module.css';
import Player from './Player';


export default function SongList(props) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={style.tableHeader}></TableCell>
                            <TableCell className={style.tableHeader}></TableCell>
                            <TableCell align='left'>
                                <Typography variant='h5'>Title</Typography>
                            </TableCell>
                            <TableCell align="center"><Typography variant='h5'>Artist</Typography></TableCell>
                            <TableCell align="center"><Typography variant='h5'>Album</Typography></TableCell>
                            <TableCell align="center"><Typography variant='h5'>Genre</Typography></TableCell>
                            <TableCell align="center"><Typography variant='h5'>Duration</Typography></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.songs.map((song) => (
                            <SongRow
                                song={song}
                                key={song.id}
                                handlePlayClick={props.handlePlayClick}    
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
