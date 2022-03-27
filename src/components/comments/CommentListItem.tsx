import { useContext, useEffect } from "react";
import CardGrid from "../UI/CardGrid";
import ReplyItem from "../replies/ReplyItem";
import ReplyItemUser from "../replies/ReplyItemUser";
import ReplyContent from "../replies/ReplyContent";
import Card from "../UI/Card";
import Comment from "./comment-box/Comment";

import DataContext from "../../store/data-context";
import Modal from "../UI/Modal";
import classes from "../replies/ReplyItem.module.css";
import useEvaluateData from "../hooks/use-evaluateData";

const CommentListItem: React.FC<{
  defaultValue?: string;
  isCurrentUser: boolean;
  content: string;
  id: number;
  score: number;
  src: string;
  alt: string;
  username: string;
  createdAt: string;
  createdAtDate: string;
  image: string;
}> = (props) => {
  const dataCtx = useContext(DataContext);
  const {
    showReplyBox,
    showEditBox,
    showModal,
    enteredValue,
    updatedReply,
    setEnteredValue,
    setUpdatedReply,
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

  useEffect(() => {
    setUpdatedReply(props.content);
  }, [props.content, setUpdatedReply]);

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
            value={enteredValue}
            onChange={(e) => setEnteredValue(e.target.value)}
            image={props.image}
            onSubmit={submitReplyHandler.bind(null, props.username, props.id)}
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
              // value={props.content ? props.content : reply}
              // value={
              //   updatedReply.length < 1
              //     ? props.content.length <= 3
              //       ? updatedReply
              //       : props.content
              //     : updatedReply
              // }
              // value={
              //   props.content.length <= 1
              //     ? updatedReply
              //     : props.content + updatedReply
              // }
              value={updatedReply}
              onChange={(e) => setUpdatedReply(e.target.value)}
              alterClass
              defaultValue={`${props.content}`}
              onUpdate={updateCommentHandler.bind(null, props.id)}
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
