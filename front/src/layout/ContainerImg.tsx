import { Container } from "@mui/material";
import React from "react";

const ContainerImg = (props: React.PropsWithChildren) => {
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        margin: "24px 0",
        marginTop: "6rem",
      }}
    >
      {props.children}
    </Container>
  );
};

export default ContainerImg;
