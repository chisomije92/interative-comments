import Button from "../layout/Button";
import { ReactComponent as ReplyIcon } from "../../images/icon-reply.svg";

import classes from "./ReplyItem.module.css";

const ReplyItem = (props) => {
  return (
    <>
      <div className={classes["buttonDiv"]}>
        <Button onIncrease={props.onIncrease} onDecrease={props.onDecrease}>
          {props.score}
        </Button>
      </div>
      <div className={classes["sub-group"]}>
        <div>
          <img src={props.src} alt={props.alt} width={"30px"} />
        </div>
        <div className={`${classes.username}`}>
          {props.username}
          {props.createdAt && <span>{props.createdAt}</span>}
        </div>
      </div>

      <div className={classes["reply--div"]} onClick={props.onClick}>
        <ReplyIcon className={classes["reply__icon"]} />
        <button className={classes["reply__button"]}>Reply</button>
      </div>
    </>
  );
};

export default ReplyItem;
