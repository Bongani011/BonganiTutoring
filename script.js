"use strict";


/* =========================================================
   BONGANI TUTORING
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });


    const navLinks = document.querySelectorAll("#navMenu a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });


    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {

            navMenu.classList.remove("active");

        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navMenu.classList.remove("active");

        }

    });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");


function updateNavbar() {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   BOOKING DATE
========================================================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;

}


/* =========================================================
   WHATSAPP BOOKING
========================================================= */

const bookingForm =
    document.getElementById("bookingForm");

const formMessage =
    document.getElementById("formMessage");

const submitButton =
    document.getElementById("submitButton");


/*
   Bongani Tutoring WhatsApp number

   0786701301
   South Africa international format:
   27786701301
*/

const whatsappNumber =
    "27786701301";


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Collect form values */

            const name =
                document.getElementById("name").value.trim();

            const level =
                document.getElementById("level").value;

            const subject =
                document.getElementById("subject").value;

            const module =
                document.getElementById("module").value.trim();

            const date =
                document.getElementById("date").value;

            const session =
                document.getElementById("session").value;

            const message =
                document.getElementById("message").value.trim();


            /* Basic validation */

            if (
                !name ||
                !level ||
                !subject ||
                !module ||
                !date ||
                !session
            ) {

                formMessage.textContent =
                    "Please complete all required fields.";

                formMessage.style.color =
                    "#e31b23";

                return;

            }


            /* Convert date */

            let formattedDate =
                date;

            if (date) {

                const selectedDate =
                    new Date(date + "T00:00:00");

                formattedDate =
                    selectedDate.toLocaleDateString(
                        "en-ZA",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    );

            }


            /* Create WhatsApp message */

            let whatsappMessage =
                "Hello Bongani, I would like to book a tutoring session.%0A%0A";


            whatsappMessage +=
                "Name: " +
                encodeURIComponent(name) +
                "%0A";

            whatsappMessage +=
                "Grade/Level: " +
                encodeURIComponent(level) +
                "%0A";

            whatsappMessage +=
                "Subject: " +
                encodeURIComponent(subject) +
                "%0A";

            whatsappMessage +=
                "Topic/Module: " +
                encodeURIComponent(module) +
                "%0A";

            whatsappMessage +=
                "Preferred Date: " +
                encodeURIComponent(formattedDate) +
                "%0A";

            whatsappMessage +=
                "Preferred Time: " +
                encodeURIComponent(session) +
                "%0A";


            if (message) {

                whatsappMessage +=
                    "Additional Message: " +
                    encodeURIComponent(message) +
                    "%0A";

            }


            whatsappMessage +=
                "%0AI would like to receive confirmation of the session.";


            /* WhatsApp URL */

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                whatsappMessage;


            /* Button state */

            submitButton.disabled = true;

            submitButton.textContent =
                "Opening WhatsApp...";


            formMessage.textContent =
                "Your booking request is being prepared for WhatsApp.";

            formMessage.style.color =
                "#1264e8";


            /* Open WhatsApp */

            setTimeout(function () {

                window.open(
                    whatsappURL,
                    "_blank"
                );


                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Booking Request on WhatsApp";

            }, 600);

        }
    );

}


/* =========================================================
   FORM FOCUS EFFECTS
========================================================= */

const formInputs =
    document.querySelectorAll(
        ".booking-form input, .booking-form select, .booking-form textarea"
    );


formInputs.forEach(function (input) {

    input.addEventListener(
        "focus",
        function () {

            this.classList.add("focused");

        }
    );


    input.addEventListener(
        "blur",
        function () {

            this.classList.remove("focused");

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".subject-card, .price-card, .process-card, .contact-card, .platform-card, .info-card"
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.10
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


updateBackToTop();


/* =========================================================
   YOUTUBE LINK
========================================================= */


/*
   IMPORTANT:

   Replace the URL below with your actual
   YouTube channel URL.

   Example:

   const youtubeURL =
       "https://www.youtube.com/@YourChannel";
*/

const youtubeURL = "#";


const youtubeLink =
    document.getElementById("youtubeLink");

const youtubeContactLink =
    document.getElementById(
        "youtubeContactLink"
    );


if (youtubeURL !== "#") {

    if (youtubeLink) {

        youtubeLink.href =
            youtubeURL;

        youtubeLink.target =
            "_blank";

        youtubeLink.rel =
            "noopener noreferrer";

    }


    if (youtubeContactLink) {

        youtubeContactLink.href =
            youtubeURL;

        youtubeContactLink.target =
            "_blank";

        youtubeContactLink.rel =
            "noopener noreferrer";

    }

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


function updateActiveNavigation() {

    let currentSection =
        "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   PREVENT BROKEN YOUTUBE PLACEHOLDER
========================================================= */

document.querySelectorAll(
    'a[href="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            if (
                link.id === "youtubeLink" ||
                link.id === "youtubeContactLink"
            ) {

                event.preventDefault();

                alert(
                    "The YouTube channel link will be added here once the channel URL is provided."
                );

            }

        }
    );

});


/* =========================================================
   ACCESSIBILITY
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}
