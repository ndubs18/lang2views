import React from 'react';

function CreateAccountPictureAndNameContainer(props) {
  if (props === null)
    throw new Error(
      'props for component CreateAccountPictureAndNameContainer is null'
    );

  if (props.accountPictureLink === null)
    throw new Error(
      'Account picture link for creating the account picture is null for the client page in component CreateAccountPictureAndNameContainer'
    );

  if (props.accountNameText === null)
    throw new error(
      'Account name text for creating a paragraph element is null for component CreateAccountPictureAndNameContainer'
    );

  return (
    <span className="d-flex flex-row justify-content-center account-picture-and-name">
      <img
        src={props.accountPictureLink}
        className="account-picture align-self-center rounded-circle"
      ></img>
      <p className="account-name align-self-center mb-0 mt-0">
        {props.accountNameText}
      </p>
    </span>
  );
}

export default CreateAccountPictureAndNameContainer;
