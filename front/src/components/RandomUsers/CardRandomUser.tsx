import { Avatar, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { RandomUserProps } from "./types/RandomUsersTypes";

const CardRandomUser = (props: RandomUserProps) => {
  return (
    <Grid2 xs={12} md={6} lg={4}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "4px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "primary.main",
          boxShadow: `0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)`,
          "&:hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <Grid2 container spacing={2} alignItems={"center"}>
          <Grid2 xs={9}>
            <p>
              <strong>Full Name:</strong> {props.user.name}
            </p>
            <p>
              <strong>Age:</strong> {props.user.age}
            </p>
            <p>
              <strong>Email:</strong> {props.user.email}
            </p>
            <p>
              <strong>Username:</strong> {props.user.username}
            </p>
          </Grid2>
          <Grid2 xs={3}>
            <Avatar src={props.user.image} sx={{ width: "100%", height: "100%", loading: "lazy" }} />
          </Grid2>
        </Grid2>
      </Box>
    </Grid2>
  );
};

export default CardRandomUser;
