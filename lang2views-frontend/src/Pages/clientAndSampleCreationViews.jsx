import ClientsView from "../Components/Clients/ClientsView";
import SampleView from "../Components/Sample-creation/SampleCreationView";
import Sidebar from "../Components/Sidebar/Sidebar";
import "../Components/Utilities/viewContainer.css";
import "../Components/Utilities/main.css";

//Renders the Client Page.
function ClientAndSampleCreationViews() {
  return (
    <div className="d-flex flex-row main">
      <Sidebar default="client"/>
      <div id="view-container">
        <ClientsView currentUser={"Alexander"}/>
      </div>
    </div>
  );
}

//Renders the Sample Page.
export function SampleAndClientCreationViews() {

    return (
        <div className="d-flex flex-row main">
            <Sidebar default="sample"/>
            <div id="view-container">
                <SampleView currentUser={"Alexander"} />
            </div>
        </div>
    );
}

export default ClientAndSampleCreationViews;