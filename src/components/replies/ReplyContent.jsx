import classes from "./ReplyContent.module.css";

const ReplyContent = (props) => {
  return (
    <div className={classes.reply}>
      <p>
        <b>{props.replyingTo ? `@${props.replyingTo}` : ""} </b> {props.content}
      </p>
    </div>
  );
};

export default ReplyContent;
