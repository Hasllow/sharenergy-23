import { CircularProgress, Pagination, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import React, { useCallback, useEffect, useState } from "react";
import ContainerLayout from "../../layout/ContainerLayout";

import CardRandomUser from "./CardRandomUser";
import { RandomUserTypeApi, ResponseRandomUserApi } from "./types/RandomUsersTypes";

const ListRandomUsers = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [randomUsers, setRandomUsers] = useState<RandomUserTypeApi[] | null>();
  const [page, setPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getUsers = useCallback(async (): Promise<void> => {
    setRandomUsers(null);
    const res = await fetch(
      `https://randomuser.me/api/?inc=name,gender,dob,login,email,picture&page=${page}&results=9&seed=hasllow`
    );
    const data: ResponseRandomUserApi = await res.json();
    setRandomUsers(data.results);
  }, [page]);

  useEffect(() => {
    getUsers();
  }, [page, getUsers]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredRandomUsers = randomUsers?.filter((user) => {
    if (searchInput.length === 0) return randomUsers;

    return (
      user.name.first.toLocaleLowerCase().includes(searchInput) ||
      user.name.last.toLocaleLowerCase().includes(searchInput) ||
      user.email.toLocaleLowerCase().includes(searchInput) ||
      user.login.username.toLocaleLowerCase().includes(searchInput)
    );
  });

  const randomUsersCards = filteredRandomUsers?.map((randomUser) => {
    const name = randomUser.name.first + " " + randomUser.name.last;
    const email = randomUser.email;
    const username = randomUser.login.username;
    const age = randomUser.dob.age;
    const image = randomUser.picture.large;
    const id = randomUser.login.uuid;
    const user = { name, email, username, age, image, id };

    return <CardRandomUser user={user} key={id} />;
  });

  return (
    <ContainerLayout>
      <h1>API Random Users</h1>
      <TextField
        label="Search"
        type={"search"}
        fullWidth
        sx={{ margin: "24px 0" }}
        value={searchInput}
        onChange={handleSearchInput}
      />
      {!filteredRandomUsers && <CircularProgress />}
      <Grid2 container spacing={2} sx={{ width: "100%" }}>
        {filteredRandomUsers && filteredRandomUsers?.length > 0 && randomUsersCards}
      </Grid2>

      <br />
      <Pagination count={10} color="primary" onChange={handlePageChange} sx={{ marginBottom: "8px" }} />
    </ContainerLayout>
  );
};

export default ListRandomUsers;
