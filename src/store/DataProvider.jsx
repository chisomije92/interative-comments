import data from "../data/data";
import DataContext from "./data-context";
import { useEffect, useReducer } from "react";

const defaultDataState = {
  data: data,
};

const initializer = (initialValue = defaultDataState) => {
  const storedData = JSON.parse(localStorage.getItem("data"));

  if (!storedData) {
    return initialValue;
  }

  if (storedData) {
    return {
      data: storedData,
    };
  }
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_REPLY": {
      let updatedData = Object.assign({}, state.data);

      let { comments } = updatedData;

      const existingIdIndex = comments.findIndex(
        (item) => item.id === action.id
      );
      comments[existingIdIndex].replies.push(action.reply);

      if (action.subId) {
        const existingSubIdIndex = comments.findIndex(
          (item) => item.id === action.id
        );

        comments[existingSubIdIndex].replies.push(action.replyData);
      }

      return {
        data: updatedData,
      };
    }

    case "ADD_COMMENT": {
      let updatedData = Object.assign({}, state.data);

      let { comments } = updatedData;

      comments.push(action.commentData);

      return {
        data: updatedData,
      };
    }

    case "UPDATE": {
      let updatedData = Object.assign({}, state.data);

      let { comments } = updatedData;

      const existingId = comments.findIndex((item) => item.id === action.id);

      if (!action.subId) {
        comments[existingId].content = action.updatedContent;
      }

      if (action.subId) {
        let replyData = comments[existingId];
        let replyId = replyData.replies.findIndex(
          (item) => item.id === action.subId
        );
        comments[existingId].replies[replyId].content = action.updatedContent;
      }
      return {
        data: updatedData,
      };
    }

    case "INCREASE_SCORE": {
      let updatedData = Object.assign({}, state.data);
      let { comments } = updatedData;
      const existingId = comments.findIndex((item) => item.id === action.id);
      if (!action.subId) {
        comments[existingId].score = comments[existingId].score + 1;
      }

      if (action.subId) {
        let replyData = comments[existingId];
        let replyId = replyData.replies.findIndex(
          (item) => item.id === action.subId
        );
        comments[existingId].replies[replyId].score =
          comments[existingId].replies[replyId].score + 1;
      }

      return {
        data: updatedData,
      };
    }

    case "DECREASE_SCORE": {
      let updatedData = Object.assign({}, state.data);
      let { comments } = updatedData;
      const existingId = comments.findIndex((item) => item.id === action.id);
      if (!action.subId) {
        comments[existingId].score = comments[existingId].score - 1;
        if (comments[existingId].score < 1) {
          comments[existingId].score = 0;
        }
      }

      if (action.subId) {
        let replyData = comments[existingId];
        let replyId = replyData.replies.findIndex(
          (item) => item.id === action.subId
        );
        comments[existingId].replies[replyId].score =
          comments[existingId].replies[replyId].score - 1;
        if (comments[existingId].replies[replyId].score < 1) {
          comments[existingId].replies[replyId].score = 0;
        }
      }

      return {
        data: updatedData,
      };
    }

    case "DELETE": {
      let updatedData = Object.assign({}, state.data);
      let { comments } = updatedData;

      if (!action.subId) {
        const updatedComments = comments.filter(
          (item) => item.id !== action.id
        );
        updatedData.comments = updatedComments;
      }

      if (action.subId) {
        const existingIdIndex = comments.findIndex(
          (item) => item.id === action.id
        );
        let updatedReplies = comments[existingIdIndex].replies.filter(
          (item) => item.id !== action.subId
        );
        comments[existingIdIndex].replies = updatedReplies;
      }

      return {
        data: updatedData,
      };
    }
    default:
      return defaultDataState;
  }
};

const DataProvider = (props) => {
  const [dataState, dispatchDataAction] = useReducer(
    dataReducer,
    defaultDataState,
    initializer
  );
  const { data } = dataState;

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addReplyToData = (reply, id) => {
    dispatchDataAction({
      type: "ADD_REPLY",
      reply: reply,
      id: id,
    });
  };

  const addCommentToData = (commentData) => {
    dispatchDataAction({ type: "ADD_COMMENT", commentData: commentData });
  };

  const updateData = (updatedContent, id, subId) => {
    dispatchDataAction({ type: "UPDATE", updatedContent, id, subId });
  };

  const increaseScore = (id, subId) => {
    dispatchDataAction({ type: "INCREASE_SCORE", id, subId });
  };

  const decreaseScore = (id, subId) => {
    dispatchDataAction({ type: "DECREASE_SCORE", id, subId });
  };

  const deleteData = (id, subId) => {
    dispatchDataAction({ type: "DELETE", id, subId });
  };

  const dataContext = {
    data: dataState.data,
    addReply: addReplyToData,
    addComment: addCommentToData,
    updateData,
    increaseScore,
    decreaseScore,
    deleteData,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
