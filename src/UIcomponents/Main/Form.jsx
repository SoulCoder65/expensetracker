import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import uuid from "react-uuid";
import { useSpeechContext } from "@speechly/react-client";
// Snackbar
import SnackBar from "./Snackbar";
// Data import
import Type from "../../Data/Type";
import { ExpenseCategories, IncomeCategories } from "../../Data/Categories";
// Context Data
import { ExpenseTrackerContext } from "./../../Context/context";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formCSs: {
    display: "flex",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Form = () => {
  const classes = useStyles();
  // Managing State
  const [values, setValues] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
  });
  // Alert check
  const [open, setOpen] = useState(false);
  // Add record reducer
  const { AddRecord } = useContext(ExpenseTrackerContext);
  // Convert voice to text
  const { segment } = useSpeechContext();

  // Change State Function
  const onChange = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  // Form submit function
  const onClick = () => {
    AddRecord({ values, id: uuid() });
    setOpen(true);
    setValues({
      type: "",
      category: "",
      date: "",
      amount: "",
    });
  };

  // Speechly
  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setValues({ ...values, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setValues({ ...values, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return onClick();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setValues([]);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value
          .slice(1)
          .toLowerCase()}`;

        switch (s.type) {
          case "amount":
            setValues({ ...values, amount: s.value });
            break;
          case "category":
            if (IncomeCategories.map((iC) => iC.type).includes(category)) {
              setValues({ ...values, type: "Income", category });
            } else if (
              ExpenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setValues({ ...values, type: "Expense", category });
            }
            break;
          case "date":
            setValues({ ...values, date: s.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        values.amount &&
        values.category &&
        values.type &&
        values.date
      ) {
        onClick();
      }
    }
  }, [segment]);

  // Speechly End

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formCSs}>
          {/* Type Field */}
          <TextField
            id="standard-select-types"
            select
            name="type"
            value={values.type}
            label="Type"
            onChange={onChange}
          >
            {Type.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          {/* Categories Field */}
          <TextField
            id="standard-select-types"
            select
            name="category"
            value={values.category}
            label="Categories"
            onChange={onChange}
          >
            {values.type == "Income"
              ? IncomeCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))
              : ExpenseCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
          </TextField>
        </div>
        {/* Second Row */}
        <div className={classes.formCSs}>
          {/* Amount */}
          <TextField
            label="Amount"
            id="standard-start-adornment"
            name="amount"
            value={values.amount}
            onChange={onChange}
          />
          {/* Date picker */}
          <TextField
            id="date"
            label="Date"
            type="date"
            name="date"
            value={values.date}
            onChange={onChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {values.type &&
          values.amount &&
          values.category &&
          values.date &&
          !Number.isNaN(Number(values.amount)) && (
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "90%",
                backgroundColor: "#6f9eaf",
                color: "black",
                fontWeight: "bold",
                marginLeft: "5%",
                marginTop: "2%",
                marginBottom: "2%",
              }}
              onClick={onClick}
            >
              Save
            </Button>
          )}
        <SnackBar open={open} setOpen={setOpen} />
      </form>
    </>
  );
};
export default Form;
