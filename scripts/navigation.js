const hamburger = document.querySelector("#menu-btn");
const navigation = document.querySelector("#main-nav");

hamburger.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.setAttribute(
        "aria-label", isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});
