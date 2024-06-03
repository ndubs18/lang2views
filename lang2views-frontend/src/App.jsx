import ClientAndSampleCreationViews from "./Pages/clientAndSampleCreationViews";
import Login from "./Components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import ClientVideoListContainer from "./Components/VideoList/ListContainer/ClientVideoListContainer";

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
