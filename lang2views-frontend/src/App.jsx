import ClientAndSampleCreationViews, { SampleAndClientCreationViews } from "./Pages/clientAndSampleCreationViews";
import Login from "./Components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import ClientVideoListContainer from "./Components/VideoList/ListContainer/ClientVideoListContainer";
import DeleteConfirmationPage from "./Components/Clients/DeleteConfirmationPage";
import AddClient from "./Components/Clients/AddClient";
import AddSample from "./Components/Sample-creation/AddSample";

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
            path="/processvideolist/:channelId"
            element={<ClientVideoListContainer />}
          />
        <Route
          path="/delete/:channelId"
          element={<DeleteConfirmationPage />}
        />
        <Route
          path="/add"
          element={<AddClient />}
        />
        <Route
            path="/clientsView"
            element={<ClientAndSampleCreationViews />}
        />
        <Route
            path="/sampleCreationView"
            element={<SampleAndClientCreationViews />}
        />
        <Route
            path="/addSample"
            element={<AddSample />}
        />
      </Routes>
    </>
  );
}

export default App;
