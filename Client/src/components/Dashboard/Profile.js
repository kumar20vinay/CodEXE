import { Box, Typography } from "@mui/material";

export default function Profile({ loggedInUser }) {

  return (
    <Box
      sx={{
        minWidth: "20vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
      }}
    >
    
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
        User -  {loggedInUser.user?.name}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            mt: 1,
            color: "text.primary",
          }}
        >
        E-Mail - {loggedInUser.user?.email}
        </Typography>
      </Box>
    </Box>
  );
}
