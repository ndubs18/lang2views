import AppLogo from "../Utilities/AppLogo";
import LogoutButton from "./LogoutButton";
import './sidebar.css';

function Sidebar({ children }) {
  return (
    <div id="sidebar" className="d-flex flex-column">
      <AppLogo />
      {children}
      <LogoutButton />
    </div>
  );
}

export default Sidebar;