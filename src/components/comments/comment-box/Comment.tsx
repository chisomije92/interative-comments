import React from "react";
// import classes from "./Comment.module.css";
import classes from "./Comment.module.css";

// interface FormEventCustom extends FormEventHandler, HTMLTextAreaElement {
//   (content: string, id: string, event: React.FormEvent<HTMLFormElement>): void;
// }

const Comment: React.FC<{
  content?: string;
  value: string;
  modifyClass?: boolean;
  alterClass?: boolean;
  mainComment?: boolean;
  image?: string;
  width?: string;

  // onSubmit?: React.FormEventHandler<
  //   (
  //     content: string,
  //     id: string,
  //     event: React.FormEvent<HTMLFormElement>
  //   ) => void
  // >;
  // onSubmit?: FormEventCustom;
  // onUpdate?: FormEventCustom;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onUpdate?: React.FormEventHandler<HTMLFormElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  defaultValue?: string;
}> = (props) => {
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
          // defaultValue={props.defaultValue ? props.defaultValue : null}
          value={props.value ? props.value : ""}
          onChange={props.onChange ? props.onChange : null}
        />

        <button className={classes.button}>{props.children}</button>
      </form>
    </>
  );
};

export default Comment;
