        // Navbar scroll effect and loading bar
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        const loadingBar = document.getElementById('loadingBar');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrolled / scrollHeight) * 100;
            
            loadingBar.style.width = scrollPercent + '%';
            
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                navMenu.classList.remove('active');
            });
        });

        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal');
        
        function revealOnScroll() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('revealed');
                }
            });
        }
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + (target === 98 ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
                    }
                }, 20);
            });
        }

        // Trigger counter animation when stats section is visible
        const statsSection = document.querySelector('.stats');
        let countersAnimated = false;
        
        function checkStatsVisibility() {
            const statsTop = statsSection.getBoundingClientRect().top;
            
            if (statsTop < window.innerHeight && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        }
        
        window.addEventListener('scroll', checkStatsVisibility);

        // Add interactive cursor effect
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(59, 130, 246, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            const cursorElement = document.querySelector('.cursor');
            cursorElement.style.left = e.clientX - 10 + 'px';
            cursorElement.style.top = e.clientY - 10 + 'px';
        });

        // Add hover effects to interactive elements
        document.querySelectorAll('a, button, .feature-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.borderColor = 'rgba(74, 222, 128, 0.8)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                }
            });
        });