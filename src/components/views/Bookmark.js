import React from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Folder from "../library/Folder";
import useFolder from "../library/useFolder";

function Bookmark() {
  const folder = useFolder();

  if (!folder) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container maxWidth="lg">
      {folder ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Folder data={folder} />
          </Grid>
        </Grid>
      ) : (
        <div>Empty</div>
      )}
    </Container>
  );
}

export default Bookmark;
