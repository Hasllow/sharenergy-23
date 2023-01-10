import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Checkbox, Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setInfoLocalStorage, setInfoSessionStorage } from "../../api/helper/useToken";
import apiLogin from "../../api/login";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowPassword((show) => !show);
  };

  const handleOnChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setErrorInput(false);
  };
  const handleOnChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorInput(false);
  };

  const handleOnChangeRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await apiLogin(username, password);
    const infoUser = { userId: data.data.idLoggedUser, token: data.data.token };

    if (data.status === 200) {
      if (rememberMe) setInfoLocalStorage(infoUser);

      setInfoSessionStorage(infoUser);
      navigate("/random-users");
      return;
    }

    setErrorInput(true);
  };

  const iconPassword = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Container sx={{ margin: "24px auto" }} maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          padding: "24px",
          "& .MuiTextField-root": { margin: "8px 0" },
          "& .MuiButton-root": { margin: "2px 0" },
        }}
      >
        <h1>SHARENERGY</h1>
        <h2>Login</h2>
        {errorInput && <p style={{ color: "#d32f30" }}>Login e/ou senha inválidos.</p>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Login"
            variant="outlined"
            value={username}
            onChange={handleOnChangeUsername}
            required
            fullWidth
            error={errorInput}
          />
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleOnChangePassword}
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: iconPassword,
            }}
            error={errorInput}
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Login
          </Button>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={handleOnChangeRememberMe} />}
              label="Remember Me"
              value={"end"}
            />
          </FormGroup>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
