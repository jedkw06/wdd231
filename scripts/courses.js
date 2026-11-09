const courses = [
  {
    subject: "WDD",
    number: 231,
    credits: 2,
    completed: false
  },
  {
    subject: "CSE",
    number: 210,
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 110,
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 131,
    credits: 2,
    completed: true
  }
];

const courseList = document.querySelector("#item-container");
const creditTotal = document.querySelector("#credits-info");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(filter = "all") {
  const filteredCourses = courses.filter(course => {
    return filter === "all" || course.subject === filter;
  });

  courseList.innerHTML = "";

  filteredCourses.forEach(course => {
    const card = document.createElement("article");

    card.classList.add("course-card");

    if (course.completed) {
      card.classList.add("completed");
    }

    const heading = document.createElement("h3");
    heading.textContent =
      `${course.subject} ${course.number}`;

    const status = document.createElement("p");
    status.textContent = course.completed
      ? "Completed"
      : "Not completed";

    card.append(heading, status);
    courseList.appendChild(card);
  });

  const credits = filteredCourses.reduce(
    (total, course) => total + course.credits,
    0
  );

  creditTotal.textContent = `${credits} credits shown`;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    displayCourses(button.dataset.filter);
  });
});

displayCourses();