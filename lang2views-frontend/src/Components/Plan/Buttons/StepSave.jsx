import "../save.css";
import storeSelectedVideos from "./StoreSelectedVideos";


function StepSave({ channelId }) {
    async function handleSubmit() {
        storeSelectedVideos();
        const currentVideosForProcessingContainer = document.querySelector(
            "#videos-for-processing-json"
        );
        const currentVideosForProcessing = JSON.parse(
            currentVideosForProcessingContainer.textContent
        );
        for (let i = 0; i < currentVideosForProcessing.length; ++i) {
            let response = await fetch("http://localhost:3000/client/addVideo", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    channelId: channelId,
                    video: currentVideosForProcessing[i]
                }),
            }).then((response) => {
                return response
                    .json()
                    .catch((error) => console.error(error))
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
