import ClientAndSampleCreationViews from "./Pages/clientAndSampleCreationViews";
import LongFormatVideoList from "./Components/VideoList/LongFormatVideoList/longFormatVideoList";
import ShortFormatVideoList from "./Components/VideoList/ShortFormatVideoList/shortFormatVideoList";
import LoginPage from "./Pages/login";
import Organize from "./Components/VideoList/Organize/Organize";
import PostProduction from "./Components/VideoList/PostProduction/PostProduction";
import Upload from "./Components/VideoList/Upload/Upload";

function App() {
  return (
    <>
          {/*<LoginPage />*/}
      <ClientAndSampleCreationViews />
      {/*<LongFormatVideoList />*/}
    </>
  );
}

export default App;
