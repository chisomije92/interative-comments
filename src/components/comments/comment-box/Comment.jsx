import classes from "./Comment.module.css";

const Comment = (props) => {
  let cssClasses = [classes["comment__form"]];

  if (props.modifyClass) {
    cssClasses.push(classes["form--reply-edit"]);
  }

  if (props.alterClass) {
    cssClasses.push(
      classes["form--reply-edit"],
      classes["form--reply-altered"]
    );
  }

  if (props.mainComment) {
    cssClasses.push(classes["main-comment"]);
  }
  return (
    <>
      <div className={classes["comment__image"]}>
        {props.image && (
          <img
            src={props.image}
            alt={"profile of Julius Omo"}
            width={props.width ? props.width : "35px"}
          />
        )}
      </div>
      <form
        className={cssClasses.join(" ")}
        onSubmit={!props.onSubmit ? props.onUpdate : props.onSubmit}
      >
        <textarea
          className={classes["comment__textarea"]}
          placeholder="Add a Comment..."
          defaultValue={props.defaultValue ? props.defaultValue : ""}
        />

        <button className={classes.button}>{props.children}</button>
      </form>
    </>
  );
};

export default Comment;
