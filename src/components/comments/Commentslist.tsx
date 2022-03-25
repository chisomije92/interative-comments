import React, { Fragment, useContext, useState } from "react";

import RepliesList from "../replies/RepliesList";
import classes from "./Commentslist.module.css";
import juliusomo from "../../images/avatars/image-juliusomo.png";

import shortid from "shortid";
import TimeData from "../../eval-time/TimeData";
import Comment from "./comment-box/Comment";
import Card from "../UI/Card";
import CommentListItem from "./CommentListItem";
import DataContext from "../../store/data-context";
import formatTime from "../../eval-time/FormatTime";

interface ReplyObjType {
  id: string;
  content: string;
  createdAtDate: string;
  replyingTo: string;
  score: number;
  user: {
    alt: string;
    png: string;
    webp: string;
  };
}

interface CommentObjType {
  id: number | string;
  content: string;
  createdAt?: string;
  createdAtDate: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
      alt: string;
    };
    username: string;
  };
  replies: ReplyObjType[];
}

const CommentsList: React.FC = () => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const dataCtx = useContext(DataContext);
  const { data } = dataCtx;

  const submitCommentDataHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log(event.target[0].value);
    // setEnteredValue(event.target[0].value);

    if (enteredValue.length < 0 || enteredValue === " ") {
      return null;
    }

    const commentObj: CommentObjType = {
      id: shortid.generate(),

      content: enteredValue,
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
    setEnteredValue("");
  };

  let isCurrentUser: boolean;

  return (
    <Fragment>
      <ul className={classes["ul--main"]}>
        {data.comments
          .sort((a: CommentObjType, b: CommentObjType) => b.score - a.score)
          .map((comment: CommentObjType) => (
            <li key={comment.id}>
              {/* {console.log(typeof comment.id)} */}
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
                // replyingTo={comment.user.username}
                content={comment.content}
                image={juliusomo}
                // defaultValue={`@${comment.user.username}`}
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
