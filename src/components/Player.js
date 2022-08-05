import React, { useState, useEffect } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { Grid } from '@mui/material';

import formatDuration from './formatDuration';

import style from './Player.module.css';

const TinyText = styled(Typography)({
    fontSize: '1.2rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const CoverImage = ({ img, title }) => (
    <img
        className={style.coverImage}
        src={img}
        alt={title}
    >
    </img>
)

const useAudio = url => {
    const [audio, setAudio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);
    const changeSong = (newUrl) => {
        console.log('change')
        audio.pause();
        setPlaying(false);
        setAudio(new Audio(newUrl));
    }

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    return [playing, changeSong, toggle];
};

const Player = (props) => {
    const theme = useTheme();
    const [position, setPosition] = useState(0);
    let [playing, changeSong, toggle] = useAudio(props.playedSong.audioUrl);

    const prevSong = props.playedSong.audioUrl;

    useEffect(() => {
        console.log(props.playedSong.audioUrl)

        changeSong(props.playedSong.audioUrl);
        setPosition(0);
    }, [props.playedSong]);

    useEffect(() => {
        if (prevSong !== props.playedSong.audioUrl) {
            setPosition(0);
        }
        if (playing) {
            setTimeout(() => {
                if (prevSong !== props.playedSong.audioUrl) {
                    return setPosition(0);
                }
                return setPosition(position + 1)
            }, 1000);
        }
    }, [position, playing])

    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';

    return (
        <>
            <Box className={style.playBar} sx={{ flexGrow: 1 }} zIndex={15}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Grid className={style.playerGridContainer} container spacing={0} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={2} md={1} lg={1}>
                            <CoverImage img={props.playedSong.imageUrl} title={props.playedSong.title} />
                        </Grid>
                        <Grid item xs={4} sm={4} md={2} lg={2} paddingLeft='10px'>
                            <Typography variant='h3' align='left'>{props.playedSong.title}</Typography>
                            <Typography variant='h5' align='left'>{props.playedSong.artist}</Typography>
                        </Grid>


                        <Grid item xs={4} sm={4} md lg paddingRight={5}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: -1,
                                }}
                            >
                                <IconButton aria-label="previous song">
                                    <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                                <IconButton
                                    aria-label={!!playing ? 'play' : 'pause'}
                                    onClick={
                                        toggle
                                    }
                                >
                                    {!playing ? (
                                        <PlayArrowRounded
                                            sx={{ fontSize: '4rem' }}
                                            htmlColor={mainIconColor} />
                                    ) : (
                                        <PauseRounded sx={{ fontSize: '4rem' }} htmlColor={mainIconColor} />
                                    )}
                                </IconButton>
                                <IconButton aria-label="next song">
                                    <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                            </Box>
                            <Slider
                                aria-label="time-indicator"
                                size="small"
                                value={position}
                                min={0}
                                step={1}
                                max={Number(props.playedSong.duration)}
                                onChange={(_, value) => setPosition(value)}
                                sx={{
                                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                    height: 4,
                                    '& .MuiSlider-thumb': {
                                        width: 8,
                                        height: 8,
                                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                        '&:before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                                ? 'rgb(255 255 255 / 16%)'
                                                : 'rgb(0 0 0 / 16%)'}`,
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
                                <TinyText>{formatDuration(position)}</TinyText>
                                <TinyText>-{formatDuration(Number(props.playedSong.duration) - position)}</TinyText>
                            </Box>
                        </Grid>
                        <Grid item xs={4} sm={4} md={1} lg={1}>
                            <IconButton>
                                <FavoriteBorderRoundedIcon fontSize="large"></FavoriteBorderRoundedIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Box></>
    );
}

export default Player;