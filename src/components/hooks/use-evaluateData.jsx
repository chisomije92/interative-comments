import { useState } from "react";
import shortid from "shortid";
import timeData from "../../eval-time/TimeData";
import juliusomo from "../../images/avatars/image-juliusomo.png";

const useEvaluateData = (ctx, defaultValue, replyingToEdited) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [updatedReply, setUpdatedReply] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleReplyBox = () => {
    setShowReplyBox((prevState) => !prevState);
  };

  const toggleEditBox = () => {
    setShowEditBox((prevState) => !prevState);
  };

  const deleteData = () => {
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const confirmDeleteComment = (id) => {
    ctx.deleteData(id);

    setShowModal(false);
  };

  const confirmDeleteReply = (id, subId) => {
    ctx.deleteData(id, subId);
    setShowModal(false);
  };
  let content;

  const submitCommentDataHandler = (event) => {
    event.preventDefault();
    // console.log(event.target[0].value);
    // setEnteredValue(event.target[0].value);

    if (
      enteredValue.trim().length < 0 ||
      enteredValue === " " ||
      enteredValue === ""
    ) {
      return null;
    }

    const commentObj = {
      id: shortid.generate(),

      content: enteredValue,
      createdAtDate: timeData(),
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
    ctx.addComment(commentObj);
    setUpdatedReply(enteredValue);
    setEnteredValue("");
  };

  const submitData = (repliedTo, replyId, event) => {
    event.preventDefault();
    // content = event.target[0].value;
    if (
      enteredValue.length === 0 ||
      enteredValue === " " ||
      enteredValue === ""
    ) {
      return null;
    }

    // content = content.replace(defaultValue, "");
    const replyObj = {
      id: shortid.generate(),
      content: enteredValue,
      createdAtDate: timeData(),
      score: 0,
      replyingTo: repliedTo,
      user: {
        image: {
          png: juliusomo,
          webp: "./images/avatars/image-juliusomo.webp",
          alt: "image of Julius Omo",
        },
        username: "juliusomo",
      },
    };

    ctx.addReply(replyObj, replyId);
    setShowReplyBox(false);
    // setReply((prev) => prev + reply);
    // setUpdatedReply((prev) => [...prev, reply]);
    // setReply("");
  };

  const updateComment = (id, event) => {
    event.preventDefault();
    // setReply((prev) => prev + reply);
    // setUpdatedReply(reply);
    // content = event.target[0].value;
    if (updatedReply.trim().length === 0) {
      return null;
    }

    ctx.updateData(updatedReply, id);
    // setUpdatedReply((prev) => [...prev, reply]);
    setShowEditBox(false);
  };

  // const updateComment = (content, id, event) => {
  //   event.preventDefault();
  //   content = event.target[0].value;
  //   if (content.trim().length === 0) {
  //     return null;
  //   }
  //   ctx.updateData(content, id);

  //   setShowEditBox(false);
  // };

  const updateReply = (content, id, subId, event) => {
    event.preventDefault();
    content = event.target[0].value;
    if (content.trim().length === 0 || content === replyingToEdited) {
      return null;
    }
    content = content.replace(replyingToEdited, "");
    ctx.updateData(content, id, subId);
    setShowEditBox(false);
  };

  const increaseCommentScore = (id) => {
    ctx.increaseScore(id);
  };

  const decreaseCommentScore = (id) => {
    ctx.decreaseScore(id);
  };

  const increaseReplyScore = (id, subId) => {
    ctx.increaseScore(id, subId);
  };

  const decreaseReplyScore = (id, subId) => {
    ctx.decreaseScore(id, subId);
  };

  return {
    showReplyBox,
    showEditBox,
    showModal,
    enteredValue,
    updatedReply,
    setUpdatedReply,
    setEnteredValue,
    toggleEditBox,
    toggleReplyBox,
    deleteData,
    cancelDelete,
    confirmDeleteComment,
    confirmDeleteReply,
    submitCommentDataHandler,
    submitData,
    updateComment,
    updateReply,
    increaseCommentScore,
    decreaseCommentScore,
    increaseReplyScore,
    decreaseReplyScore,
  };
};

export default useEvaluateData;
