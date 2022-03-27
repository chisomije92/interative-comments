export interface DataObjType {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  comments: CommentObjType[];
}

export interface DataCtxMethodsType {
  addReply(reply: ReplyObjType, id: number): void;
  addSubReply(reply: ReplyObjType, id: number, subId?: number): void;
  addComment(comment: CommentObjType): void;
  updateData(updatedContent: string, id: number, subId?: number): void;
  increaseScore(id: number, subId?: number): void;
  decreaseScore(id: number, subId?: number): void;
  deleteData(id: number, subId?: number): void;
}

export interface DataCtxType extends DataCtxMethodsType {
  // data: {
  //   currentUser: {
  //     image: {
  //       png: string;
  //       webp: string;
  //     };
  //     username: string;
  //   };
  //   comments: CommentObjType[];
  // };
  data: DataObjType;

  //   addReply(reply: ReplyObjType, id: string): void;
  //   addComment(comment: CommentObjType): void;
  //   updateData(updatedContent: string, id: string, subId?: string): void;
  //   increaseScore(id: string, subId?: string): void;
  //   decreaseScore(id: string, subId?: string): void;
  //   deleteData(id: string, subId?: string): void;
}

export interface ReplyObjType {
  id: number;
  content: string;
  createdAt?: string;
  createdAtDate?: string;
  replyingTo: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
      alt: string;
    };
    username: string;
  };
}

export interface CommentObjType {
  id: number;
  content: string;
  createdAt?: string;
  createdAtDate?: string;
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
