/* Sweet Crumbs Bakery - Part 3 JavaScript */
document.addEventListener("DOMContentLoaded", function () {
    const MAIL_TO = "info@sweetcrumbsbakery.co.za";

    // ------------------------------------------------------------------
    // Product search + category filter (works together)
    // ------------------------------------------------------------------
    const search = document.getElementById("productSearch");
    const list = document.getElementById("productList");
    const count = document.getElementById("productCount");
    if (search && list) {
        const cards = Array.from(list.querySelectorAll(".card"));
        const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
        let category = "all";
        function filterProducts() {
            const query = search.value.trim().toLowerCase();
            let shown = 0;
            cards.forEach(function (card) {
                const text = (card.dataset.search || card.textContent).toLowerCase();
                const matchesText = text.includes(query);
                const matchesCategory = category === "all" || card.dataset.category === category;
                const visible = matchesText && matchesCategory;
                card.hidden = !visible;
                if (visible) shown++;
            });
            if (count) {
                count.textContent = shown === 0
                    ? "No products match your search. Try a different word or choose All."
                    : "Showing " + shown + (shown === 1 ? " product." : " products.");
            }
        }
        search.addEventListener("input", filterProducts);
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                category = button.dataset.filter;
                filterButtons.forEach(function (b) {
                    b.setAttribute("aria-pressed", b === button ? "true" : "false");
                });
                filterProducts();
            });
        });
    }

    // ------------------------------------------------------------------
    // Image lightbox (keyboard accessible, focus kept inside)
    // ------------------------------------------------------------------
    const box = document.getElementById("lightbox");
    const largeImage = document.getElementById("lightboxImage");
    const caption = document.getElementById("lightboxCaption");
    const closeButton = document.querySelector(".lightbox-close");
    let previousFocus = null;
    function openBox(image) {
        if (!box || !largeImage) return;
        previousFocus = document.activeElement;
        largeImage.src = image.currentSrc || image.src;
        largeImage.alt = image.alt || "Bakery image";
        if (caption) caption.textContent = image.alt || "Sweet Crumbs Bakery";
        box.hidden = false;
        document.body.classList.add("lightbox-open");
        if (closeButton) closeButton.focus();
    }
    function closeBox() {
        if (!box) return;
        box.hidden = true;
        document.body.classList.remove("lightbox-open");
        if (largeImage) largeImage.src = "";
        if (previousFocus && previousFocus.focus) previousFocus.focus();
    }
    document.querySelectorAll("main img").forEach(function (image) {
        if (image.classList.contains("logo")) return;
        image.classList.add("zoomable-image");
        const galleryButton = image.closest(".gallery-image");
        if (galleryButton) {
            galleryButton.addEventListener("click", function () { openBox(image); });
        } else {
            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute("aria-label", "View larger image: " + (image.alt || "bakery image"));
            image.addEventListener("click", function () { openBox(image); });
            image.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openBox(image);
                }
            });
        }
    });
    if (closeButton) closeButton.addEventListener("click", closeBox);
    if (box) box.addEventListener("click", function (event) { if (event.target === box) closeBox(); });
    document.addEventListener("keydown", function (event) {
        if (!box || box.hidden) return;
        if (event.key === "Escape") closeBox();
        // The close button is the only control in the lightbox, so keep focus on it.
        if (event.key === "Tab") { event.preventDefault(); if (closeButton) closeButton.focus(); }
    });

    // ------------------------------------------------------------------
    // Form validation (custom messages) + email preparation
    // ------------------------------------------------------------------
    function isBlank(value) { return value.trim() === ""; }

    function validateName(value) {
        if (isBlank(value)) return "Please enter your full name.";
        if (value.trim().length < 2) return "Your name must be at least 2 characters.";
        if (!/^[\p{L}][\p{L}\s'.\-]*$/u.test(value.trim())) return "Use letters only (spaces, hyphens and apostrophes are fine).";
        return "";
    }
    function validateEmail(value) {
        if (isBlank(value)) return "Please enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return "Enter a valid email address, for example name@example.com.";
        return "";
    }
    function phoneRule(required) {
        return function (value) {
            if (isBlank(value)) return required ? "Please enter your contact number." : "";
            const cleaned = value.replace(/[\s\-()]/g, "");
            if (!/^\+?\d{9,15}$/.test(cleaned)) return "Enter a valid number, for example 071 234 5678 or +27 71 234 5678.";
            return "";
        };
    }
    function selectRule(message) {
        return function (value) { return isBlank(value) ? message : ""; };
    }
    function validateDate(value) {
        if (isBlank(value)) return "Please choose the date you need your order.";
        const chosen = new Date(value + "T00:00:00");
        if (isNaN(chosen.getTime())) return "Enter a valid date.";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) return "The date cannot be in the past. Please choose today or a later date.";
        return "";
    }
    function validateQuantity(value) {
        if (isBlank(value)) return "Please enter the quantity you need.";
        const number = Number(value);
        if (!Number.isInteger(number)) return "Quantity must be a whole number.";
        if (number < 1 || number > 500) return "Quantity must be between 1 and 500.";
        return "";
    }
    function textRule(label) {
        return function (value) {
            const length = value.trim().length;
            if (length === 0) return "Please enter " + label + ".";
            if (length < 10) return "Please write at least 10 characters (you have " + length + ").";
            if (length > 1500) return "Please keep it under 1500 characters (you have " + length + ").";
            return "";
        };
    }
    const rules = {
        fullname: validateName,
        contactName: validateName,
        email: validateEmail,
        contactEmail: validateEmail,
        phone: phoneRule(true),
        contactPhone: phoneRule(false),
        service: selectRule("Please choose a service."),
        messageType: selectRule("Please choose a type of message."),
        eventdate: validateDate,
        quantity: validateQuantity,
        details: textRule("some details about your request"),
        contactMessage: textRule("your message")
    };

    function errorElementFor(field) {
        let error = document.getElementById(field.id + "-error");
        if (!error) {
            error = document.createElement("span");
            error.id = field.id + "-error";
            error.className = "field-error";
            error.setAttribute("role", "alert");
            field.insertAdjacentElement("afterend", error);
        }
        return error;
    }
    function checkField(field) {
        const rule = rules[field.id];
        if (!rule) return true;
        const message = rule(field.value);
        const error = errorElementFor(field);
        error.textContent = message;
        if (message) {
            field.setAttribute("aria-invalid", "true");
            field.setAttribute("aria-describedby", error.id);
        } else {
            field.removeAttribute("aria-invalid");
            field.removeAttribute("aria-describedby");
        }
        return message === "";
    }

    function labelFor(element, form) {
        if (element.type === "radio") {
            const legend = element.closest("fieldset") && element.closest("fieldset").querySelector("legend");
            return legend ? legend.textContent.trim() : element.name;
        }
        const label = form.querySelector('label[for="' + element.id + '"]');
        return label ? label.textContent.replace(/:\s*$/, "").trim() : element.name;
    }

    // Builds the mailto: link. Line breaks are CRLF and everything is encoded exactly once.
    function buildMailto(form, kind) {
        const lines = [];
        Array.from(form.elements).forEach(function (element) {
            if (!element.name || element.type === "submit" || element.type === "reset" || element.type === "button") return;
            if (element.type === "radio" && !element.checked) return;
            if (element.type === "checkbox") {
                if (!element.checked) return;
                lines.push("Would like news about new products and special offers: Yes");
                return;
            }
            const value = element.value.trim();
            if (value === "") return;
            lines.push(labelFor(element, form) + ": " + value);
        });
        const subject = kind === "enquiry" ? "Sweet Crumbs Bakery - Customer Enquiry" : "Sweet Crumbs Bakery - Contact Message";
        const body = "Hello Sweet Crumbs Bakery,\r\n\r\n" + lines.join("\r\n") + "\r\n\r\nKind regards";
        return "mailto:" + MAIL_TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }
    window.SweetCrumbs = { buildMailto: buildMailto };

    function setupMailForm(formId, statusId, kind) {
        const form = document.getElementById(formId);
        const status = document.getElementById(statusId);
        if (!form) return;
        form.noValidate = true; // our own messages replace the browser pop-ups

        if (kind === "enquiry") {
            const date = document.getElementById("eventdate");
            if (date) {
                const now = new Date();
                date.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
            }
        }
        const fields = Array.from(form.elements).filter(function (el) { return rules[el.id]; });
        fields.forEach(function (field) {
            field.addEventListener("blur", function () { checkField(field); });
            field.addEventListener("input", function () {
                if (field.getAttribute("aria-invalid") === "true") checkField(field);
            });
            field.addEventListener("change", function () { checkField(field); });
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const invalid = fields.filter(function (field) { return !checkField(field); });
            if (invalid.length > 0) {
                invalid[0].focus();
                if (status) status.textContent = "Please correct the " + invalid.length + " highlighted field" + (invalid.length === 1 ? "" : "s") + " and try again.";
                return;
            }
            if (status) status.textContent = "Thank you. Your details are valid and your email application should now open with the message prepared. If nothing opens, email us directly at " + MAIL_TO + ".";
            window.location.href = buildMailto(form, kind);
        });
        form.addEventListener("reset", function () {
            if (status) status.textContent = "";
            fields.forEach(function (field) {
                field.removeAttribute("aria-invalid");
                field.removeAttribute("aria-describedby");
                const error = document.getElementById(field.id + "-error");
                if (error) error.textContent = "";
            });
        });
    }
    setupMailForm("enquiryForm", "enquiryStatus", "enquiry");
    setupMailForm("contactForm", "contactStatus", "contact");

    // ------------------------------------------------------------------
    // Interactive map (Leaflet + OpenStreetMap), centred on Johannesburg
    // ------------------------------------------------------------------
    const mapElement = document.getElementById("bakeryMap");
    if (mapElement && window.L) {
        const map = L.map("bakeryMap").setView([-26.2041, 28.0473], 11);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        L.marker([-26.2041, 28.0473]).addTo(map)
            .bindPopup("<strong>Sweet Crumbs Bakery</strong><br>Serving Johannesburg and surrounding areas")
            .openPopup();
    } else if (mapElement) {
        mapElement.innerHTML = '<p class="small-note map-fallback">The map could not be loaded. We serve Johannesburg and surrounding areas.</p>';
    }

    // ------------------------------------------------------------------
    // Gentle reveal effect as cards enter the page
    // ------------------------------------------------------------------
    const cardsToReveal = document.querySelectorAll(".card, .content-grid > div");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        cardsToReveal.forEach(function (card) { card.classList.add("reveal"); observer.observe(card); });
    } else {
        cardsToReveal.forEach(function (card) { card.classList.add("is-visible"); });
    }
});
