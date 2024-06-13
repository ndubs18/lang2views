import DefaultChannelIcon from "../../Icons/profile.svg";
import "./Panel.css";

function Panel({ channelName, children, panelName, videoName }) {

    return (
        <div className="panel-overlay">
            <div className="panel-content">
                <div className="long-format-video-list">
                    <div className="top-details">
                        <p className="video-list-header">Video Information</p>{" "}
                        <p className="video-list-header">{panelName}</p>
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
