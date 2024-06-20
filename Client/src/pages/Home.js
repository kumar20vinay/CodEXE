import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import axiosConfig from "../utils/axiosConfig";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ColorModeContext";

function Home() {
  const [spaceId, setSpaceId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({ title: "", data: "" });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  useEffect(() => {
    document.title = "CodEXE";
  }, []);

  useEffect(() => {
    if (name && spaceId) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [name, spaceId]);

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosConfig.get(`/spaces/${spaceId}`);
      if (res.status === 200) {
        navigate(`/space/${spaceId}`, {
          state: {
            name,
            email: null,
          },
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
      await handleJoin(e);
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
        }}
      >
        <Box
          sx={{
            minWidth: "30vw",
            backgroundColor: "background.paper",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            p: 4,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                <DarkModeIcon sx={{ fontSize: 30 }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 30 }} />
              )}
            </IconButton>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: 20,
              fontWeight: 500,
              mt: 3,
              mb: 2,
              color: "text.primary",
            }}
          >
            Join an Already Running Session....
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              autoFocus
              name="spaceId"
              value={spaceId}
              placeholder="Paste Invite ID"
              sx={{ width: "100%", mb: 2 }}
              onChange={(e) => setSpaceId(e.target.value)}
              onKeyUp={!disabled ? handleKey : null}
            />

            <TextField
              name="name"
              placeholder="Enter name"
              value={name}
              sx={{ width: "100%", mb: 2 }}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={!disabled ? handleKey : null}
            />
          </Box>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleJoin}
            sx={{
              height: "45px",
              display: "block",
              mb: 3,
              mt: 1,
            }}
            disabled={disabled}
          >
            Join
          </LoadingButton>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h2"
            sx={{
              fontSize: 20,
              fontWeight: 500,
              mb: 2,
              color: "text.primary",
            }}
          >
            Create a Session
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{ height: "45px", flexGrow: 1, mr: 1 }}
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              sx={{ height: "45px", flexGrow: 1 }}
              startIcon={<PersonAddIcon />}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
