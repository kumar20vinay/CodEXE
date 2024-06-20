import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Alert,
  AlertTitle,
  Snackbar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import axiosConfig from "../utils/axiosConfig";
import useAuth from "../hooks/useAuth";
import isEmail from "validator/lib/isEmail";
import LoadingButton from "@mui/lab/LoadingButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../context/ColorModeContext";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const LOGIN_URL = "/users/login";

function Login() {
  const { setAuth } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({ title: "", data: "" });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    if (isEmail(user.email) && user.password) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [user]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosConfig.post(LOGIN_URL, user);
      if (res.status === 200) {
        setAuth(res.data);
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setMessage({ title: "Error!", data: err.response.data.error });
      } else {
        setMessage({ title: "Error!", data: "No server response" });
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = async (e) => {
    if (e.code === "Enter") {
      await login(e);
    }
  };

  return (
    <>
      <Snackbar
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          <AlertTitle>{message.title}</AlertTitle>
          {message.data}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          backgroundColor: "background.default",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            minWidth: { xs: "80vw", sm: "50vw", md: "30vw" },
            backgroundColor: "background.paper",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            p: 3,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box
                component="img"
                sx={{
                  height: "60px",
                  width: "70px",
                }}
                alt="No spaces found"
                src="/logo1.png"
              />

            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "light" ? (
                <DarkModeIcon sx={{ fontSize: 40 }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 40 }} />
              )}
            </IconButton>
          </Box>

          <TextField
            autoFocus
            error={user.email === "" ? false : !isEmail(user.email)}
            name="email"
            placeholder="skywalker@deathstar.com"
            sx={{ width: "100%", mb: 2 }}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            onKeyUp={!disabled ? handleKey : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="password"
            name="password"
            placeholder="******"
            sx={{ width: "100%", mb: 2 }}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            onKeyUp={!disabled ? handleKey : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{
                height: "45px",
                mt: 2,
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
              onClick={() => navigate("/")}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>

            <LoadingButton
              loading={loading}
              variant="contained"
              startIcon={<LoginIcon />}
              onClick={login}
              sx={{
                height: "45px",
                mt: 2,
                backgroundColor: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              disabled={disabled}
            >
              Login
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
