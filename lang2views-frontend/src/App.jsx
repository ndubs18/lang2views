import ClientAndSampleCreationViews from "./Pages/clientAndSampleCreationViews";
import { GlobalContextProvider } from "./Context/globalContext.jsx";
import Login from "./Components/Login/Login.jsx";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import LongFormatVideoList from "./Components/VideoList/LongFormatVideoList/LongFormatVideoList";
import SampleCreationEntriesAndHeader from "./Components/Sample-creation/SampleCreationEntriesAndHeader.jsx";

function App() {
  return (
    <>
        <Routes>
        <Route
            path=""
            element={<Login />}
          />
        <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/processvideolist"
            element={<LongFormatVideoList />}
          />
        </Routes>
    </>
  );
}

export default App;
