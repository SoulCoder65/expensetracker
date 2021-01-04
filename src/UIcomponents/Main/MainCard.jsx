import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import "../../UIcomponents/ui.css";
import ExpenseList from "./ExpenseList";
import { useSpeechContext } from "@speechly/react-client";

// Rest Components
import Form from "./Form";
import InfoCard from "./InfoCard";
// Context Data
import { ExpenseTrackerContext } from "./../../Context/context";

const useStyles = makeStyles({
  root: {
    maxWidth: 440,
    minHeight: 400,
    maxHeight: 500,
    margin: "auto",
    padding: 0,

    // backgroundColor:"wheat"
  },
  form_data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MainCard = () => {
  const { total } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();
  console.log(segment);
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ padding: "0px" }}>
        <div className="clip_path">
          <span>Expense Tracker</span>
        </div>

        <h3 style={{ textAlign: "center" }}>Total Balance: ₹{total}</h3>
        <Divider varient="fullWidth" />

        <div className={classes.form_data}>
          <Typography
            variant="body2"
            component="p"
            style={{ marginBottom: "4%" }}
          >
            <InfoCard />
            <br />
          </Typography>
          <Typography variant="body2" component="p">
            {segment ? (
              <div
                elevation={3}
                style={{ textAlign: "center", padding: "0 10%" }}
              >
                {segment.words.map((w) => w.value).join(" ")}
              </div>
            ) : null}
            <br />
          </Typography>
        </div>
        <Form />
      </CardContent>
      <Paper style={{ maxHeight: 200, overflow: "auto" }}>
        <ExpenseList />
      </Paper>
    </Card>
  );
};
export default MainCard;
