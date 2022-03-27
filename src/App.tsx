import "./App.css";
import CommentsList from "./components/comments/Commentslist";

const App: React.FC = () => {
  return (
    <main className="main">
      <CommentsList />
    </main>
  );
};

export default App;
