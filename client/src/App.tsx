import "./App.css";
import Users from "./routes/Users";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
