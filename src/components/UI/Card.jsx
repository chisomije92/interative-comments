import classes from "./Card.module.css";

const Card = (props) => {
  let cssClasses = [classes["comment--container"]];

  if (props.altered) {
    cssClasses.push(classes["section-mod"]);
  }

  if (props.modified) {
    cssClasses = [
      classes["comment--container"],
      classes["comment--container__mod"],
    ];
  }

  if (props.newClass) {
    cssClasses = [classes["reply-form--container"]];
  }
  if (props.changedClass) {
    cssClasses = [
      classes["reply-form--container"],
      classes["reply-form--container__changed"],
    ];
  }

  return <section className={cssClasses.join(" ")}>{props.children}</section>;
};
export default Card;
