import { useContext, useEffect } from "react";
import ReplyItem from "./ReplyItem";
import Modal from "../UI/Modal";
import ReplyContent from "./ReplyContent";
import Comment from "../comments/comment-box/Comment";
import CardGrid from "../UI/CardGrid";
import Card from "../UI/Card";
import ReplyItemUser from "./ReplyItemUser";
import DataContext from "../../store/data-context";
import useEvaluateData from "../hooks/use-evaluateData";

const ReplyListItem: React.FC<{
  replyingToEdited: string;
  commentId: number;
  replyId: number;
  isCurrentUser: boolean;
  score: number;
  src: string;
  alt: string;
  username: string;
  createdAtUser: string;
  replyingTo: string;
  content: string;
  image: string;

  createdAtDate: string;
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
    deleteData: deleteReplyHandler,
    cancelDelete: cancelDeleteHandler,
    confirmDeleteReply: confirmDeleteReplyHandler,
    submitSubData: submitReplyHandler,
    updateReply: updateReplyHandler,
    increaseReplyScore: increaseScoreHandler,
    decreaseReplyScore: decreaseScoreHandler,
  } = useEvaluateData(dataCtx, props.replyingToEdited);

  useEffect(() => {
    setUpdatedReply(`${props.replyingToEdited} ${props.content}`);
  }, [props.content, props.replyingToEdited, setUpdatedReply]);

  return (
    <>
      {showModal && (
        <Modal
          onCancel={cancelDeleteHandler}
          onConfirm={confirmDeleteReplyHandler.bind(
            null,
            props.commentId,
            props.replyId
          )}
        />
      )}
      {!props.isCurrentUser && (
        <CardGrid addedClass>
          <ReplyItem
            score={props.score}
            src={props.src}
            alt={props.alt}
            username={props.username}
            createdAt={props.createdAtUser}
            onClick={toggleReplyBoxHandler}
            onIncrease={increaseScoreHandler.bind(
              null,
              props.commentId,
              props.replyId
            )}
            onDecrease={decreaseScoreHandler.bind(
              null,
              props.commentId,
              props.replyId
            )}
          />
          <ReplyContent replyingTo={props.replyingTo} content={props.content} />
        </CardGrid>
      )}

      {showReplyBox && !props.isCurrentUser && (
        <Card modified>
          <Comment
            image={props.image}
            value={enteredValue}
            onChange={(e) => setEnteredValue(e.target.value)}
            onSubmit={submitReplyHandler.bind(
              null,
              props.username,
              props.commentId,
              props.replyId
            )}
          >
            REPLY
          </Comment>
        </Card>
      )}

      {!showEditBox && props.isCurrentUser && (
        <CardGrid currentUserClass>
          <ReplyItemUser
            isCurrentUser={props.isCurrentUser}
            score={props.score}
            src={props.src}
            alt={props.alt}
            username={props.username}
            createdAtDate={props.createdAtDate}
            onEdit={toggleEditBoxHandler}
            onDelete={deleteReplyHandler}
            onIncrease={increaseScoreHandler.bind(
              null,
              props.commentId,
              props.replyId
            )}
            onDecrease={decreaseScoreHandler.bind(
              null,
              props.commentId,
              props.replyId
            )}
          />
          <ReplyContent replyingTo={props.replyingTo} content={props.content} />
        </CardGrid>
      )}

      {showEditBox && props.isCurrentUser && (
        <CardGrid modified>
          <ReplyItemUser
            isCurrentUser={props.isCurrentUser}
            score={props.score}
            src={props.src}
            alt={props.alt}
            username={props.username}
            createdAtDate={props.createdAtDate}
            onEdit={toggleEditBoxHandler}
            onDelete={deleteReplyHandler}
          />
          <Card newClass>
            <Comment
              modifyClass
              value={updatedReply}
              onChange={(e) => setUpdatedReply(e.target.value)}
              onUpdate={updateReplyHandler.bind(
                null,
                props.username,
                props.commentId,
                props.replyId
              )}
            >
              UPDATE
            </Comment>
          </Card>
        </CardGrid>
      )}
    </>
  );
};

export default ReplyListItem;
