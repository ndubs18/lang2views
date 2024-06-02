import Login from "./Components/Login/login.jsx";
import { Routes, Route } from "react-router-dom";
import LongFormatVideoList from "./Components/VideoList/LongFormatVideoList/longFormatVideoList.jsx";
import AddClient from "./Components/Clients/AddClient.jsx";
import ClientsView from "./Components/Clients/ClientsView.jsx";
import ClientAndSampleCreationViews from "./Pages/clientAndSampleCreationViews.jsx";

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
        <Route
          path="/add"
          element={<ClientAndSampleCreationViews />}
        />
        <Route
          path="/clientsView"
          element={<ClientAndSampleCreationViews />}
        />
      </Routes>
    </>
  );
}

export default App;
