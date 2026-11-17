/* =========================================================
   BONGX031 TUTORING
   PROFESSIONAL WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   1. WAIT FOR WEBSITE TO LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll("#navMenu a");
    const bookingForm = document.getElementById("bookingForm");
    const dateInput = document.getElementById("date");
    const backToTop = document.getElementById("backToTop");
    const yearElement = document.getElementById("year");
    const profileImage = document.getElementById("profileImage");
    const imageFallback = document.getElementById("imageFallback");


    /* =====================================================
       2. CURRENT YEAR
    ===================================================== */

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* =====================================================
       3. MOBILE MENU
    ===================================================== */

    function openMenu() {

        navMenu.classList.add("active");

        menuButton.classList.add("active");

        menuButton.setAttribute("aria-expanded", "true");

        menuButton.setAttribute("aria-label", "Close navigation menu");

    }


    function closeMenu() {

        navMenu.classList.remove("active");

        menuButton.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation menu");

    }


    function toggleMenu() {

        if (navMenu.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    if (menuButton && navMenu) {

        menuButton.addEventListener("click", toggleMenu);

    }


    /* =====================================================
       4. CLOSE MENU WHEN LINK IS CLICKED
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

        });

    });


    /* =====================================================
       5. CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!navMenu || !menuButton) {
            return;
        }


        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

        }

    });


    /* =====================================================
       6. CLOSE MOBILE MENU WITH ESCAPE
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

            menuButton.focus();

        }

    });


    /* =====================================================
       7. HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       8. SMOOTH SCROLLING
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

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


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       9. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");


            if (
                href === "#" + currentSection
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


    /* =====================================================
       10. PROFILE IMAGE FALLBACK
    ===================================================== */

    if (profileImage) {

        profileImage.addEventListener("error", function () {

            profileImage.style.display = "none";


            if (imageFallback) {

                imageFallback.style.display = "flex";

            }

        });

    }


    /* =====================================================
       11. BOOKING DATE
    ===================================================== */

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


        const formattedDate =
            `${year}-${month}-${day}`;


        dateInput.min =
            formattedDate;

    }


    /* =====================================================
       12. BOOKING FORM
    ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------------------
                   GET FORM VALUES
                ----------------------------------------- */

                const name =
                    document.getElementById("name")
                        ?.value.trim();


                const level =
                    document.getElementById("level")
                        ?.value.trim();


                const subject =
                    document.getElementById("subject")
                        ?.value.trim();


                const topic =
                    document.getElementById("topic")
                        ?.value.trim();


                const date =
                    document.getElementById("date")
                        ?.value;


                const time =
                    document.getElementById("time")
                        ?.value;


                const message =
                    document.getElementById("message")
                        ?.value.trim();


                /* -----------------------------------------
                   VALIDATION
                ----------------------------------------- */

                if (!name) {

                    showNotification(
                        "Please enter your full name.",
                        "error"
                    );

                    document.getElementById("name").focus();

                    return;

                }


                if (!level) {

                    showNotification(
                        "Please select your grade or level.",
                        "error"
                    );

                    document.getElementById("level").focus();

                    return;

                }


                if (!subject) {

                    showNotification(
                        "Please select a subject or service.",
                        "error"
                    );

                    document.getElementById("subject").focus();

                    return;

                }


                if (!date) {

                    showNotification(
                        "Please select your preferred date.",
                        "error"
                    );

                    document.getElementById("date").focus();

                    return;

                }


                if (!time) {

                    showNotification(
                        "Please select your preferred time.",
                        "error"
                    );

                    document.getElementById("time").focus();

                    return;

                }


                /* -----------------------------------------
                   FORMAT DATE
                ----------------------------------------- */

                const formattedDate =
                    formatDate(date);


                /* -----------------------------------------
                   CREATE WHATSAPP MESSAGE
                ----------------------------------------- */

                let whatsappMessage =

`Hello BONGX031 👋

I would like to make a booking.

━━━━━━━━━━━━━━━━━━━━

STUDENT DETAILS

Name: ${name}

Grade / Level: ${level}

Subject / Service: ${subject}

Topic / Module: ${topic || "Not specified"}

Preferred Date: ${formattedDate}

Preferred Time: ${time}

Additional Message:
${message || "No additional message"}

━━━━━━━━━━━━━━━━━━━━

I would like to confirm availability and receive further information.

Thank you.`;



                /* -----------------------------------------
                   WHATSAPP URL
                ----------------------------------------- */

                const phoneNumber =
                    "27786701301";


                const whatsappURL =
                    "https://wa.me/" +
                    phoneNumber +
                    "?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                /* -----------------------------------------
                   DISABLE BUTTON
                ----------------------------------------- */

                const submitButton =
                    bookingForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Opening WhatsApp...";

                }


                /* -----------------------------------------
                   OPEN WHATSAPP
                ----------------------------------------- */

                window.open(
                    whatsappURL,
                    "_blank"
                );


                /* -----------------------------------------
                   SUCCESS MESSAGE
                ----------------------------------------- */

                showNotification(
                    "Your booking request has been prepared for WhatsApp.",
                    "success"
                );


                /* -----------------------------------------
                   RESET FORM
                ----------------------------------------- */

                setTimeout(function () {

                    bookingForm.reset();


                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Send Booking Request on WhatsApp";

                    }

                }, 1500);

            });

    }


    /* =====================================================
       13. FORMAT DATE
    ===================================================== */

    function formatDate(dateString) {

        if (!dateString) {

            return "Not specified";

        }


        const date =
            new Date(
                dateString + "T00:00:00"
            );


        return date.toLocaleDateString(
            "en-ZA",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       14. NOTIFICATION SYSTEM
    ===================================================== */

    function showNotification(
        message,
        type = "success"
    ) {

        const existing =
            document.querySelector(
                ".site-notification"
            );


        if (existing) {

            existing.remove();

        }


        const notification =
            document.createElement("div");


        notification.className =
            "site-notification";


        if (type === "error") {

            notification.classList.add(
                "notification-error"
            );

        } else {

            notification.classList.add(
                "notification-success"
            );

        }


        notification.innerHTML = `

            <div class="notification-icon">
                ${type === "error" ? "!" : "✓"}
            </div>

            <div class="notification-message">
                ${message}
            </div>

            <button
                class="notification-close"
                aria-label="Close notification"
            >
                ×
            </button>

        `;


        document.body.appendChild(
            notification
        );


        requestAnimationFrame(function () {

            notification.classList.add(
                "show"
            );

        });


        const closeButton =
            notification.querySelector(
                ".notification-close"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    removeNotification(
                        notification
                    );

                }
            );

        }


        setTimeout(function () {

            removeNotification(
                notification
            );

        }, 5000);

    }


    /* =====================================================
       15. REMOVE NOTIFICATION
    ===================================================== */

    function removeNotification(
        notification
    ) {

        if (!notification) {
            return;
        }


        notification.classList.remove(
            "show"
        );


        setTimeout(function () {

            notification.remove();

        }, 300);

    }


    /* =====================================================
       16. BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 500) {

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
        { passive: true }
    );


    updateBackToTop();


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


    /* =====================================================
       17. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".subject-card, " +
            ".price-card, " +
            ".resource-card, " +
            ".process-step, " +
            ".feature, " +
            ".bursary-apply-box"
        );


    revealElements.forEach(function (element) {

        element.classList.add(
            "scroll-reveal"
        );

    });


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "revealed"
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

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =====================================================
       18. FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-list details"
        );


    faqItems.forEach(function (item) {

        item.addEventListener(
            "toggle",
            function () {

                if (!item.open) {
                    return;
                }


                faqItems.forEach(
                    function (otherItem) {

                        if (
                            otherItem !== item &&
                            otherItem.open
                        ) {

                            otherItem.open = false;

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       19. FORM INPUT IMPROVEMENT
    ===================================================== */

    const formInputs =
        document.querySelectorAll(
            "#bookingForm input, " +
            "#bookingForm select, " +
            "#bookingForm textarea"
        );


    formInputs.forEach(function (input) {

        input.addEventListener(
            "focus",
            function () {

                this.parentElement.classList.add(
                    "input-focused"
                );

            }
        );


        input.addEventListener(
            "blur",
            function () {

                this.parentElement.classList.remove(
                    "input-focused"
                );

            }
        );

    });


    /* =====================================================
       20. PREVENT DOUBLE CLICK ON EXTERNAL BUTTONS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                this.setAttribute(
                    "aria-busy",
                    "true"
                );

            }
        );

    });


    /* =====================================================
       21. CONSOLE BRAND MESSAGE
    ===================================================== */

    console.log(
        "%c BONGX031 TUTORING ",
        "background:#0756a8;color:white;font-size:16px;font-weight:bold;padding:8px;"
    );


    console.log(
        "Mathematics • Physics • Computer Science • Bursary Application Assistance"
    );

});
