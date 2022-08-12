import { Paper, Typography } from '@mui/material'
import React from 'react'

/* 
 * Function to reder Not Found page.
 */
export default function NotFound() {
    return (
        <main className='main'>
            <Paper
                sx={{
                    maxWidth: 500,
                    mx: 'auto', // margin left & right
                    my: 30, // margin top & botom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    borderRadius: '25px',
                    boxShadow: 'sm',
                }}>
                <div>
                    <Typography variant="h5">Page not found :/</Typography>
                </div>
            </Paper>
        </main>
    )
}
