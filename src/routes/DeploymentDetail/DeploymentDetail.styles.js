import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    border: "none",
    "& .MuiListItemText-secondary .MuiSvgIcon-root:not(:first-child)": {
      marginLeft: "5px"
    },
    "& .MuiListItemText-secondary .MuiSvgIcon-root": {
      fontSize: "20px"
    }
  },
  cardTitle: {
    display: "flex"
  },
  title: {
    fontWeight: "bold",
    marginLeft: ".5rem",
    fontSize: "2rem"
  }
}));
