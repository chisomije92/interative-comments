import classes from "./RepliesList.module.css";
import juliusomo from "../../images/avatars/image-juliusomo.png";
import shortid from "shortid";
import ReplyListItem from "./ReplyListItem";
import DataContext from "../../store/data-context";
import { useContext, useState } from "react";

const RepliesList = (props) => {
  // const [showEditBox, setShowEditBox] = useState(false);
  let isCurrentUser;

  // const dataCtx = useContext(DataContext);

  // const SubmitReplyHandler = (repliedTo, replyId, event) => {
  //   event.preventDefault();

  //   if (event.target[0].value === " " || event.target[0].value === repliedTo) {
  //     return null;
  //   }

  //   const replyObj = {
  //     id: shortid.generate(),
  //     content: event.target[0].value,
  //     createdAt: "2 days ago",
  //     score: 0,
  //     replyingTo: repliedTo,
  //     user: {
  //       image: {
  //         png: juliusomo,
  //         webp: "./images/avatars/image-juliusomo.webp",
  //         alt: "image of Julius Omo",
  //       },
  //       username: "juliusomo",
  //     },
  //   };

  //   dataCtx.addSubReply(replyObj, replyId);
  // };

  // const updateReply = (updatedContent, replyId, subId) => {
  //   // dataCtx.updateReply(updatedContent, replyId, subId);
  //   console.log("hello");
  // };

  // const updateReplyHandler = (content, replyId, subId, event) => {
  //   event.preventDefault();

  //   if (event.target[0].value === " " || event.target[0].value.length < 0) {
  //     return null;
  //   }

  //   content = event.target[0].value;

  //   dataCtx.updateReply(content, replyId, subId);
  // };

  return (
    <ul className={classes["replies--ul"]}>
      {props.replies.map((reply) => (
        <li key={reply.id}>
          {(isCurrentUser = reply.user.username === props.currentUser)}

          <ReplyListItem
            isCurrentUser={isCurrentUser}
            score={reply.score}
            src={reply.user.image.png}
            alt={reply.user.image.alt}
            username={reply.user.username}
            createdAt={reply.createdAt}
            replyingTo={reply.replyingTo}
            replyTo={reply.replyingTo}
            content={reply.content}
            image={props.image}
            // onSubmit={SubmitReplyHandler.bind(
            //   null,
            //   reply.user.username,
            //   props.id
            // )}
            commentId={props.id}
            replyId={reply.id}

            // onUpdate={updateReplyHandler.bind(
            //   null,
            //   reply.user.username,
            //   props.id,
            //   reply.id
            // )}
          />
        </li>
      ))}
    </ul>
  );
};

export default RepliesList;
