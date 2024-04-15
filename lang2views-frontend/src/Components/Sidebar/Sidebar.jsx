import AppLogo from "../Utilities/AppLogo";
import ClientsViewButton from "./ClientsViewButton";
import LogoutButton from "./LogoutButton";
import SampleCreationViewButton from "./SampleCreationViewButton";
import './sidebar.css';

function Sidebar() {
  return (
    <div id="sidebar" className="d-flex flex-column">
      <AppLogo />
      <ClientsViewButton />
      <SampleCreationViewButton />
      <LogoutButton />
    </div>
  );
}

export default Sidebar;