import data from "../data/data";
import DataContext from "./data-context";
import { useEffect, useReducer } from "react";
import {
  CommentObjType,
  DataCtxType,
  DataObjType,
  ReplyObjType,
} from "../components/interface-store/Interfaces";

const defaultDataState: {
  data: DataObjType;
  // data: {
  //   currentUser: {
  //     image: {
  //       png: string;
  //       webp: string;
  //     };
  //     username: string;
  //   };
  // comments: {
  //   id: number | string;
  //   content: string;
  //   createdAt: string;
  //   createdAtDate?: string;
  //   score: number;
  //   user: {
  //     image: {
  //       png: string;
  //       webp: string;
  //       alt: string;
  //     };
  //     username: string;
  //   };
  //   replies: ReplyObjType[];
  // }[];
  // comments: CommentObjType[];
  // };
} = {
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

const dataReducer = (
  state: { data: DataObjType },
  action: {
    type: string;
    id?: number;
    subId?: number;
    reply?: ReplyObjType;
    updatedContent?: string;
    commentData?: CommentObjType;
    replyData?: ReplyObjType;
  }
) => {
  switch (action.type) {
    case "ADD_REPLY": {
      let updatedData = Object.assign({}, state.data);

      let { comments } = updatedData;
      // console.log(comments);
      const existingIdIndex = comments.findIndex(
        (item) => item.id === action.id
      );

      comments[existingIdIndex].replies.push(action.reply);

      // if (action.subId) {
      // const existingSubIdIndex = comments.findIndex(
      //   (item) => item.id === action.id
      // );

      // comments[existingSubIdIndex].replies.push(action.replyData);
      // }

      return {
        data: updatedData,
      };
    }

    case "ADD_SUBREPLY": {
      let updatedData = Object.assign({}, state.data);
      let { comments } = updatedData;

      const existingIdIndex = comments.findIndex(
        (item) => item.id === action.id
      );
      comments[existingIdIndex].replies.push(action.reply);

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

const DataProvider: React.FC = (props) => {
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

  const addSubReplyToData = (
    reply: ReplyObjType,
    id: number,
    subId: number
  ) => {
    dispatchDataAction({
      type: "ADD_SUBREPLY",
      reply: reply,
      id: id,
      subId: subId,
    });
  };

  const addCommentToData = (commentData: CommentObjType) => {
    dispatchDataAction({ type: "ADD_COMMENT", commentData: commentData });
  };

  const updateData = (updatedContent: string, id: number, subId: number) => {
    dispatchDataAction({ type: "UPDATE", updatedContent, id, subId });
  };

  const increaseScore = (id: number, subId: number) => {
    dispatchDataAction({ type: "INCREASE_SCORE", id, subId });
  };

  const decreaseScore = (id: number, subId: number) => {
    dispatchDataAction({ type: "DECREASE_SCORE", id, subId });
  };

  const deleteData = (id: number, subId: number) => {
    dispatchDataAction({ type: "DELETE", id, subId });
  };

  const dataContext: DataCtxType = {
    data: dataState.data,
    addReply: addReplyToData,
    addSubReply: addSubReplyToData,
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
