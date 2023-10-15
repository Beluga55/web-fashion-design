// Get all the FAQ elements
const faqs = document.querySelectorAll(".faq");

// Add click event listeners to each FAQ to toggle visibility of the answer
faqs.forEach((faq) => {
  const answer = faq.querySelector("p");
  const plusIcon = faq.querySelector(".bx-plus");

  faq.addEventListener("click", () => {
    // Collapse previously opened FAQ answers and reset plus icons
    faqs.forEach((otherFaq) => {
      if (otherFaq !== faq) {
        otherFaq.querySelector("p").classList.remove("show-answer");
        otherFaq.querySelector(".bx-plus").classList.remove("rotate");
      }
    });

    answer.classList.toggle("show-answer");
    plusIcon.classList.toggle("rotate");
    // Stop the click event from propagating to the document
    event.stopPropagation();
  });
});

// Add a click event listener to the document to collapse answers when clicking outside
document.addEventListener("click", (event) => {
  faqs.forEach((faq) => {
    const answer = faq.querySelector("p");
    const plusIcon = faq.querySelector(".bx-plus");

    answer.classList.remove("show-answer");
    plusIcon.classList.remove("rotate");
  });
});
