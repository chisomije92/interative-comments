import React from "react";
import { DataCtxType } from "../components/interface-store/Interfaces";

const DataContext = React.createContext<DataCtxType>({
  data: {
    currentUser: {
      image: {
        png: "",
        webp: "",
      },
      username: "",
    },
    comments: [],
  },
  addReply: (reply, id) => {},
  addSubReply: (reply, id, subId) => {},
  addComment: (comment) => {},
  updateData: (updatedContent, id, subId) => {},
  increaseScore: (id, subId) => {},
  decreaseScore: (id, subId) => {},
  deleteData: (id, subId) => {},
});

export default DataContext;
