// ================= MOBILE MENU =================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});


// Close mobile menu when a link is clicked

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
    });

});


// ================= WHATSAPP BOOKING =================

// Your WhatsApp number in international format
const whatsappNumber = "27786701301";

const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get information from the form
    const name = document.getElementById("name").value.trim();
    const module = document.getElementById("module").value;
    const date = document.getElementById("date").value;
    const session = document.getElementById("session").value;
    const message = document.getElementById("message").value.trim();


    // Check required fields

    if (name === "" ||
        module === "" ||
        date === "" ||
        session === "") {

        formMessage.textContent =
            "Please complete all required fields.";

        return;
    }


    // Convert date to a more readable format

    const selectedDate = new Date(date + "T00:00:00");

    const formattedDate = selectedDate.toLocaleDateString(
        "en-ZA",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );


    // Create WhatsApp message

    const whatsappMessage =
`Hello Bongani 👋

I would like to book a tutoring session.

👤 Name: ${name}

📚 Module / Subject: ${module}

📅 Preferred Date: ${formattedDate}

🎓 Session Type: ${session}

📝 What I need help with:
${message || "Not specified"}

Thank you.`;


    // Encode message so it can be used in a URL

    const encodedMessage =
        encodeURIComponent(whatsappMessage);


    // Create WhatsApp URL

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


    // Open WhatsApp

    window.open(whatsappURL, "_blank");


    // Show confirmation

    formMessage.textContent =
        "Opening WhatsApp...";


});


// ================= CURRENT YEAR =================

document.getElementById("year").textContent =
    new Date().getFullYear();