import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
// import TodoList from "./TodoList";
// import TodoForm from "./TodoForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/todos" element={<TodoList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
