import PostCreate from './components/PostCreate';
import './App.css';
import './index.css';
import ListPost from './components/ListPost';

function App() {
  return (
    <div className="App">
      This is a blog App
      <PostCreate/>
      <h1 className="font-bold text-lg">List of Posts</h1>
      <ListPost/>
    </div>
  );
}

export default App;

// what is export
