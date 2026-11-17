/* =========================================================
   BONGANI TUTORING
   ADVANCED COMPANY WEBSITE JAVASCRIPT

   BLUE • WHITE • RED
   PROFESSIONAL • MODERN • INTERACTIVE
========================================================= */


/* =========================================================
   1. GLOBAL SETTINGS
========================================================= */

"use strict";


/* =========================================================
   2. ELEMENTS
========================================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

const yearElement = document.getElementById("year");


/* =========================================================
   3. MOBILE NAVIGATION
========================================================= */

function openMobileMenu() {

    if (!menuButton || !navMenu) return;

    navMenu.classList.add("active");

    menuButton.classList.add("active");

    menuButton.textContent = "✕";

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );
}


function closeMobileMenu() {

    if (!menuButton || !navMenu) return;

    navMenu.classList.remove("active");

    menuButton.classList.remove("active");

    menuButton.textContent = "☰";

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );
}


function toggleMobileMenu() {

    if (!navMenu) return;

    if (navMenu.classList.contains("active")) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }
}


if (menuButton && navMenu) {

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    menuButton.addEventListener(
        "click",
        toggleMobileMenu
    );


    /* Close menu when navigation link is clicked */

    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* Close menu when ESC is pressed */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* Close menu when clicking outside */

    document.addEventListener(
        "click",
        function (event) {

            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   4. NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) return;


    if (window.scrollY > 40) {

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
   5. ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(
        '#navMenu a[href^="#"]'
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget === "#" + currentSection
        ) {

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
   6. SMOOTH SCROLL
========================================================= */

const smoothLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


smoothLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetID =
                this.getAttribute("href");


            if (
                !targetID ||
                targetID === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetID);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   7. CURRENT YEAR
========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   8. BOOKING DATE
========================================================= */

/*
   Prevent students from selecting
   a date in the past.
*/

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const minimumDate =
        `${year}-${month}-${day}`;


    dateInput.min =
        minimumDate;

}


/* =========================================================
   9. WHATSAPP BOOKING
========================================================= */


/*
   Bongani Tutoring WhatsApp number.

   South Africa:
   078 670 1301

   International:
   27786701301
*/

const whatsappNumber =
    "27786701301";


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =================================================
               GET FORM ELEMENTS
            ================================================= */

            const nameInput =
                document.getElementById("name");


            const moduleInput =
                document.getElementById("module");


            const dateInput =
                document.getElementById("date");


            const sessionInput =
                document.getElementById("session");


            const messageInput =
                document.getElementById("message");


            /* =================================================
               GET VALUES
            ================================================= */

            const name =
                nameInput ?
                nameInput.value.trim() :
                "";


            const module =
                moduleInput ?
                moduleInput.value.trim() :
                "";


            const date =
                dateInput ?
                dateInput.value :
                "";


            const session =
                sessionInput ?
                sessionInput.value.trim() :
                "";


            const message =
                messageInput ?
                messageInput.value.trim() :
                "";


            /* =================================================
               VALIDATION
            ================================================= */

            if (
                name === "" ||
                module === "" ||
                date === "" ||
                session === ""
            ) {

                showFormMessage(
                    "Please complete all required fields.",
                    "#e31b23"
                );

                return;

            }


            /* =================================================
               VALIDATE NAME
            ================================================= */

            if (name.length < 2) {

                showFormMessage(
                    "Please enter your full name.",
                    "#e31b23"
                );

                if (nameInput) {

                    nameInput.focus();

                }

                return;

            }


            /* =================================================
               DATE VALIDATION
            ================================================= */

            const selectedDate =
                new Date(
                    date + "T00:00:00"
                );


            if (
                Number.isNaN(
                    selectedDate.getTime()
                )
            ) {

                showFormMessage(
                    "Please select a valid date.",
                    "#e31b23"
                );

                return;

            }


            /* =================================================
               FORMAT DATE
            ================================================= */

            const formattedDate =
                selectedDate.toLocaleDateString(
                    "en-ZA",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );


            /* =================================================
               CREATE WHATSAPP MESSAGE
            ================================================= */

            const whatsappMessage =
`Hello Bongani 👋

I would like to book a tutoring session with Bongani Tutoring.

━━━━━━━━━━━━━━━━━━━━

👤 STUDENT DETAILS

Name:
${name}

📚 MODULE / SUBJECT

${module}

📅 PREFERRED DATE

${formattedDate}

🎓 SESSION TYPE

${session}

📝 TOPIC / QUESTION

${message || "Not specified"}

━━━━━━━━━━━━━━━━━━━━

Please let me know the available time and confirm my booking.

Thank you.

Bongani Tutoring`;


            /* =================================================
               ENCODE MESSAGE
            ================================================= */

            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );


            /* =================================================
               CREATE WHATSAPP URL
            ================================================= */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


            /* =================================================
               BUTTON LOADING STATE
            ================================================= */

            const submitButton =
                bookingForm.querySelector(
                    ".submit-button"
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Opening WhatsApp...";

            }


            /* =================================================
               SUCCESS MESSAGE
            ================================================= */

            showFormMessage(
                "✓ Booking prepared. Opening WhatsApp...",
                "#1264e8"
            );


            /* =================================================
               OPEN WHATSAPP
            ================================================= */

            setTimeout(
                function () {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );


                    /* Restore button */

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Book via WhatsApp";

                    }

                },
                500
            );

        }
    );

}


/* =========================================================
   10. FORM MESSAGE FUNCTION
========================================================= */

function showFormMessage(
    message,
    color
) {

    if (!formMessage) return;


    formMessage.textContent =
        message;


    formMessage.style.color =
        color;


    formMessage.style.opacity =
        "1";


    formMessage.style.transform =
        "translateY(0)";


    /* Automatically clear normal messages */

    setTimeout(
        function () {

            if (
                formMessage.textContent ===
                message
            ) {

                formMessage.style.opacity =
                    "0";

            }

        },
        5000
    );

}


/* =========================================================
   11. FORM INPUT INTERACTION
========================================================= */

const formInputs =
    document.querySelectorAll(
        "#bookingForm input, " +
        "#bookingForm select, " +
        "#bookingForm textarea"
    );


formInputs.forEach(
    function (input) {


        /* Focus */

        input.addEventListener(
            "focus",
            function () {

                this.classList.add(
                    "focused"
                );

            }
        );


        /* Blur */

        input.addEventListener(
            "blur",
            function () {

                this.classList.remove(
                    "focused"
                );


                if (
                    this.value.trim() === ""
                ) {

                    this.classList.remove(
                        "filled"
                    );

                } else {

                    this.classList.add(
                        "filled"
                    );

                }

            }
        );


        /* Typing */

        input.addEventListener(
            "input",
            function () {

                if (
                    this.value.trim() !== ""
                ) {

                    this.classList.add(
                        "filled"
                    );

                } else {

                    this.classList.remove(
                        "filled"
                    );

                }

            }
        );

    }
);


/* =========================================================
   12. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".subject-card, " +
        ".price-card, " +
        ".step, " +
        ".contact-item, " +
        ".section-heading, " +
        ".booking-content, " +
        ".floating-card"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "reveal"
            );


            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   13. ANIMATED STATISTICS
========================================================= */

const statisticNumbers =
    document.querySelectorAll(
        ".stat h2"
    );


function animateCounter(element) {

    const originalText =
        element.textContent.trim();


    /*
       Find numbers such as:

       100+
       50+
       24/7

       The animation only runs
       when the element contains
       a numeric value.
    */

    const match =
        originalText.match(
            /(\d+)/
        );


    if (!match) return;


    const target =
        Number(match[1]);


    const prefix =
        originalText.substring(
            0,
            match.index
        );


    const suffix =
        originalText.substring(
            match.index +
            match[1].length
        );


    let current =
        0;


    const duration =
        1200;


    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const progress =
            Math.min(
                (
                    currentTime -
                    startTime
                ) / duration,
                1
            );


        /*
           Ease-out animation.
        */

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                target *
                easedProgress
            );


        element.textContent =
            prefix +
            current +
            suffix;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


if (
    "IntersectionObserver" in window
) {

    const statsObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            const numbers =
                                entry.target.querySelectorAll(
                                    ".stat h2"
                                );


                            numbers.forEach(
                                function (number) {

                                    if (
                                        !number.dataset.animated
                                    ) {

                                        number.dataset.animated =
                                            "true";


                                        animateCounter(
                                            number
                                        );

                                    }

                                }
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.4
            }
        );


    const statsSection =
        document.querySelector(
            ".stats"
        );


    if (statsSection) {

        statsObserver.observe(
            statsSection
        );

    }

}


/* =========================================================
   14. BACK TO TOP BUTTON
========================================================= */

const backToTop =
    document.createElement("button");


backToTop.type =
    "button";


backToTop.className =
    "back-to-top";


backToTop.innerHTML =
    "↑";


backToTop.setAttribute(
    "aria-label",
    "Back to top"
);


document.body.appendChild(
    backToTop
);


function updateBackToTop() {

    if (
        window.scrollY > 500
    ) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    {
        passive: true
    }
);


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   15. CARD HOVER INTERACTION
========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".subject-card, " +
        ".price-card, " +
        ".contact-item"
    );


interactiveCards.forEach(
    function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                this.classList.add(
                    "card-active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                this.classList.remove(
                    "card-active"
                );

            }
        );

    }
);


/* =========================================================
   16. PREVENT DOUBLE SUBMISSION
========================================================= */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function () {

            const submitButton =
                this.querySelector(
                    ".submit-button"
                );


            if (
                submitButton &&
                submitButton.disabled
            ) {

                return;

            }

        }
    );

}


/* =========================================================
   17. REDUCED MOTION ACCESSIBILITY
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    document.documentElement.style.scrollBehavior =
        "auto";

}


/* =========================================================
   18. WEBSITE READY
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);


/* =========================================================
   BONGANI TUTORING
   WEBSITE JAVASCRIPT COMPLETE
========================================================= */
