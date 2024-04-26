// needs work

import SampleCreationEntriesAndHeader from './SampleCreationEntriesAndHeader';
import SampleCreationViewSearch from './SampleCreationViewSearch';
import AccountSettingsButton from '../Utilities/AccoutSettingsButton';
import AddSampleButton from './AddSampleButton';
import CreateAccountPictureAndNameContainer from '../Utilities/CreateAccountPictureAndNameContainer';
import "./sampleCreationHeader.css";
import "../Utilities/views.css";
import "./sampleCreationSearchAndAddButton.css";
import "./otherSampleCreationViewFunctionality.css";

function SampleCreationView(props) {

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
  const videoEntries = [
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
    throw new Error("props for component SampleCreationView is null");

  const accountPictureAndNameSpanElement = CreateAccountPictureAndNameContainer(
    { accountNameText: props.currentUser, accountPictureLink: accountPictureLink }
  );

  return (
      <div id="sample-creation-view">
        <div
          id="sample-creation-view-header"
          className="d-flex flex-row justify-content-between"
        >
          <h1 className="page-name text-secondary fw-bold">Sample creation</h1>
          <AccountSettingsButton
            accountPictureAndName={accountPictureAndNameSpanElement}
          />
        </div>
        <div id="sample-creation-view-functionality-container">
          <div id="sample-creation-view-search-and-add-button">
            <SampleCreationViewSearch />
            <AddSampleButton />
          </div>
          <SampleCreationEntriesAndHeader
            headerData={headerData}
            sampleCreationEntries={videoEntries}
          />
        </div>
      </div>
  );
}

export default SampleCreationView;
