// 1. Set the current date and time in the hidden timestamp field
const timestampField = document.getElementById("timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// 2. Modal interactions
const modalButtons = document.querySelectorAll(".modal-btn");
const closeButtons = document.querySelectorAll(".close-modal");
const dialogs = document.querySelectorAll("dialog");

// Open modals
modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

// Close modals via button
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");
        if (modal) {
            modal.close();
        }
    });
});

// Optional: Close modal when clicking outside the dialog box
dialogs.forEach(dialog => {
    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.bottom &&
            rect.left <= event.clientX && event.clientX <= rect.right);
        if (!isInDialog) {
            dialog.close();
        }
    });
});