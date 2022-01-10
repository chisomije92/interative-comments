import React from "react";

const DataContext = React.createContext({
  data: {},
  addReply: (id, subId) => {},
  addComment: (id) => {},
  updateData: (updatedContent, id, subId) => {},
  increaseScore: (id, subId) => {},
  decreaseScore: (id, subId) => {},
  deleteData: (id, subId) => {},
});

export default DataContext;
