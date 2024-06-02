import ClientAndSampleCreationViews from "./Pages/clientAndSampleCreationViews";
import { GlobalContextProvider } from "./Context/globalContext.jsx";
import Login from "./Components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import LongFormatVideoList from "./Components/VideoList/LongFormatVideoList/LongFormatVideoList";
import ClientsView from "./Components/Clients/ClientsView";

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
