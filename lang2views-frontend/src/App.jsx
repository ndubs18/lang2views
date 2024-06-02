import Login from "./Components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import LongFormatVideoList from "./Components/VideoList/LongFormatVideoList/LongFormatVideoList.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/processvideolist"
          element={<LongFormatVideoList />}
        />
      </Routes>
    </>
  );
}

export default App;
