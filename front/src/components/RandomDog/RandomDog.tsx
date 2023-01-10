import { Button, CircularProgress } from "@mui/material";

import React, { useState } from "react";
import ContainerImg from "../../layout/ContainerImg";

import styles from "./RandomDog.module.css";

const StatusHTTP = () => {
  const [imgURL, setImgURL] = useState<string>("");
  const [startedLoading, setStartedLoading] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const responseExtension = (url: string): string | undefined => {
    const urlExtension = url.split(".").at(-1);
    if (urlExtension) return urlExtension;
  };

  const containerResponse = (extension: string | undefined) => {
    if (extension === "mp4") {
      return (
        <video
          onLoadedData={() => {
            setIsLoading(false);
          }}
          autoPlay
          loop
          muted
        >
          <source src={`${imgURL}`} type="video/mp4" />
        </video>
      );
    }

    return (
      <img
        src={`${imgURL}`}
        alt=""
        loading="lazy"
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setStartedLoading(true);

    const res = await fetch("https://random.dog/woof.json");
    const data = await res.json();
    setImgURL(data.url);
  };

  const dogImage = (
    <div style={{ opacity: isLoading ? 0 : 1 }} className={styles["container-response"]}>
      {containerResponse(responseExtension(imgURL))}
    </div>
  );

  return (
    <ContainerImg>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Button variant="contained" color="primary" sx={{ marginBottom: "24px", width: "100%" }} type="submit">
          Give me my image!
        </Button>
      </form>
      {startedLoading && isLoading ? <CircularProgress /> : undefined}
      {dogImage}
    </ContainerImg>
  );
};

export default StatusHTTP;
