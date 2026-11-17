async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members");
        }

        const data = await response.json();
        const members = data.members;

        const eligibleMembers = members.filter(member =>
            member.membershipLevel === "Gold" ||
            member.membershipLevel === "Silver"
        );

        const shuffledMembers = [...eligibleMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];
        }

        const numberToDisplay = Math.min(
            shuffledMembers.length,
            Math.random() < 0.5 ? 2 : 3
        );

        const selectedMembers = shuffledMembers.slice(
            0,
            numberToDisplay
        );

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Spotlight error:", error);
    }
}

function displaySpotlights(members) {

    const container = document.querySelector("#spotlight-container");

    if (!container) {
        console.error("Spotlight container not found");
        return;
    }

    container.innerHTML = "";

    members.forEach(member => {

        container.innerHTML += `
            <article class="spotlight-card">

                <h3>${member.name}</h3>

                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                >

                <p>Phone: ${member.phone_number}</p>

                <p>Address: ${member.addresses}</p>

                <p>
                    Website:
                    <a href="${member.website_url}" target="_blank">
                        Visit Website
                    </a>
                </p>

                <p>
                    Membership:
                    ${member.membershipLevel}
                </p>

            </article>
        `;
    });
}

getSpotlights();