import React, { useEffect, useRef } from "react";
import MainCard from "./UIcomponents/Main/MainCard";
import ChartTemplate from "./UIcomponents/Charts/ChartFiles/ChartTemplate";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { IncomeCategories, ExpenseCategories } from "./Data/Categories";
import Background from "./Images/bg.jpg";
import { useSpeechContext, SpeechState } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from "@speechly/react-ui";
import "./App.css";

// Framer motion
import { motion } from "framer-motion";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
  },
  // Changing order of
  main: {
    order: 1,
    width: 100,
    [theme.breakpoints.up("sm")]: {
      order: 2,
    },
  },
  income: {
    order: 2,
    [theme.breakpoints.up("sm")]: {
      order: 2,
    },
  },
  expense: {
    order: 3,
    [theme.breakpoints.up("sm")]: {
      order: 3,
    },
  },
}));
const App = () => {
  const { speechState } = useSpeechContext();
  //To scroll to top on speaking
  const main = useRef(null);
  const executeScroll = () => main.current.scrollIntoView();
  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  const classes = useStyles();
  return (
    <>
      <motion.div
        className={classes.root}
        style={{ backgroundImage: { Background } }}
      >
        <Grid container spacing={3} style={{ height: "100%" }}>
          {/* Income tracker */}
          <Grid
            item
            xs={12}
            md={3}
            style={{ margin: "auto" }}
            className={classes.income}
          >
            <ChartTemplate
              category={IncomeCategories}
              title="Income Track"
              theme="umber"
            />
          </Grid>
          {/* Income tracker End*/}
          {/* Main  */}
          <Grid ref={main} item xs={12} md={4} className={classes.main}>
            <motion.div
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1, duration: "1.5", type: "spring" }}
            >
              <MainCard />
            </motion.div>
          </Grid>
          {/* Main End */}
          {/* Expense Tracker */}
          <Grid
            item
            xs={12}
            md={3}
            style={{ margin: "auto" }}
            className={classes.expense}
          >
            <ChartTemplate category={ExpenseCategories} title="Expense Track" />
          </Grid>
          {/* Expense Tracker End */}
         
        </Grid>
        {/* Speak Button */}
        <PushToTalkButtonContainer style={{ marginTop: "12px" }}>
          <PushToTalkButton />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      </motion.div>
    </>
  );
};
export default App;
