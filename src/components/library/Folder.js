import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import useFolder from "./useFolder";
import ActionsMenu from "./ActionsMenu";

function Folder(props) {
  const { title, children, styles, onOpen, onNewTab } = useFolder(props);

  return (
    <Card>
      <ActionsMenu>
        {({ onMoreClick }) => (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <Grid container className={styles.grid}>
                    <Typography variant="h5">{title}</Typography>
                    <div className={styles.grow} />
                    <IconButton onClick={onOpen}>
                      <OpenInBrowser color="primary" />
                    </IconButton>
                    <IconButton onClick={onOpen}>
                      <BookmarkIcon color="primary" />
                    </IconButton>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {children.map(row => (
                <TableRow key={row.id} hover onClick={() => onNewTab(row)}>
                  <TableCell className={styles.small} align="left">
                    <Avatar
                      variant="rounded"
                      className={styles.favicon}
                      alt={row.title}
                      src={`chrome://favicon/size/16@2x/${row.url}`}
                    />
                  </TableCell>
                  <TableCell align="left" padding="none">
                    <ListItemText
                      primary={row.title}
                      secondary={`${row.url.split("/")[0]}${
                        row.url.split("/")[1]
                      }${row.url.split("/")[2]}`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {row.audible ? (
                      <IconButton>
                        <VolumeUpIcon />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    <IconButton onClick={e => onMoreClick(e, row.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </ActionsMenu>
    </Card>
  );
}

export default Folder;
