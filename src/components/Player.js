import React, { useState, useEffect, useRef } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import { Grid } from '@mui/material';

import formatDuration from './formatDuration';

import style from './Player.module.css';
import HeartButton from './HeartButton';

const TinyText = styled(Typography)({
    fontSize: '1.2rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    color: 'white'
});

const CoverImage = ({ img, title }) => (
    <img
        className={style.coverImage}
        src={img}
        alt={title}
    >
    </img>
)

const Player = (props) => {

    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(new Audio(props.playedSong.audioUrl));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setTrackProgress(audioRef.current.currentTime);
        }, [1000]);
    };

    const setPosition = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const startTimerIfPlaying = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    useEffect(() => {
        // set the current audio to play/pause
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(props.playedSong.audioUrl);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [props.playedSong]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <>
            <Box className={style.playBar} sx={{ flexGrow: 1 }} zIndex={15}>
                <Paper elevation={3} sx={{ padding: 4, backgroundColor: 'black' }}>
                    <Grid className={style.playerGridContainer} container spacing={0} columns={{ xs: 4, sm: 8, md: 12 }} align='space-between'>
                        <Grid item xs={1} sm={2} md={1} lg={1}>
                            <CoverImage img={props.playedSong.imageUrl} title={props.playedSong.title} />
                        </Grid>
                        <Grid item xs={2} sm={4} md={2} lg={2} paddingLeft='10px'>
                            <Typography color='white' variant='h4' align='left'>{props.playedSong.title}</Typography>
                            <Typography color='white' variant='h6' align='left'>{props.playedSong.artist}</Typography>
                        </Grid>


                        <Grid item xs={4} sm={8} md lg>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: -1,
                                }}
                            >
                                <IconButton aria-label="previous song" sx={{
                                    ':hover': {
                                        bgcolor: '#aab6fe24'
                                    }
                                }}>
                                    <FastRewindRounded fontSize="large" htmlColor='#aab6fe' />
                                </IconButton>

                                {!isPlaying ? (
                                    <IconButton
                                        aria-label={isPlaying ? 'play' : 'pause'}
                                        onClick=
                                        {() => {
                                            return setIsPlaying(true)
                                        }}

                                        sx={{
                                            ':hover': {
                                                bgcolor: '#aab6fe24'
                                            }
                                        }}
                                    >
                                        <PlayArrowRounded
                                            sx={{ fontSize: '4rem' }}
                                            htmlColor='#aab6fe' />
                                    </IconButton>
                                ) : <IconButton
                                    aria-label={isPlaying ? 'play' : 'pause'}
                                    onClick={() => {

                                        return setIsPlaying(false)
                                    }}
                                    sx={{
                                        ':hover': {
                                            bgcolor: '#aab6fe24'
                                        }
                                    }}
                                >
                                    <PauseRounded sx={{ fontSize: '4rem' }} htmlColor='#aab6fe' />
                                </IconButton>
                                }
                                <IconButton aria-label="next song" sx={{
                                    ':hover': {
                                        bgcolor: '#aab6fe24'
                                    }
                                }}>
                                    <FastForwardRounded fontSize="large" htmlColor='#aab6fe' />
                                </IconButton>
                            </Box>
                            <Slider
                                aria-label="time-indicator"
                                size="small"
                                value={trackProgress ? trackProgress : 0}
                                min={0}
                                step={1}
                                max={duration ? duration : 4}
                                onChange={(e) => setPosition(e.target.value)}
                                onMouseUp={startTimerIfPlaying}
                                onKeyUp={startTimerIfPlaying}
                                className='slider'
                                sx={{
                                    color: '#aab6fe',
                                    height: 4,
                                    '& .MuiSlider-thumb': {
                                        width: 8,
                                        height: 8,
                                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                        '&:before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`
                                            ,
                                        },
                                        '&.Mui-active': {
                                            width: 20,
                                            height: 20,
                                        },
                                    },
                                    '& .MuiSlider-rail': {
                                        opacity: 0.28,
                                    },
                                }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: -2,
                                }}
                            >
                                <TinyText>{formatDuration(trackProgress)}</TinyText>
                                <TinyText>{duration ? `- ${formatDuration(duration - trackProgress)}` : '0:00'}</TinyText>
                            </Box>
                        </Grid>
                        <Grid item xs={4} sm={4} md={1} lg={1} marginLeft={10}>
                            <HeartButton
                                removeFromFavourites={props.removeFromFavourites}
                                addToFavourites={props.addToFavourites}
                                song={props.playedSong}
                                favourites={props.user.favourites} />
                        </Grid>
                    </Grid>
                </Paper>
            </Box></>
    );
}

export default Player;