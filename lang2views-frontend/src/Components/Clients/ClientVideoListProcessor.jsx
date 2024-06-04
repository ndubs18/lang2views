import { createRoot } from "react-dom/client";
import { Navigate } from "react-router-dom";
import LongFormatVideoList from "../VideoList/LongFormatVideoList/LongFormatVideoList";

function ClientVideoListProcessor() {
    const root = document.querySelector("#root");
      const addClientHook = createRoot(root);

      addClientHook.render(<LongFormatVideoList />);
}

export default ClientVideoListProcessor;