import ClientEntriesAndHeader from "./ClientEntriesAndHeader";
import Search from "../Utilities/Search";
import AccountSettingsButton from "../Utilities/AccoutSettingsButton";
import AddClientButton from "./AddClientButton";
import DropboxAuthButton from "../Utilities/DropboxAuthButton"
import "./clientsViewHeader.css";
import "./clientsViewSearchAndAddButton.css";
import "./otherClientsViewFunctionality.css";
import { useEffect, useState } from "react";

function ClientsView(props) {
  window.history.replaceState({}, "clientsView", "/clientsView");

  const [clientList, setClientList] = useState([]);

   useEffect(() => {
    fetch("http://localhost:3000/client/getAll", {
      method: "GET",
    }).then((response) =>
      response
        .json()
        .then((value) => setClientList(value))
        .catch((err) => {
          throw new Error(err);
        })
    );
  }, []);

  const headerData = [
    "NAME",
    "LONG FORMAT",
    "SHORTS",
    "PERCENTAGE DONE",
  ];
   /*const dataForTableBodyRow1 = {
    clientId: "12cd7",
    clientYoutubePictureLink: "src/Images/brown.png",
    clientName: "B",
    numLongFormatVideosDone: "2 of 5 videos",
    numShortsDone: "5 out of 5",
    percentageDone: 60,
  };
  const dataForTableBodyRow2 = {
    clientId: "12ce7",
    clientYoutubePictureLink: "src/Images/brown.png",
    clientName: "A",
    numLongFormatVideosDone: "2 of 5 videos",
    numShortsDone: "5 out of 5",
    percentageDone: 60,
  };

  const clientEntries = [
    dataForTableBodyRow1,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
    dataForTableBodyRow2,
  ];*/


  if (props === null) throw new Error("props for component clientView is null");

  if (props.currentUser === null)
    throw new Error("property: current user is null for component ClientView");


  return (
    <div id="clients-view">
      <div className="top-details">
        <h1 className="client-name">Client Account</h1>
        {/*<AccountSettingsButton
          accountPictureAndName={accountPictureAndNameSpanElement}
        />*/}
          </div>
      <div id="clients-view-functionality-container">
        <div id="client-search-and-add-client-button">
          <Search />
          <DropboxAuthButton />
          <AddClientButton />
        </div>
        <ClientEntriesAndHeader
          headerData={headerData}
          clientEntries={clientList}
        />
      </div>
      <div className="popup-and-close-area-container"></div>
    </div>
  );
}

export default ClientsView;
