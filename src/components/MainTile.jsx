import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../css/MainTile.css";

import NewsUpdate from "./News/NewsUpdate";
import Weather from "./Weather/Weather";
import Finance from "./Finance";
import Sports from "./Sports";
import Subscribe from "./Subscribe";

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: "start",
    color: theme.palette.text.secondary
    // cursor: "pointer"
  }
}));

export default function MainTile() {
  //tile-based news portal with 5 sections=Paper
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <NewsUpdate />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Weather />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Finance />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Sports />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Subscribe />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
