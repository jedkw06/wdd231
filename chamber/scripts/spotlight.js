Math.random()

async function getSpotlight() {
    try {
        const response = await fetch("data/members.json")

        const members = await response.json();

        const eligibleMembers = members.filter(member =>
            member.membershiplevel === 3 ||
            member.membershipLevel === 2
        )

        console.log(members);
    } catch (error) {
        console.error("error loading members:", error);
    }


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

const selectedMembers = shuffledMembers.slice(0, numberToDisplay);


function displaySpotlights(members) {

    const container = document.querySelector("#spotlight-container");

    container.innerHTML = "";

    members.forEach(member => {

        container.innerHTML += `
            <article class="spotlight-card">

                <h3>${member.name}</h3>

                <img src="${member.image}"
                     alt="${member.name} logo">

                <p>Phone: ${member.phone_number}</p>

                <p>Address: ${member.address}</p>

                <p>
                    Website:
                    <a href="${member.website_url}">
                        Visit Website
                    </a>
                </p>

                <p>Membership: ${member.membershipLevel}</p>

            </article>
        `;

    });

} displaySpotlights(selectedMembers);
async function getSpotlights() {

    try {

        // 1. Fetch the JSON data
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members");
        }

        const members = await response.json();

        // 2. Filter Gold and Silver members
        const eligibleMembers = members.filter(member =>
            member.membershipLevel === "Gold" ||
            member.membershipLevel === "Silver"
        );

        // 3. Shuffle the members
        const shuffledMembers = [...eligibleMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];

        }

        // 4. Randomly select 2 or 3
        const numberToDisplay = Math.min(
            shuffledMembers.length,
            Math.random() < 0.5 ? 2 : 3
        );

        const selectedMembers = shuffledMembers.slice(
            0,
            numberToDisplay
        );

        // 5. Display the cards
        displaySpotlights(selectedMembers);

    } catch (error) {

        console.error("Spotlight error:", error);

    }

}
}

getSpotlights();