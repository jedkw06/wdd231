const courseDialog = document.querySelector("#course-details");
const courseContainer = document.querySelector("#item-container");

function displayCourseDetails(course) {
  courseDialog.innerHTML = `
    <button type="button" id="closeModal">Close</button>
    <h2>${course.subject} ${course.number}</h2>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology}</p>
    <p><strong>Status</strong>: ${course.completed ? "Completed" : "Not completed"}</p>
  `;
  courseDialog.showModal();

  courseDialog.querySelector("#closeModal").addEventListener("click", () => {
    courseDialog.close();
  });
}

courseContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".course-card");
  if (!card || !courseContainer.contains(card)) {
    return;
  }

  const selectedCourse = courses.find((course) =>
    course.subject === card.dataset.subject &&
    String(course.number) === card.dataset.number
  );
  if (!selectedCourse) {
    throw new Error("Could not find the selected course.");
  }
  displayCourseDetails(selectedCourse);
});

courseDialog.addEventListener("click", (event) => {
  if (event.target === courseDialog) {
    courseDialog.close();
  }
});