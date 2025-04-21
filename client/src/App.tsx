import "./App.css";
import Users from "./routes/Users";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
