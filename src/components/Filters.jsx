import React, { useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { FILTER_CATEGORIES } from "../utils/constants";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

const Filters = props => {
  const { setFilterKeywords } = props;
  const classes = useStyles();

  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    setFilterKeywords(checked);
  }, [checked, setFilterKeywords]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getList = (heading, values) => {
    return (
      <List key={heading} subheader={<ListSubheader>{heading}</ListSubheader>}>
        {values.map(text => getListItem(text))}
        <Divider />
      </List>
    );
  };

  const getListItem = text => {
    const value = text.toString().toLocaleLowerCase();
    const labelId = `checkbox-list-secondary-label-${value}`;

    return (
      <ListItem button key={value} dense onClick={handleToggle(value)}>
        <ListItemText primary={text} />
        <Checkbox
          edge="end"
          checked={checked.indexOf(value) !== -1}
          disableRipple
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItem>
    );
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {FILTER_CATEGORIES.map(({ heading, values }) => getList(heading, values))}
    </div>
  );
};

export default Filters;
