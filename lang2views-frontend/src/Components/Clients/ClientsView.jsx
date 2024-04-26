import ClientEntriesAndHeader from './ClientEntriesAndHeader';
import ClientsViewSearch from './ClientsViewSearch';
import AccountSettingsButton from '../Utilities/AccoutSettingsButton';
import AddClientButton from './AddClientButton';
import './clientsViewHeader.css';
import './clientsViewSearchAndAddButton.css';
import './otherClientsViewFunctionality.css';
import "../Utilities/views.css";
import CreateAccountPictureAndNameContainer from '../Utilities/CreateAccountPictureAndNameContainer';

function ClientsView(props) {

  const headerData = [
    '',
    'NAME',
    'LONG FORMAT',
    'SHORTS',
    'PERCENTAGE DONE',
    '',
    '',
    '',
    '',
  ];
  const dataForTableBodyRow1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const dataForTableBodyRow2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
  ];
  const accountPictureLink = 'src/Images/brown.png';

  if (props === null)
    throw new Error("props for component clientView is null");

    if (props.currentUser === null)
      throw new Error("property: current user is null for component ClientView");

  const accountPictureAndNameSpanElement = CreateAccountPictureAndNameContainer(
    { accountNameText: props.currentUser, accountPictureLink: accountPictureLink }
  );

  return (
      <div id="clients-view">
        <div
          id="clients-view-header"
          className="d-flex flex-row justify-content-between"
        >
          <h1 className="page-name text-secondary fw-bold">Client Account</h1>
          <AccountSettingsButton
            accountPictureAndName={accountPictureAndNameSpanElement}
          />
        </div>
        <div id="clients-view-functionality-container">
          <div id="client-search-and-add-client-button">
            <ClientsViewSearch />
            <AddClientButton />
          </div>
          <ClientEntriesAndHeader
            headerData={headerData}
            clientEntries={clientEntries}
          />
        </div>
        <div className='popup-and-close-area-container'></div>
      </div>
  );
}

export default ClientsView;
