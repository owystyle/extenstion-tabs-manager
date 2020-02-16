import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HistoryIcon from "@material-ui/icons/History";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import useWindow from "./useWindow";

function Window(props) {
  const {
    id,
    children,
    styles,
    onKeep,
    onFocus,
    onSelectAll,
    onSelect,
    isSelected,
    isIndeterminate,
    isAllSelected,
  } = useWindow(props);

  console.log("WINDOW RENDER", id);

  return (
    <Card>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={styles.small} align="left">
              <Checkbox
                indeterminate={isIndeterminate(id)}
                checked={isAllSelected(id)}
                onChange={e => onSelectAll(e, id)}
              />
            </TableCell>
            <TableCell colSpan={2} padding="none">
              <Typography variant="h5">{`Window ${id}`}</Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton color="primary" onClick={onKeep}>
                <HistoryIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {children.map(row => (
            <TableRow hover key={row.id}>
              <TableCell className={styles.small} align="left">
                <Checkbox
                  onChange={() => onSelect(row.id)}
                  checked={isSelected(row.id)}
                />
              </TableCell>
              <TableCell className={styles.small} align="left" padding="none">
                <Avatar
                  variant="rounded"
                  className={styles.favicon}
                  alt={row.title}
                  src={row.favIconUrl}
                />
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="right">
                {row.audible && (
                  <IconButton>
                    <VolumeUpIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton onClick={() => onFocus(row.id)}>
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default Window;
