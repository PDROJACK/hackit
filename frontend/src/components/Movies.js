import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Movies.css";
import { getTheatres, getTheatre } from "../actions/bookingActions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    flexDirection: "row",
    flexGrow: 1,
    borderRadius: 10,
    color: theme.palette.text.secondary,
  },
}));

const Movies = ({ booking, getTheatres, getTheatre }) => {
  const classes = useStyles();
  const history = useHistory();
  const [grid, setGrid] = useState([]);
  
  useEffect(() => {
    getTheatres();
  }, []);

  useEffect(() => {
    let count = 0;
    let tempGrid = [];
    let row = [];
    booking.theatres.map((theatre) => {
      if (count % 3 == 0) {
        tempGrid.push(formRows(row));
        row = [];
        count = 0;
      }
      row.push(theatre);
      count++;
    });
    setGrid(tempGrid);
  }, [booking.theatres]);

  const goToTheatre = async (id) => {
    console.log(id);
    if(getTheatre({theatreId: id})){
      history.push('/theatre')
    }
  }

  const formRows = (rowItems) => {
    return (
      <React.Fragment>
        {rowItems.map((movie) => {
          return (
            <Grid item xs={4} onClick={()=>goToTheatre(movie._id)}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <img src={movie.poster} width={200} height={300} />
                  </Grid>
                  <Grid item>
                    <h5>{movie.movieName}</h5>
                    <h6>{movie.name}</h6>
                    <h6>{movie.location}</h6>
                    <h6>$ 100 x 1</h6>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Grid container spacing={1}>
      {grid.map((formRow) => {
        return (
          <Grid container item xs={12} spacing={3}>
            {formRow}
          </Grid>
        );
      })}
    </Grid>
  );
};

const mapStateToProps = (reducer) => {
  return {
    booking: reducer.bookingReducer,
  };
};

export default connect(mapStateToProps, { getTheatres, getTheatre })(Movies);
