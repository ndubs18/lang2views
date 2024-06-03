import "../../save.css";
import storeSelectedVideos from "./StoreSelectedVideos";


function StepSave({ channelId }) {
    function handleSubmit() {
        storeSelectedVideos();
        const currentVideosForProcessingContainer = document.querySelector(
            "#videos-for-processing-json"
        );
        const currentVideosForProcessing = JSON.parse(
            currentVideosForProcessingContainer.textContent
        );
        for (let i = 0; i < currentVideosForProcessing.length; ++i) {
            console.log("wtf")
            console.log(currentVideosForProcessing[i])
            console.log("body")
            console.log(JSON.stringify({
                channelId: channelId,
                video: currentVideosForProcessing[i]
            }))
            fetch("http://localhost:3000/client/addVideo", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    channelId: channelId,
                    video: currentVideosForProcessing[i]
                }),
            }).then((response) => {
                console.log(response)
            });
        }
    }

  return (
    <button
      id="save"
      className="btn btn-primary"
      onClick={handleSubmit}
    >
      Save
    </button>
  );
}

export default StepSave;
