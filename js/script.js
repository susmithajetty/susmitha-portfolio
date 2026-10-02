// =========================================
// SCROLL DRIVEN HERO
// =========================================

const scrollHero = document.querySelector(".scroll-hero");

const heroName = document.querySelector(".hero-name");
const heroSmallText = document.querySelector(".hero-small-text");
const heroRole = document.querySelector(".hero-role");
const heroTagline = document.querySelector(".hero-tagline");
const heroOrbit = document.querySelector(".hero-orbit");


function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


function updateHero() {

    const rect = scrollHero.getBoundingClientRect();

    const totalScroll = scrollHero.offsetHeight - window.innerHeight;

    let progress = -rect.top / totalScroll;

    progress = clamp(progress, 0, 1);


    // =====================================
    // PHASE 1
    // Name starts large
    // =====================================

    if (progress < 0.35) {

        const p = progress / 0.35;

        const scale = 1 - (p * 0.35);

        const moveX = p * 20;
        const moveY = p * -70;

        heroName.style.transform =
            `translate(${moveX}px, ${moveY}px) scale(${scale})`;

        heroSmallText.style.opacity = 1 - p * 0.5;

        heroRole.style.opacity = p;

        heroRole.style.transform =
            `translateY(${40 - p * 40}px)`;

        heroTagline.style.opacity = 0;

    }


    // =====================================
    // PHASE 2
    // Role appears
    // =====================================

    else if (progress < 0.70) {

        const p = (progress - 0.35) / 0.35;

        heroName.style.transform =
            `translate(20px, -70px) scale(0.65)`;

        heroSmallText.style.opacity = 0.5;

        heroRole.style.opacity = 1;

        heroRole.style.transform =
            `translateY(${0 - p * 20}px)`;

        heroTagline.style.opacity = p;

        heroTagline.style.transform =
            `translateY(${30 - p * 30}px)`;

        heroOrbit.style.transform =
            `scale(${1 + p * 0.2}) rotate(${p * 15}deg)`;

    }


    // =====================================
    // PHASE 3
    // Everything moves away
    // =====================================

    else {

        const p = (progress - 0.70) / 0.30;

        heroName.style.transform =
            `translate(${20 - p * 200}px, ${-70 - p * 100}px) scale(${0.65 - p * 0.25})`;

        heroRole.style.transform =
            `translate(${p * 100}px, ${-20 - p * 50}px)`;

        heroRole.style.opacity = 1 - p;

        heroTagline.style.transform =
            `translateY(${-p * 80}px)`;

        heroTagline.style.opacity = 1 - p;

        heroSmallText.style.opacity = 0;

        heroOrbit.style.transform =
            `scale(${1.2 + p * 0.6}) rotate(${15 + p * 30}deg)`;

    }

}


window.addEventListener("scroll", updateHero);

window.addEventListener("resize", updateHero);

updateHero();

// =========================================
// ABOUT TYPEWRITER EFFECT
// =========================================

const typewriter = document.querySelector(".typewriter-text");

let hasTyped = false;

function startTypewriter() {

    if (hasTyped || !typewriter) {
        return;
    }

    hasTyped = true;

    const text = typewriter.getAttribute("data-text");

    let index = 0;

    function type() {

        if (index < text.length) {

            typewriter.textContent += text.charAt(index);

            index++;

            setTimeout(type, 35);

        } else {

            // Remove blinking cursor after typing
            setTimeout(() => {
                typewriter.classList.add("typing-complete");
            }, 500);

        }
    }

    type();
}


/* Detect when About paragraph enters the screen */

const typewriterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                startTypewriter();
            }

        });

    },

    {
        threshold: 0.7
    }

);


if (typewriter) {
    typewriterObserver.observe(typewriter);
}
