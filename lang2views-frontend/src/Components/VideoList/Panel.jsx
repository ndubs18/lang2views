import DefaultChannelIcon from "../../Icons/profile.svg";
import "./Panel.css";

function Panel({ channelName, children, videoName }) {
    /*
    const [organizeData, setOrganizeData] = useState("");
    const { isOrganizeVisible, setIsOrganizeVisible } = useGlobalContext();
    let dropboxUrl = ""
    let scriptUrl = ""
    let trelloUrl = ""
    let videoName = ""

    const organizeVideo = async () => {
        fetch("http://localhost:3000/client/organizeVideo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                videoId: video.id,
                lang: "es",
            }),
        }).then((response) => {
            response
                .json()
                .then((value) => setOrganizeData(value))
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }

    if (organizeData) {
        dropboxUrl = organizeData.dropboxUrl;
        scriptUrl = organizeData.scriptUrl;
        trelloUrl = organizeData.trelloUrl;
    }

    if (video) {
        videoName = video.name
    }

    if (!isOrganizeVisible) return null;
    function toggleOrganizeModal() {
        if (isOrganizeVisible) {
            setIsOrganizeVisible(false);
        } else {
            setIsOrganizeVisible(true);
        }
    }
    */

    return (
        <div className="panel-overlay">
            <div className="panel-content">
                <div className="long-format-video-list">
                    <div className="top-details">
                        <p className="client-name">Video Information</p>{" "}
                        <p className="video-list-header"></p>
                    </div>
                    <div className="video-list-tabs">
                        <p className="panel-video-name">{videoName}</p>
                    </div>
                    <hr />
                    <div className="icon-with-channel-name-content">
                        <div className="default-channel-icon-div">
                            <img
                                className="default-channel-icon"
                                src={DefaultChannelIcon}
                                alt="Default channel icon"
                            />
                        </div>
                        <p className="channel-name">{channelName}</p>
                    </div>
                    <hr />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Panel;
