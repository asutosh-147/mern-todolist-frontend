import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import TextField from '@mui/material/TextField';
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isloading } = useLogin();
  const [showpassword,setShowPassword]=useState(false);
  const hadnleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
        <Typography variant="h4">Welcome</Typography>
        <TextField
          id="outlined-basic"
          label="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          size="small"
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
          size="small"
          value={password}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton onClick={()=>{setShowPassword(!showpassword)}} >
                  { showpassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" /> }
                </IconButton>
              </InputAdornment>
          }}
        />
        <Button variant="contained" onClick={hadnleSubmit} endIcon={<LoginIcon/>}
         >Login</Button>
        {/* <button disabled={isloading}>Submit</button> */}
        {error && <Typography className="error" >{error}</Typography>}
      </Stack>
    </>
  );
};

export default Login;
