import React from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Folder from "../library/Folder";
import useBookmark from "../library/useBookmark";

function Bookmark() {
  const bookmark = useBookmark();

  if (!bookmark) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container maxWidth="lg">
      {bookmark ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Folder {...bookmark} />
          </Grid>
        </Grid>
      ) : (
        <div>Empty</div>
      )}
    </Container>
  );
}

export default Bookmark;
