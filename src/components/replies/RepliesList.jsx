import classes from "./RepliesList.module.css";
import formatTime from "../../eval-time/FormatTime";
import ReplyListItem from "./ReplyListItem";

const RepliesList = (props) => {
  let isCurrentUser;

  return (
    <ul className={classes["replies--ul"]}>
      {props.replies.map((reply) => (
        <li key={reply.id}>
          {(isCurrentUser = reply.user.username === props.currentUser)}
          <ReplyListItem
            isCurrentUser={isCurrentUser}
            score={reply.score}
            createdAtUser={reply.createdAt}
            src={reply.user.image.png}
            alt={reply.user.image.alt}
            username={reply.user.username}
            createdAtDate={
              reply.createdAt ? "2 days ago" : formatTime(reply.createdAtDate)
            }
            replyingTo={reply.replyingTo}
            replyingToEdited={`@${reply.replyingTo}`}
            content={reply.content}
            image={props.image}
            commentId={props.id}
            replyId={reply.id}
            defaultValue={`@${reply.user.username}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default RepliesList;
