import { useState } from 'react'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import api from '../utils/api.js';
import axios from 'axios';




import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';


function Signup(){

    // password field
    const [showPassword, setShowPassword] = React.useState(true);
    const [repassword, setShowrepassword] = React.useState(true); 
    const [loader,setLoader] = useState(false);
    const [error_msg,setErrormsg] = useState('');
    

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowrePassword = () => setShowrepassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleMouseDownrePassword = (event) => {
        event.preventDefault();
    }


    const [state,setState] = useState({
        name:'',
        email:'',
        password:'',
        retype_password:'',

    });

    const inputHandle = (e) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value,

        })
    }

    const user_register = async(e) =>{
        console.log("user registeration click function");
        e.preventDefault()
        if (state.password===state.retype_password) {
            api.post('/auth/user_registeration',{user_data:state})
            .then(response => {
              console.log(response.data.status);
              if(response.data.status===true){
                window.location.href='/';
              }else{
                setErrormsg(response.data.message);

              }
            })
            .catch(error => {
              console.error(error);
            });  
        }else{
            alert("password not same kindly check...");
        }
       
    }

    return(
        
        <>
            {error_msg!='' && (
            <div className='flex flex-row w-full  h-full justify-center items-center '>
                <div className='flex flex-row justify-center items-center bg-red-400 py-2 mt-[20px]  md:w-[50%] sm:w-[50%]  lg:w-[30%] xl:w-[30%] 2xl:w-[40%]  w-full  mx-4 rounded-md  shadow-lg hover:shadow-xl' >
                    <span className='text-red-100 font-bold'>{error_msg}</span>
                </div>
            </div>
            )}
           
           <Grid container diretion="row" justifyContent='center' alignItems="center" height={'100vh'}>
                <Box sx={{color:'white',border:'1px solid #C0C0C0',padding:4,borderRadius:2,boxShadow:'1px 2px 2px 3px 	#DCDCDC',width:{xs:'80%',sm:'50%',md:'40%',lg:'30%',xl:'38%'}}} direction="column" alignItems="center" justifyContent="center">
                    <Typography variant="h5" gutterBottom color={'#616161'} marginBottom={'1rem'} textAlign={'center'}>Strategy Learning </Typography>
                    <Typography variant="body2" gutterBottom color={'#616161'} direction="row" sx={{width:'100%'}} justifyContent={'center'} alignItems={'center'} marginBottom={'1.5rem'} textAlign={'center'}>Signup into strategy Learning </Typography>
                    <Box sx={{display:'flex',flexDirection:"column" , height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <TextField id="outlined-basic" label="UserName" variant="outlined" width={'100%'} fullWidth style={{marginBottom:'1rem'}} onChange={inputHandle} value={state.name} name='name'></TextField>
                        <TextField id="outlined-basic" label="Email" variant="outlined" width={'100%'} fullWidth style={{marginBottom:'1rem'}} onChange={inputHandle} value={state.email} name='email'></TextField>
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'password' : 'text'}  endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}  edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                } label="Password"
                                onChange={inputHandle} value={state.password}
                                name='password'
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Re-Type Password</InputLabel>
                            <OutlinedInput id="outlined-adornment-password" type={repassword ? 'password' : 'text'}  endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowrePassword} onMouseDown={handleMouseDownrePassword}  edge="end">
                                    {repassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                } label="Retype Password"
                                onChange={inputHandle} value={state.retype_password}
                                name='retype_password'
                            />
                        </FormControl>

                        <Button disabled={loader} variant="contained"   sx={{width:'50%',margin:'1rem',padding:'0.6rem',fontWeight:'800'}} color={'warning'} onClick={user_register}>{loader? 'Loading...':'Signup'}</Button>
                    </Box>
                </Box>
           </Grid>
        </>
    );
}
export default Signup;