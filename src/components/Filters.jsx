import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

const Filters = props => {
  const { setFilterKeywords } = props;
  const classes = useStyles();

  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setFilterKeywords(["CBD"]);

    setChecked(newChecked);
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List subheader={<ListSubheader>Coating</ListSubheader>}>
        {["Inbox", "Starred", "Send email", "Drafts"].map(text => {
          const labelId = `checkbox-list-secondary-label-${text}`;

          return (
            <ListItem button key={text} dense onClick={handleToggle(text)}>
              <ListItemText primary={text} />
              <Checkbox
                edge="end"
                checked={checked.indexOf(text) !== -1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Filters;
