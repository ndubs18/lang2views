import ClientsView from "../Components/Clients/ClientsView";
import Sidebar from "../Components/Sidebar/Sidebar";
import "../Components/Utilities/viewContainer.css";
import "../Components/Utilities/main.css";

function ClientAndSampleCreationViews() {
  return (
    <div className="d-flex flex-row main">
      <Sidebar />
      <div id="view-container">
        <ClientsView currentUser={"Alexander"}/>
      </div>
    </div>
  );
}

export default ClientAndSampleCreationViews;