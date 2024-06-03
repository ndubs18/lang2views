import AppLogo from "../Utilities/AppLogo";
import ClientsViewButton from "./ClientsViewButton";
import LogoutButton from "./LogoutButton";
import SampleCreationViewButton from "./SampleCreationViewButton";
import './sidebar.css';

function Sidebar(props) {
  return (
    <div id="sidebar" className="d-flex flex-column">
      <AppLogo />
          <ClientsViewButton default={props.default} />
          <SampleCreationViewButton default={props.default} />
      <LogoutButton />
    </div>
  );
}

export default Sidebar;