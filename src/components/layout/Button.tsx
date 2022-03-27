import { Fragment } from "react";
import classes from "./Button.module.css";

const Button: React.FC<{
  onIncrease: () => void;
  onDecrease: () => void;
}> = (props) => {
  let { children } = props;

  return (
    <Fragment>
      <button className={classes["plus-button"]} onClick={props.onIncrease}>
        +
      </button>
      <div className={classes["button-number"]}>
        <b>{children}</b>
      </div>
      <button className={classes["minus-button"]} onClick={props.onDecrease}>
        -
      </button>
    </Fragment>
  );
};

export default Button;
