import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import { ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
function App() {
  const { user } = useAuthContext();
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: grey[900]
      },
      secondary:{
        main: grey[100]
      }
    },
    typography:{
      fontFamily: "poppins",
      fontSize:15
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/Signup"
                element={!user ? <Signup /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
