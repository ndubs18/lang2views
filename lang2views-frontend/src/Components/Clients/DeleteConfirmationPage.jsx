import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../Utilities/Button";
import { alertError } from "../Utilities/Alert";

function DeleteConfirmationPage() {
    const [client, setClient] = useState(null);
    const { channelId } = useParams()

    useEffect(() => {
        fetch("http://localhost:3000/client/get", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
            }),
        }).then((response) => {
            response
                .json()
                .then((value) => { setClient(value); alertError(value.message) })
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }, []);

    const deleteButtonClickHandler = async () => {
        let result = await fetch("http://localhost:3000/client/remove", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
            }),
        }).then((response) => {
            return response
                .json()
                .catch((err) => {
                    throw new Error(err);
                });
        });

        document.getElementById("confirmDeleteClient").disabled = true;
        document.getElementById("result").textContent = `${result.message} Redirecting in 5 seconds....`
        window.setTimeout(function () {
            window.location.href = "/clientsView";
        }, 5000);
    }

    let channelName = "Loading..."
    if (client) {
        channelName = client.channelName
    }

    return (
        <div className="d-flex flex-row justify-content-center mt-5">
            <div className="mb-4">
                <h2>
                    Are you sure you want to delete Client {channelName}?
                </h2>
                <div className="d-flex flex-row justify-content-center">
                        <button className="btn btn-primary" id="confirmDeleteClient" onClick={deleteButtonClickHandler}>
                            Confirm
                        </button>
                    <Link to="/clientsView">
                        <Button classes="btn btn-primary" text={"Go back"} />
                    </Link>
                </div>
                <span id="result"></span>
            </div>
        </div>
    );
}

export default DeleteConfirmationPage;