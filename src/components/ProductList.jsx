import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Filters from "./Filters";
import Product from "./Product";

import { useStyles } from "./ProductList.mui";

const ProductList = props => {
  const { container, products, setFilterKeywords } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Daye tampon store
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="filters">
        <Drawer
          container={container}
          variant={isDesktop ? "permanent" : "temporary"}
          open={isDesktop ? true : mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Filters setFilterKeywords={setFilterKeywords} />
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h5">Products</Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {products.length ? (
              products.map(({ id, price, currency, productImage, tampons }) => (
                <Product
                  key={id}
                  id={id}
                  price={price}
                  currency={currency}
                  productImage={productImage}
                  tampons={tampons}
                />
              ))
            ) : (
              <p>Sorry, no products available</p>
            )}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(Product.propTypes).isRequired)
};

ProductList.defaultProps = {
  products: []
};

export default ProductList;
