const timestampField = document.querySelector("#timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const modalButtons = document.querySelectorAll(".modal-link");

modalButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;

        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }

    });

});

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }

    });

});

document.querySelectorAll("dialog").forEach((modal) => {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            modal.close();
        }

    });

});