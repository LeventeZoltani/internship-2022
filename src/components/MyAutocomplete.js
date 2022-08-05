import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField }from '@mui/material';
import songs from './PlayList';
import PlayList from './PlayList';
import { Component } from 'react';
import React from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
 const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
 const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  

export default function MyAutocomplete(props){
   
    // state = {
    //     songs: [],
    //     played: false,
    //     titles: [],
    // }

    // componentDidMount(){
    //     this.getSongs();
    //     //this.getTitles();
    // }

    // async getSongs(){

    //     const response = await fetch('http://localhost:3000/songs', {
    //         method: 'GET'
    //     })
    //     const data= await response.json();
    //     console.log(this.state.songs);
       

    //     const dataT=[];
    //     for(let i=0;i<data.length;i++){
    //         //console.log(data[i].title);
    //         dataT[i]=data[i].title;
                  
    //     }
    //     this.setState(state => ({ songs: data, titles: dataT}));
    // }
  
    // getTitles(){
    //    
    // }

        const [value, setValue] = React.useState('');
        const [inputValue, setInputValue] = React.useState('');
      
        return(
            <Search>
            <SearchIconWrapper>
                    <SearchIcon sx={{fontSize: "large"}}/>
            </SearchIconWrapper>
               <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={props.titles}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="" id="search"  />}
                  onChange={(event, newValue) => {
                    console.log(newValue)
                    setValue(newValue)
                    props.update(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    props.update(newInputValue);
                    setInputValue(newInputValue);
                    // setValue(newInputValue)
                    }}
                    //id="controllable-states-demo"
                />
                
                
            </Search>);
       
}
