import { useContext } from "react";
import CardGrid from "../UI/CardGrid";
import ReplyItem from "../replies/ReplyItem";
import ReplyItemUser from "../replies/ReplyItemUser";
import ReplyContent from "../replies/ReplyContent";
import Card from "../UI/Card";
import Comment from "./comment-box/Comment.jsx";

import DataContext from "../../store/data-context";
import Modal from "../UI/Modal";
import classes from "../replies/ReplyItem.module.css";
import useEvaluateData from "../hooks/use-evaluateData";

const CommentListItem = (props) => {
  const dataCtx = useContext(DataContext);
  const {
    showReplyBox,
    showEditBox,
    showModal,
    toggleEditBox: toggleEditBoxHandler,
    toggleReplyBox: toggleReplyBoxHandler,
    deleteData,
    cancelDelete: cancelDeleteHandler,
    confirmDeleteComment: confirmDeleteCommentHandler,
    submitData: submitReplyHandler,
    updateComment: updateCommentHandler,
    increaseCommentScore: increaseScoreHandler,
    decreaseCommentScore: decreaseScoreHandler,
  } = useEvaluateData(dataCtx, props.defaultValue);

  return (
    <>
      {showModal && (
        <Modal
          onCancel={cancelDeleteHandler}
          onConfirm={confirmDeleteCommentHandler.bind(null, props.id)}
        />
      )}
      {!props.isCurrentUser && (
        <CardGrid>
          <ReplyItem
            isCurrentUser={props.isCurrentUser}
            score={props.score}
            src={props.src}
            alt={props.alt}
            username={props.username}
            createdAt={props.createdAt}
            onClick={toggleReplyBoxHandler}
            onIncrease={increaseScoreHandler.bind(null, props.id)}
            onDecrease={decreaseScoreHandler.bind(null, props.id)}
          />

          <ReplyContent content={props.content} />
        </CardGrid>
      )}

      {showReplyBox && (
        <Card>
          <Comment
            image={props.image}
            onSubmit={submitReplyHandler.bind(null, props.username, props.id)}
            defaultValue={`${props.defaultValue}`}
          >
            REPLY
          </Comment>
        </Card>
      )}

      {!showEditBox && props.isCurrentUser && (
        <CardGrid gridContainerMod>
          <ReplyItemUser
            score={props.score}
            src={props.src}
            alt={props.alt}
            username={props.username}
            createdAtDate={props.createdAtDate}
            onEdit={toggleEditBoxHandler}
            onDelete={deleteData}
            onIncrease={increaseScoreHandler.bind(null, props.id)}
            onDecrease={decreaseScoreHandler.bind(null, props.id)}
          />
          <ReplyContent content={props.content} />
        </CardGrid>
      )}
      {showEditBox && props.isCurrentUser && (
        <CardGrid altered>
          <ReplyItemUser
            isCurrentUser={props.isCurrentUser}
            score={props.score}
            src={props.src}
            alt={props.alt}
            username={props.username}
            createdAtDate={props.createdAtDate}
            onEdit={toggleEditBoxHandler}
            onDelete={deleteData}
            className={classes["control-button-mod"]}
          />
          <Card newClass>
            <Comment
              alterClass
              defaultValue={`${props.content}`}
              onUpdate={updateCommentHandler.bind(null, null, props.id)}
            >
              UPDATE
            </Comment>
          </Card>
        </CardGrid>
      )}
    </>
  );
};

export default CommentListItem;
