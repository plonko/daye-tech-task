import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getCurrencySymbol } from "../utils/currency";

const Product = props => {
  const { price, currency, productImage, tampons } = props;
  const useStyles = makeStyles(theme => ({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardMedia: {
      paddingTop: "56.25%" // 16:9
    },
    cardPricing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: theme.spacing(2)
    },
    cardContent: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();

  const getProductDescription = (amount, size, coating) => {
    const getCoatingString = coating === "none" ? "un" : coating + "-";

    return `${amount} ${size} ${getCoatingString}coated tampons`;
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={productImage}
          title="Tampon pack"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            Tampon pack
          </Typography>
          <div className={classes.cardPricing}>
            <Typography component="h2" variant="h3" color="textPrimary">
              {getCurrencySymbol(currency)}
              {price}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              /mo
            </Typography>
          </div>
          <Typography variant="subtitle2" gutterBottom>
            Each pack contains:
          </Typography>
          {tampons.map(({ id, amount, size, coating }) => {
            return (
              <Typography variant="body1" key={id}>
                {getProductDescription(amount, size, coating)}
              </Typography>
            );
          })}
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" color="primary">
            Buy
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  tampons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      coating: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default Product;
