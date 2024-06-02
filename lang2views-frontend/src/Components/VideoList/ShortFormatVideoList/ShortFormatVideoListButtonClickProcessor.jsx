import { createRoot } from "react-dom/client"
import ShortFormatVideoList from "./ShortFormatVideoList";

function ShortFormatVideoListButtonClickProcessor() {
    const rootElement = document.querySelector("#root");

    const root = createRoot(rootElement);

    root.render(<ShortFormatVideoList />);
}

export default ShortFormatVideoListButtonClickProcessor;