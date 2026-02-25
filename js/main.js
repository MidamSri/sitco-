/* ========================================
   SITCO — Main JavaScript
   Particles, scroll reveals, counters,
   navbar, mobile menu, smooth scroll
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    if (document.getElementById('heroCanvas')) {
        initParticles();
    }
});

/* ----------------------------------------
   NAVBAR — scroll style change
   ---------------------------------------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ----------------------------------------
   MOBILE MENU
   ---------------------------------------- */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

/* ----------------------------------------
   SCROLL REVEAL (IntersectionObserver)
   ---------------------------------------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ----------------------------------------
   ANIMATED COUNTERS
   ---------------------------------------- */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const animated = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated.has(entry.target)) {
                animated.add(entry.target);
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(easeOutCubic(progress) * target);
        el.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* ----------------------------------------
   SMOOTH SCROLL for anchor links
   ---------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const hash = anchor.getAttribute('href');
            if (hash === '#') return;
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ----------------------------------------
   HERO PARTICLE ANIMATION
   Floating connected dots with parallax
   ---------------------------------------- */
function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');

    let width, height, time = 0;
    let particles = [];
    let mouse = { x: null, y: null };

    const PARTICLE_COUNT = 120;
    const CONNECTION_DIST = 140;
    const MOUSE_RADIUS = 250;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                baseRadius: Math.random() * 2 + 0.5,
                radius: 0,
                baseAlpha: Math.random() * 0.4 + 0.15,
                alpha: 0,
                // twinkle parameters — each star has unique rhythm
                twinkleSpeed: Math.random() * 0.03 + 0.008,
                twinklePhase: Math.random() * Math.PI * 2,
                // gentle orbital drift
                orbitRadius: Math.random() * 0.3 + 0.1,
                orbitSpeed: (Math.random() - 0.5) * 0.008,
                orbitAngle: Math.random() * Math.PI * 2,
            });
        }
    }

    function drawParticle(p) {
        // glow halo
        if (p.radius > 1.2) {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${p.alpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        // core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 180, 255, ${p.alpha})`;
        ctx.fill();
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }
        }
    }

    function drawMouseConnections() {
        if (mouse.x === null) return;

        // soft cursor glow on canvas
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        cursorGlow.addColorStop(0, 'rgba(6, 182, 212, 0.04)');
        cursorGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = cursorGlow;
        ctx.fill();

        particles.forEach(p => {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
                const proximity = 1 - dist / MOUSE_RADIUS;
                const alpha = proximity * 0.35;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                ctx.lineWidth = proximity * 1.2;
                ctx.stroke();
            }
        });
    }

    function update() {
        time++;
        particles.forEach(p => {
            // twinkle: oscillate alpha and radius
            const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase);
            p.alpha = p.baseAlpha + twinkle * p.baseAlpha * 0.6;
            p.radius = p.baseRadius + twinkle * p.baseRadius * 0.3;

            // orbital drift
            p.orbitAngle += p.orbitSpeed;
            const ox = Math.cos(p.orbitAngle) * p.orbitRadius;
            const oy = Math.sin(p.orbitAngle) * p.orbitRadius;

            p.x += p.vx + ox;
            p.y += p.vy + oy;

            // wrap around edges softly
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            // cursor interaction: brighten + push away strongly
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS && dist > 0) {
                    const proximity = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const proxSq = proximity * proximity; // exponential falloff for snappy feel
                    // brighten near cursor
                    p.alpha = Math.min(1, p.alpha + proximity * 0.5);
                    p.radius = p.baseRadius + proximity * 2.5;
                    // strong push away from cursor
                    const force = proxSq * 0.12;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }
            }

            // dampen velocity to keep things smooth
            p.vx *= 0.985;
            p.vy *= 0.985;
        });
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);
        update();
        drawConnections();
        drawMouseConnections();
        particles.forEach(drawParticle);
        requestAnimationFrame(loop);
    }

    // Events
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    resize();
    createParticles();
    loop();
}
