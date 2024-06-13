import ClientsView from "../Components/Clients/ClientsView";
import SampleView from "../Components/Sample-creation/SampleCreationView";
import Sidebar from "../Components/Sidebar/Sidebar";
import ClientsViewButton from "../Components/Sidebar/ClientsViewButton";
import SampleCreationViewButton from "../Components/Sidebar/SampleCreationViewButton";
import "../Components/Utilities/viewContainer.css";
import "../Components/Utilities/main.css";

const children = (defaultValue) => {
    return (<>
        <ClientsViewButton default={defaultValue} />
        <SampleCreationViewButton default={defaultValue} />
    </>)
}


//Renders the Client Page.
function ClientAndSampleCreationViews() {
  return (
    <div className="main">
      <Sidebar>{children("client")}</Sidebar>
      <div id="view-container">
        <ClientsView currentUser={"Alexander"}/>
      </div>
    </div>
  );
}

//Renders the Sample Page.
export function SampleAndClientCreationViews() {

    return (
        <div className="main">
            <Sidebar>{children("sample")}</Sidebar>
            <div id="view-container">
                <SampleView currentUser={"Alexander"} />
            </div>
        </div>
    );
}

export default ClientAndSampleCreationViews;