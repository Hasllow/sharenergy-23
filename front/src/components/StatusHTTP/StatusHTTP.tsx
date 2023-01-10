import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import ContainerImg from "../../layout/ContainerImg";

import styles from "./StatusHTTP.module.css";

const StatusHTTP = () => {
  const [statusHTTP, setStatusHTTP] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [startedLoading, setStartedLoading] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [errorInput, setErrorInput] = useState(false);

  const handleStatusHTTP = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusHTTP(event.target.value);
    setErrorInput(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (statusHTTP === "") {
      setStatusHTTP("");
      setErrorInput(true);
      return;
    }

    setStartedLoading(true);
    setIsLoading(true);
    setImgURL(`https://http.cat/${statusHTTP}`);
  };

  const catImage = (
    <div className={styles["container-img"]} style={{ display: isLoading ? "none" : "block" }}>
      <img
        src={`${imgURL}`}
        alt=""
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );

  return (
    <ContainerImg>
      {errorInput && (
        <Alert severity="error" sx={{ marginBottom: "24px" }}>
          The input must be filled out.
        </Alert>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label={"Status HTTP"}
          type={"number"}
          fullWidth
          sx={{ marginBottom: "24px" }}
          onChange={handleStatusHTTP}
          value={statusHTTP}
          error={errorInput}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: "24px" }} type="submit">
          Give me my image!
        </Button>
      </form>
      {startedLoading && isLoading ? <CircularProgress /> : undefined}
      {catImage}
    </ContainerImg>
  );
};

export default StatusHTTP;
