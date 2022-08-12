import React, {Component,useState} from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from '@mui/material';

function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      if (focused) {
        return 'This field is being focused';
      }
  
      return 'Helper text';
    }, [focused]);
  
    return <FormHelperText>{helperText}</FormHelperText>;
}
  

export default function CreateAccount(props) {
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  //const navigate = useNavigate();

  const setUserName = (value) => {
    setUser({
        username: value,
        password: user.password,
        confirmPassword: user.password,
    })
  }

const setPassword = (value) => {
    setUser({
        username: user.username,
        password: value,
        confirmPassword: user.confirmPassword,
    })
  }
const setConfirmPassword = (value) => {
    setUser({
        username: user.username,
        password: user.password,
        confirmPassword: value,
    })
  }  
  return(
    
    <Box createAccount={props.createAccount} component="form" noValidate autoComplete="off" sx={{backgroundColor: 'black', color: 'aliceblue',border: 2, borderColor:'#fa227c',height: 500}}>
    <h2>Register to play and listen MUSIC@n!!</h2>
    <FormControl sx={{ width: '25ch',border:2, borderColor:'#fa227c', backgroundColor: 'black', borderRadius: 80}}>
      <OutlinedInput id="username" placeholder="Username" type='text' sx={{color:'aliceblue',fontSize: 'large'}}  onChange={(event) => setUserName(event.target.value)}/>
      <MyFormHelperText />
    </FormControl>
    <br/>
    <FormControl sx={{ width: '25ch', border:2, borderColor:'#fa227c', backgroundColor: 'black' ,borderRadius: 80}}>
      <OutlinedInput id="password" placeholder="Password" type='password' sx={{color:'aliceblue',fontSize: 'large'}}  onChange={(event) => setPassword(event.target.value)}/>
      <MyFormHelperText />
    </FormControl>
    <FormControl sx={{ width: '25ch', border:2, borderColor:'#fa227c', backgroundColor: 'black' ,borderRadius: 80}}>
      <OutlinedInput id="password2" placeholder="Confirm Password" type='password' sx={{color:'aliceblue',fontSize: 'large'}}  onChange={(event) => setConfirmPassword(event.target.value)}/>
      <MyFormHelperText />
    </FormControl>
    <br/>
    <Button sx={{border: 2,borderColor: 'aliceblue',color: 'aliceblue',backgroundColor: 'black', borderRadius: 80}} type='button' onClick={() => props.createAccount(user)}>Register</Button>
    </Box>
  )
}