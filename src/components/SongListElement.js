// import style from './SongListElement.module.css'

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import style from './SongListElement.module.css'


export default function SongListElement(props) {
    return (
        <List sx={{
            width: '100%', height: '120px', bgcolor: 'background.paper', fontSize: '28px',
            '.css-10hburv-MuiTypography-root': {
                fontSize: '21px'
            },
            '.css-83ijpv-MuiTypography-root': {
                fontSize: '17px'
            },
            // '.css-1wlk0hk-MuiAvatar-root':{

            // }
        }}
            className={style.list} >
            <ListItem alignItems="flex-start" className={style.list}>
                <ListItemAvatar>
                    <Avatar alt="album cover" src={props.imageSrc} sx={{ height: '70px', width: '70px', marginRight: '10px' }} />
                </ListItemAvatar>
                <ListItemText
                    className={style.listItemText}
                    primary={props.title}
                    secondary={
                        <>
                            <React.Fragment>
                                <Typography
                                    sx={{
                                        display: 'inline',
                                    }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                </Typography >
                                {props.artist}
                            </React.Fragment>
                            <IconButton variant="plain">
                                <FavoriteBorder />
                            </IconButton>
                        </>

                    }

                />
            </ListItem>
            <Divider variant="inset" component="li" />
            {/* <div className={style.div}>CEAU</div> */}
        </List >
    );
}
