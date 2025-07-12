

document.getElementById("discountForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default form submission

    const form = this;
    const emailInput = form.querySelector('input[type="email"]');
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    if (!pattern.test(emailInput.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
        return;
    }

    // Send data using Fetch API
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your 20% off code has been sent to your email.',
            });
            form.reset(); // clear the form
        } else {
            throw new Error("Network response failed");
        }
    }).catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
        });
    });
});







document.addEventListener("DOMContentLoaded", () => {
  const modalOverlay = document.getElementById("modalOverlay")
  const closeButton = document.getElementById("closeButton")
  const continueShoppingLink = document.getElementById("continueShopping")

  // Function to show the modal
  const showModal = () => {
    modalOverlay.style.display = "flex" // Ensure it's visible for animation
    // Use a small timeout to allow display:flex to apply before starting animation
    setTimeout(() => {
      modalOverlay.classList.add("show")
      modalOverlay.classList.remove("fade-out") // Remove fade-out if it was there
    }, 10)
  }

  // Function to hide the modal
  const hideModal = () => {
    modalOverlay.classList.remove("show")
    modalOverlay.classList.add("fade-out") // Add fade-out class for animation

    // Wait for the animation to complete before setting display to none
    modalOverlay.addEventListener(
      "animationend",
      function handler() {
        modalOverlay.style.display = "none"
        modalOverlay.classList.remove("fade-out") // Clean up the class
        modalOverlay.removeEventListener("animationend", handler) // Remove listener to prevent multiple calls
      },
      { once: true },
    ) // Ensure the listener is removed after one execution
  }

  // Event listeners
  closeButton.addEventListener("click", hideModal)
  continueShoppingLink.addEventListener("click", (event) => {
    event.preventDefault() // Prevent default link behavior
    hideModal()
  })

  // Hide modal if clicking outside the content (on the overlay itself)
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      hideModal()
    }
  })

  // Show the modal when the page loads
  showModal()
})