import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Stack, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="header">
        <div className="container">
          <Link to="/">
            <Typography variant="h4" padding={2}>Workout Buddy</Typography>
          </Link>
          <nav>
            {user && (
              <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              >
                <Typography>{user.email}</Typography>
                <Button variant="Text" color="secondary" onClick={handleLogout} endIcon={<LogoutIcon/>} >logout</Button>
              </Stack>
            )}
            {!user && (
              <Stack
              direction="row"
              spacing={2}
              alignItems="center">
                <Link to="/login"><Typography>login</Typography></Link>
                <Link to="/signup"><Typography>signup</Typography></Link>
              </Stack>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
