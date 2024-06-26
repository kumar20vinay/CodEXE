import React from "react";
import {
  Box,
  Typography,
  Button,
  Backdrop,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListSpaces from "./ListSpaces";
import CreateSpace from "./CreateSpace";
import SearchIcon from "@mui/icons-material/Search";
import JoinSpace from "./JoinSpace";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

function UserSpaces({
  setMessage,
  setSuccess,
  setError,
  loggedInUser,
  listSpaces,
  originalSpace,
  dispatch,
  showCreateSpaceBackdrop,
  showJoinSpaceBackdrop,
  spaceId,
  spaceName,
}) {
  function searchQuery(searchTerm) {
    if (searchTerm !== "") {
      const filteredSpaces = originalSpace.filter((space) => {
        return (
          space.spaceId.includes(searchTerm) ||
          space.spaceName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      dispatch({ type: "updateListSpaces", payload: filteredSpaces });
    } else {
      dispatch({ type: "updateListSpaces", payload: originalSpace });
    }
  }

  return (
    <>
      <Backdrop
        sx={{
          zIndex: 5,
          backdropFilter: "blur(5px)",
        }}
        open={showCreateSpaceBackdrop}
      >
        <CreateSpace
          spaceId={spaceId}
          spaceName={spaceName}
          setError={setError}
          setSuccess={setSuccess}
          setMessage={setMessage}
          loggedInUser={loggedInUser}
          dispatch={dispatch}
          showCreateSpaceBackdrop={showCreateSpaceBackdrop}
        />
      </Backdrop>

      <Backdrop
        sx={{ zIndex: 5, backdropFilter: "blur(5px)" }}
        open={showJoinSpaceBackdrop}
      >
        <JoinSpace
          spaceId={spaceId}
          loggedInUser={loggedInUser}
          dispatch={dispatch}
          showJoinSpaceBackdrop={showJoinSpaceBackdrop}
        />
      </Backdrop>
      <Box sx={{ display: "flex", justifyContent: "center",flexDirection: "column"}}>
        <Box sx={{  display: "flex", flexDirection: "column", height: "100vh"}}>
          <Box
            sx={{
              p: 1,
              pt: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "background.paper", 
            }}
          >
            <Typography
              sx={{
                fontSize: 40,
                fontWeight: 700,
                pr: 5,
                color: "text.primary",
              }}
            >
              Your Sessions
            </Typography>

            <OutlinedInput
              disabled={!listSpaces}
              size="small"
              sx={{ minWidth: "30%" }}
              onChange={(e) => searchQuery(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <Box>
              <Button
                variant="outlined"
                startIcon={<RocketLaunchIcon />}
                sx={{ mr: 2 }}
                onClick={() =>
                  dispatch({ type: "handleJoinBackdrop", payload: true })
                }
              >
                Join a Session
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  dispatch({ type: "handleCreateBackdrop", payload: true })
                }
              >
                Create a New Session 
              </Button>
            </Box>
          </Box>

          <Box sx={{ flex: 1, mb:"20vh",overflowY: "scroll", p: 2 }}>
            <ListSpaces
              setMessage={setMessage}
              setSuccess={setSuccess}
              setError={setError}
              loggedInUser={loggedInUser}
              listSpaces={listSpaces}
              dispatch={dispatch}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UserSpaces;
