import { Paper, Typography } from '@mui/material'
import React from 'react'

export default function NotFound() {
    return (
        <Paper
            sx={{
                maxWidth: 500,
                mx: 'auto', // margin left & right
                my: 4, // margin top & botom
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
    )
}
