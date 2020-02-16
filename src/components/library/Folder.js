import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
  },
  favicon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

function Folder({ data }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleOpen = useCallback(
    id => {
      dispatch({ type: "BOOKMARKS_OPEN_FOLDER", id: data.id });
    },
    [dispatch, data]
  );

  const handleNewTab = useCallback(
    tab => {
      dispatch({ type: "BOOKMARKS_OPEN", tab });
    },
    [dispatch]
  );

  return (
    <Card>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={styles.small} align="left">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </TableCell>
            <TableCell colSpan={2} padding="none">
              <Typography variant="h5">{data.title}</Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => handleOpen()}>
                <OpenInBrowser color="primary" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.children.map(row => (
            <TableRow key={row.id} hover onClick={() => handleNewTab(row)}>
              <TableCell className={styles.small} align="left">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
              <TableCell className={styles.small} align="left" padding="none">
                <Avatar
                  variant="rounded"
                  className={styles.favicon}
                  alt={row.title}
                  src={`chrome://favicon/size/16@2x/${row.url}`}
                />
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="right">
                {row.audible ? (
                  <IconButton>
                    <VolumeUpIcon />
                  </IconButton>
                ) : (
                  ""
                )}
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default Folder;
