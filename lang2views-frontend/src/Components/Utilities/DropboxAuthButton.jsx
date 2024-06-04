import Button from './Button'

function DropboxAuthButton() {
    const dropboxHandler = async () => {
        fetch("http://localhost:3000/dropbox/auth", {
            method: "GET",
        }).then((response) =>
            response
                .json()
                .then((value) => window.open(value.authUrl, '_blank'))
                .catch((err) => {
                    throw new Error(err);
                })
        )
    };

    return <Button classes={"btn btn-primary"} text={"Authenticate Dropbox"} handleClick={dropboxHandler} />
}

export default DropboxAuthButton;