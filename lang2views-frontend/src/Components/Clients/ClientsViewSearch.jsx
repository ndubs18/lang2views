import { createRoot } from "react-dom/client";
import ClientsView from "./ClientsView";

function handleKeyPress(event) {
  if (event.key === "Enter") {
    const clientSearchInput = document.querySelector("#client-search-input");

    const viewContainer = document.querySelector("#view-container");
    const clientsViewRoot = createRoot(viewContainer);

    clientsViewRoot.render(<ClientsView searchExpression={clientSearchInput.value}/>)
  }
}

function ClientsViewSearch() {
  const searchLogo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      className="d-block mx-auto my-auto bi bi-search"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
  );

  const searchInput = (
    <input id="client-search-input" onKeyDown={(event) => {handleKeyPress(event)}}></input>
  );

  const searchContainer = (
    <div
      className="border rounded border-secondary"
      id="client-search-container"
    >
      {searchLogo}
      {searchInput}
    </div>
  );

  return searchContainer;
}

export default ClientsViewSearch;
