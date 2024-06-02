import { createRoot } from "react-dom/client"
import LongFormatVideoList from "./LongFormatVideoList";

function LongFormatVideoListButtonClickProcessor() {
    const rootElement = document.querySelector("#root");

    const root = createRoot(rootElement);

    root.render(<LongFormatVideoList />);
}

export default LongFormatVideoListButtonClickProcessor;