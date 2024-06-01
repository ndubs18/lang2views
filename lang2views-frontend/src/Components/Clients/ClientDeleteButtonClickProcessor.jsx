import { createRoot } from "react-dom/client";
import { clientNameContext } from "../client-settings/clientNameContext";
import { clientIdContext } from "./clientIdContext";
import ClientAndSampleCreationViews from "../../Pages/clientAndSampleCreationViews";

function deleteButtonClickHandler() {
  fetch("http://localhost:3000/client/remove", {
    method: "POST",
    body: {
      url: clientIdContext.Provider,
    },
  })
    .then((response) => response.json())
    .then((value) => console.log(value));

  const root = document.querySelector("#root");
  const redirectToMainPageHook = createRoot(root);

  console.log(window.history.state)

  redirectToMainPageHook.render(<ClientAndSampleCreationViews />);
}

function ConfirmationPage() {
  return (
    <div className="d-flex flex-row justify-content-center mt-5">
      <div className="mb-4">
        <h2>
          Are you sure you want to delete Client {clientNameContext.Provider}
        </h2>
        <div className="d-flex flex-row justify-content-center">
          <button
            className="btn btn-primary"
            id="confirmDeleteClient"
            onClick={deleteButtonClickHandler}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function ClientDeleteButtonClickProcessor() {
  const root = document.querySelector("#root");
  const confirmationPageHook = createRoot(root);

  window.history.replaceState({}, "delete", "/delete");

  confirmationPageHook.render(<ConfirmationPage />);
}

export default ClientDeleteButtonClickProcessor;
