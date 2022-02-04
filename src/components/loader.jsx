import classes from "./loader.module.css";

function Loader() {
  return (
    <div className={classes.loadingCardContainer}>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
      <div className={classes.loadingCard}></div>
    </div>
  );
}

export default Loader;
