import Button from "../layout/Button";

import { ReactComponent as DeleteIcon } from "../../images/icon-delete.svg";
import { ReactComponent as EditIcon } from "../../images/icon-edit.svg";

import classes from "./ReplyItem.module.css";

const ReplyItemUser: React.FC<{
  isCurrentUser?: boolean;
  content?: string;
  id?: string | number;
  score: number;
  src: string;
  alt: string;
  username: string;
  createdAt?: string;
  createdAtDate: string;
  className?: string;
  onIncrease?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDecrease?: () => void;
}> = (props) => {
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
          {
            <>
              {props.username} <b>you</b>
            </>
          }
          {props.createdAtDate && <span>{props.createdAtDate}</span>}
        </div>
      </div>

      <div
        className={
          !props.className
            ? classes["control--buttons"]
            : [classes["control--buttons"], props.className].join(" ")
        }
      >
        <span className={classes["delete__button"]} onClick={props.onDelete}>
          <DeleteIcon />
          <button>Delete</button>
        </span>
        <span className={classes["edit__button"]} onClick={props.onEdit}>
          <EditIcon />
          <button>Edit</button>
        </span>
      </div>
    </>
  );
};

export default ReplyItemUser;
