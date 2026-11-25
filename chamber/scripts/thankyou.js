const params = new URLSearchParams(window.location.search);

function displayInformation(parameter, elementId) {

    const value = params.get(parameter);

    const element = document.getElementById(elementId);

    if (element) {

        element.textContent = value || "Not provided";

    }

}

displayInformation("first-name", "display-first-name");

displayInformation("last-name", "display-last-name");

displayInformation("email", "display-email");

displayInformation("phone", "display-phone");

displayInformation("business", "display-business");

const timestamp = params.get("timestamp");

const timestampElement =
    document.getElementById("display-timestamp");

if (timestampElement && timestamp) {

    const date = new Date(timestamp);

    timestampElement.textContent =
        date.toLocaleString();

} else if (timestampElement) {

    timestampElement.textContent = "Not available";

}