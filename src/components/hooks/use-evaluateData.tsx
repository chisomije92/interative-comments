import React, { useState } from "react";
import shortid from "shortid";
import timeData from "../../eval-time/TimeData";
import juliusomo from "../../images/avatars/image-juliusomo.png";
import {
  DataCtxMethodsType,
  ReplyObjType,
} from "../interface-store/Interfaces";

const useEvaluateData = (
  // ctx : DataContextType,
  // ctx: {
  //   deleteData: (id: string, subId?: string) => void;
  //   addComment: (commentObj: CommentObjType) => void;
  //   addReply: (replyObj: ReplyObjType, replyId: string) => void;
  //   increaseScore(id: string, subId?: string): void;
  //   decreaseScore(id: string, subId?: string): void;
  //   updateData(updatedContent: string, id: string, subId?: string): void;
  // },
  ctx: DataCtxMethodsType,
  replyingToEdited?: string
) => {
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

  const confirmDeleteComment = (id: number) => {
    ctx.deleteData(id);

    setShowModal(false);
  };

  const confirmDeleteReply = (id: number, subId: number) => {
    ctx.deleteData(id, subId);
    setShowModal(false);
  };
  // let content;

  const submitCommentDataHandler = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
      id: Math.random() * Date.now(),

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

  const submitData = (
    repliedTo: string,
    replyId: number,
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
    const replyObj: ReplyObjType = {
      id: Math.random() * Date.now(),
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
    setEnteredValue("");
  };

  const submitSubData = (
    repliedTo: string,
    replyId: number,
    subId: number,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      enteredValue.length === 0 ||
      enteredValue === " " ||
      enteredValue === ""
    ) {
      return null;
    }

    const replyObj: ReplyObjType = {
      id: Math.random() * Date.now(),
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

    ctx.addSubReply(replyObj, replyId, subId);

    setShowReplyBox(false);

    setEnteredValue("");
  };

  const updateComment = (
    id: number,
    event: React.FormEvent<HTMLFormElement>
  ) => {
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

  const updateReply = (
    content: string,
    id: number,
    subId: number,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    content = event.target[0].value;
    if (content.trim().length === 0 || content === replyingToEdited) {
      return null;
    }
    content = content.replace(replyingToEdited, "");
    ctx.updateData(content, id, subId);
    setShowEditBox(false);
  };

  const increaseCommentScore = (id: number) => {
    ctx.increaseScore(id);
  };

  const decreaseCommentScore = (id: number) => {
    ctx.decreaseScore(id);
  };

  const increaseReplyScore = (id: number, subId: number) => {
    ctx.increaseScore(id, subId);
  };

  const decreaseReplyScore = (id: number, subId: number) => {
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
    submitSubData,
    updateComment,
    updateReply,
    increaseCommentScore,
    decreaseCommentScore,
    increaseReplyScore,
    decreaseReplyScore,
  };
};

export default useEvaluateData;
