/* =========================================================
   BONGANI TUTORING
   WEBSITE JAVASCRIPT
   BLUE • WHITE • RED DESIGN
========================================================= */


/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        // Change menu icon
        if (navMenu.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });


    // Close menu when a navigation link is clicked

    const navLinks = document.querySelectorAll("#navMenu a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuButton.textContent = "☰";

        });

    });

}


/* ================= WHATSAPP BOOKING ================= */


/*
   WhatsApp number
   South Africa:
   078 670 1301
   International format:
   27786701301
*/

const whatsappNumber = "27786701301";


const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");


if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* ================= GET FORM DATA ================= */

        const name =
            document.getElementById("name").value.trim();

        const module =
            document.getElementById("module").value;

        const date =
            document.getElementById("date").value;

        const session =
            document.getElementById("session").value;

        const message =
            document.getElementById("message").value.trim();


        /* ================= VALIDATION ================= */

        if (
            name === "" ||
            module === "" ||
            date === "" ||
            session === ""
        ) {

            formMessage.textContent =
                "Please complete all required fields.";

            formMessage.style.color = "#e31b23";

            return;

        }


        /* ================= DATE FORMAT ================= */

        const selectedDate =
            new Date(date + "T00:00:00");


        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-ZA",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );


        /* ================= WHATSAPP MESSAGE ================= */

        const whatsappMessage =
`Hello Bongani 👋

I would like to book a tutoring session.

━━━━━━━━━━━━━━━━━━━━

👤 Name:
${name}

📚 Module / Subject:
${module}

📅 Preferred Date:
${formattedDate}

🎓 Session Type:
${session}

📝 What I need help with:
${message || "Not specified"}

━━━━━━━━━━━━━━━━━━━━

Thank you.`;


        /* ================= ENCODE MESSAGE ================= */

        const encodedMessage =
            encodeURIComponent(whatsappMessage);


        /* ================= WHATSAPP URL ================= */

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


        /* ================= CONFIRMATION ================= */

        formMessage.textContent =
            "✓ Booking details prepared. Opening WhatsApp...";

        formMessage.style.color = "#1264e8";


        /* ================= OPEN WHATSAPP ================= */

        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


/* ================= CURRENT YEAR ================= */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMALL UI EFFECTS
========================================================= */


/* Add a visual effect when form inputs are selected */

const formInputs =
    document.querySelectorAll(
        "#bookingForm input, #bookingForm select, #bookingForm textarea"
    );


formInputs.forEach(function (input) {

    input.addEventListener("focus", function () {

        this.style.borderColor = "#1264e8";

    });


    input.addEventListener("blur", function () {

        if (this.value === "") {

            this.style.borderColor = "#d8dee8";

        }

    });

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

const smoothLinks =
    document.querySelectorAll('a[href^="#"]');


smoothLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetID =
            this.getAttribute("href");

        const target =
            document.querySelector(targetID);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});
