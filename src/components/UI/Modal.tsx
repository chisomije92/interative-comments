import React, { Fragment } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

type modalMethodsType = {
  onCancel: () => void;
  onConfirm: () => void;
};

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay: React.FC<modalMethodsType> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes["modal--container"]}>
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will delete this
          comment and can't be undone
        </p>
        <div className={classes["button-group"]}>
          <button onClick={props.onCancel}>NO, CANCEL</button>
          <button onClick={props.onConfirm}>YES, DELETE</button>
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")! as HTMLDivElement;

const Modal: React.FC<modalMethodsType> = (props) => {
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop />, portalElement)}
      {reactDom.createPortal(
        <ModalOverlay onCancel={props.onCancel} onConfirm={props.onConfirm} />,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
