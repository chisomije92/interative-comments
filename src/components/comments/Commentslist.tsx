import React, { Fragment, useContext } from "react";

import RepliesList from "../replies/RepliesList";
import classes from "./Commentslist.module.css";
import juliusomo from "../../images/avatars/image-juliusomo.png";
import Comment from "./comment-box/Comment";
import Card from "../UI/Card";
import CommentListItem from "./CommentListItem";
import DataContext from "../../store/data-context";
import formatTime from "../../eval-time-helpers/FormatTime";
import useEvaluateData from "../hooks/use-evaluateData";
import { CommentObjType } from "../interface-store/Interfaces";

const CommentsList: React.FC = () => {
  const dataCtx = useContext(DataContext);
  const { enteredValue, setEnteredValue, submitCommentDataHandler } =
    useEvaluateData(dataCtx);

  const { data } = dataCtx;

  let isCurrentUser: boolean;

  return (
    <Fragment>
      <ul className={classes["ul--main"]}>
        {data.comments
          .sort((a: CommentObjType, b: CommentObjType) => b.score - a.score)
          .map((comment: CommentObjType) => (
            <li key={comment.id}>
              {
                (isCurrentUser =
                  comment.user.username === data.currentUser.username)
              }
              <CommentListItem
                isCurrentUser={isCurrentUser}
                id={comment.id}
                score={comment.score}
                src={comment.user.image.png}
                alt={comment.user.image.alt}
                username={comment.user.username}
                createdAt={comment.createdAt}
                createdAtDate={formatTime(comment.createdAtDate)}
                content={comment.content}
                image={juliusomo}
              />

              {comment.replies.length > 0 && (
                <RepliesList
                  id={comment.id}
                  replies={comment.replies}
                  currentUser={data.currentUser.username}
                  image={juliusomo}
                />
              )}
            </li>
          ))}
      </ul>

      <Card altered>
        <Comment
          mainComment
          image={juliusomo}
          width={"35px"}
          onSubmit={submitCommentDataHandler}
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
        >
          SEND
        </Comment>
      </Card>
    </Fragment>
  );
};

export default CommentsList;
