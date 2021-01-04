// Show list of all records
import React,{useContext} from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import {ExpenseTrackerContext} from "./../../Context/context"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));
  

const ExpenseList=()=>{
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const{data,DeleteRecord}=useContext(ExpenseTrackerContext)
  
    return(<>
        <div className={classes.demo}>
            <List dense={dense}>
              {
                data.map((record)=>{
                  return<>
                    <ListItem>
                    <ListItemAvatar>
                 {record.values.type=="Income"?(
                  <Avatar style={{backgroundColor:"green"}}>
                  <AttachMoneyIcon/>
                 </Avatar>
                 ):
                 <Avatar style={{backgroundColor:"red"}}>
                  <MoneyOffIcon/>
                  </Avatar>
                 }
                  
                  </ListItemAvatar>
                  <ListItemText
                    primary={record.values.category}
                    secondary={`₹${record.values.amount}  - ${record.values.date}`}
                  />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                      DeleteRecord(record.id)
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>

                </ListItem>
                </>
                })
              }
                              
            </List>
          </div>
    </>)
}
export default ExpenseList;