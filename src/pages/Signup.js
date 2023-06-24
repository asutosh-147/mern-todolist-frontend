import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button, Stack, TextField,InputAdornment , Typography, IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading } = useSignup();
  const [showpassword,setShowPassword]=useState(false);
  const hadnleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    setEmail("");
    setPassword("");
  };
  return (
      <>
      <div style={{
      top:"80px",
      left:"0px",
      zIndex:"-1",
      padding:"0",
      margin:"0",
      aspectRatio:"960/300",
      backgroundSize:"cover",
      width:"100%",
      position:"fixed",
      // backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      backgroundImage:"url(background.svg)"
    }} ></div>
    <div style={{
      bottom:"0px",
      left:"0px",
      zIndex:"-1",
      padding:"0",
      margin:"0",
      aspectRatio:"960/300",
      backgroundSize:"cover",
      width:"100%",
      position:"fixed",
      // backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      backgroundImage:"url(background_2.svg)"
    }} ></div>
      <Stack className="login" onSubmit={hadnleSubmit}
       direction="column"
       alignItems="center"
       spacing={2}
      >
        <Typography variant="h4">New Account</Typography>
        <TextField
          id="outlined-basic"
          label="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          sx={{
            width:"70%"
          }}
        />
        <TextField
          sx={{
            width:"70%"
          }}
          id="outlined-password-input"
          label="Password"
          type={showpassword?'text':'password'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton onClick={()=>{setShowPassword(!showpassword)}} >
                  { showpassword ? <VisibilityOffIcon/> : <VisibilityIcon/> }
                </IconButton>
              </InputAdornment>
          }}
        />
        <Button variant="contained" onClick={hadnleSubmit} disabled={isLoading} endIcon={<LoginIcon/>}
         >Signup</Button>
        {error && <div className="error" >{error}</div>}
      </Stack>
    </>
  );
};

export default Signup;
