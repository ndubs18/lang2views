import SampleCreationEntriesAndHeader from './SampleCreationEntriesAndHeader';
import SampleCreationViewSearch from './SampleCreationViewSearch';
import AccountSettingsButton from '../Utilities/AccoutSettingsButton';
import AddSampleButton from './AddSampleButton';
import CreateAccountPictureAndNameContainer from '../Utilities/CreateAccountPictureAndNameContainer';
import "./sampleCreationHeader.css";
import "./sampleCreationSearchAndAddButton.css";
import "./otherSampleCreationViewFunctionality.css";
import { useEffect, useState } from 'react';

function SampleCreationView(props) {
  window.history.replaceState({}, "sampleCreationView", "/sampleCreationView");

  const [sampleVideos, setSampleVideos] = useState([]);

  const headerData = [
    "NAME",
    "VIDEO TYPE",
    "THUMBNAIL",
    "",
    "",
    "",
    "",
    "",
  ];

  /* const dataForTableBodyRow1 = {
    name: 'A',
    videoType: "Long format",
    thumbnailLink: "src/Images/brown.png",
  }

  const dataForTableBodyRow2 = {
    name: 'A',
    videoType: "Short",
    thumbnailLink: "src/Images/brown.png",
  }

  const sampleVideosManual = [
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
  ]; */

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
            sampleCreationEntries={sampleVideos}
          />
        </div>
      <div className="popup-and-close-area-container"></div>
      </div>
  );
}

export default SampleCreationView;
