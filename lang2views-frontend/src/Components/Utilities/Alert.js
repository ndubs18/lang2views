export function alertError(message) {
    if (message.includes("Error")) {
        window.alert(message);
    }
}