import React, { useReducer, createContext } from "react";
import ContextReducer from "./ContextReducer";
const initialState = JSON.parse(localStorage.getItem("records")) || [];
const ExpenseTrackerContext = createContext(initialState);

const Provider = ({ children }) => {
  const [data, dispatch] = useReducer(ContextReducer, initialState);

  // Delete Method
  const DeleteRecord = (id) => {
    dispatch({ type: "DELETE_RECORD", payload: id });
  };
  // Add Method
  const AddRecord = (record) => {
    dispatch({ type: "ADD_RECORD", payload: record });
  };
  // Finding total amount
  const total = data.reduce(
    (acc, currVal) =>
      currVal.values.type == "Income"
        ? Number(acc) + Number(currVal.values.amount)
        : Number(acc) - Number(currVal.values.amount),

    0
  );

  // Sort data
  let reduceData = data.reduce((total, item) => {
    if (!item.values.category) return total;
    if (!total[item.values.category]) {
      total[item.values.category] = {
        label: item.values.category,
        value: Number(item.values.amount),
      };
    } else {
      total[item.values.category] = {
        ...total[item.values.category],
        value: total[item.values.category].value + Number(item.values.amount),
      };
    }
    return total;
  }, []);

  // console.log(reduceData);

  return (
    <>
      <ExpenseTrackerContext.Provider
        value={{
          DeleteRecord,
          AddRecord,
          data,
          total,
          reduceData,
        }}
      >
        {children}
      </ExpenseTrackerContext.Provider>
    </>
  );
};
export { Provider, ExpenseTrackerContext };
