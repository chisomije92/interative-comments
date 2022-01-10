import { useState } from "react";
import shortid from "shortid";
import TimeData from "../../eval-time/TimeData";
import juliusomo from "../../images/avatars/image-juliusomo.png";

const useEvaluateData = (ctx, defaultValue, replyingToEdited) => {
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

  const submitData = (repliedTo, replyId, event) => {
    event.preventDefault();
    content = event.target[0].value;
    if (content.trim().length === 0 || content === defaultValue) {
      return null;
    }

    content = content.replace(defaultValue, "");
    const replyObj = {
      id: shortid.generate(),
      content: content,
      createdAtDate: TimeData(),
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
  };

  const updateComment = (content, id, event) => {
    event.preventDefault();
    content = event.target[0].value;
    if (content.trim().length === 0) {
      return null;
    }
    ctx.updateData(content, id);

    setShowEditBox(false);
  };

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
    toggleEditBox,
    toggleReplyBox,
    deleteData,
    cancelDelete,
    confirmDeleteComment,
    confirmDeleteReply,
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
