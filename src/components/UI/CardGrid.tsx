import classes from "./CardGrid.module.css";

const CardGrid: React.FC<{
  addedClass?: boolean;
  modified?: boolean;
  altered?: boolean;
  currentUserClass?: boolean;
  gridContainerMod?: boolean;
}> = (props) => {
  let cssClasses = [];

  if (props.addedClass) {
    cssClasses.push([classes["reply--section"]]);
  }

  if (!props.addedClass) {
    cssClasses = [classes["grid-container"]];
  }

  if (props.modified) {
    cssClasses = [classes["grid-container"], classes["reply--section__mod"]];
  }

  if (props.altered) {
    cssClasses = [
      classes["grid-container"],
      classes["reply--section__mod"],
      classes["reply--section__altered"],
    ];
  }

  if (props.currentUserClass) {
    cssClasses = [classes["current-user-grid"]];
  }

  if (props.gridContainerMod) {
    cssClasses = [classes["grid-container"], classes["grid-container_mod"]];
  }
  return <section className={cssClasses.join(" ")}>{props.children}</section>;
};

export default CardGrid;
