import { Container } from "@mui/material";

const ContainerLayout = (props: React.PropsWithChildren) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        margin: "0 auto",
      }}
      maxWidth="lg"
    >
      {props.children}
    </Container>
  );
};

export default ContainerLayout;
