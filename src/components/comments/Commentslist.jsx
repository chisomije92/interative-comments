import { Fragment, useContext } from "react";

import RepliesList from "../replies/RepliesList";
import classes from "./Commentslist.module.css";
import juliusomo from "../../images/avatars/image-juliusomo.png";
import shortid from "shortid";
import TimeData from "../../eval-time/TimeData";
import Comment from "./comment-box/Comment.jsx";
import Card from "../UI/Card";
import CommentListItem from "./CommentListItem";
import DataContext from "../../store/data-context";
import formatTime from "../../eval-time/FormatTime";

const CommentsList = (props) => {
  const dataCtx = useContext(DataContext);
  const { data } = dataCtx;

  const submitCommentDataHandler = (event) => {
    event.preventDefault();
    if (event.target[0].value.length < 0 || event.target[0].value === " ") {
      return null;
    }

    const commentObj = {
      id: shortid.generate(),
      content: event.target[0].value,
      createdAtDate: TimeData(),
      score: 0,
      user: {
        image: {
          png: juliusomo,
          webp: "./images/avatars/image-juliusomo.webp",
          alt: "image of Julius Omo",
        },
        username: "juliusomo",
      },
      replies: [],
    };
    dataCtx.addComment(commentObj);
    event.target[0].value = " ";
  };

  let isCurrentUser;

  return (
    <Fragment>
      <ul className={classes["ul--main"]}>
        {data.comments
          .sort((a, b) => b.score - a.score)
          .map((comment) => (
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
                replyingTo={comment.user.username}
                content={comment.content}
                image={juliusomo}
                defaultValue={`@${comment.user.username}`}
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
        >
          SEND
        </Comment>
      </Card>
    </Fragment>
  );
};

export default CommentsList;
