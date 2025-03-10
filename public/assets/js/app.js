// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

$(document).ready(function() {
    // Sidebar Toggle
    $('.nav-toggle').click(function() {
        $('.sidebar').toggleClass('active');
        $('body').toggleClass('body-with-sidebar');
    });

    // Hide sidebar when clicking on a link (mobile)
    $('.sidebar-nav a').click(function() {
        if ($(window).width() < 768) {
            $('.sidebar').removeClass('active');
            $('body').removeClass('body-with-sidebar');
        }
    });

    const navToggle = document.querySelector('.nav-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebar = document.querySelector('.sidebar');
    
    // Toggle sidebar open
    navToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
    });
    
    // Toggle sidebar closed
    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
    
    // Close sidebar when clicking outside (optional)
    document.addEventListener('click', function(event) {
        // If click is outside the sidebar and not on the toggle button
        if (!sidebar.contains(event.target) && 
            !navToggle.contains(event.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });

    $('.back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Smooth scrolling for all anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Initialize Glide.js for testimonials
    new Glide('.glide', {
        type: 'carousel',
        perView: 3,
        gap: 30,
        autoplay: 5000,
        breakpoints: {
            992: {
                perView: 2
            },
            768: {
                perView: 1
            }
        }
    }).mount();

    // Initialize Chart.js
    var ctx = document.getElementById('transformationChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Mindfulness', 'Stress Reduction', 'Cultural Awareness', 'Self-Awareness', 'Creativity', 'Life Satisfaction'],
            datasets: [{
                label: 'Before Travel',
                data: [30, 40, 35, 50, 45, 55],
                backgroundColor: 'rgba(42, 157, 143, 0.2)',
                borderColor: 'rgba(42, 157, 143, 0.7)',
                pointBackgroundColor: 'rgba(42, 157, 143, 1)',
            }, {
                label: 'After Travel',
                data: [70, 85, 80, 90, 75, 85],
                backgroundColor: 'rgba(231, 111, 81, 0.2)',
                borderColor: 'rgba(231, 111, 81, 0.7)',
                pointBackgroundColor: 'rgba(231, 111, 81, 1)',
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        }
    });

    // Initialize Map
    var map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add destination markers
    var destinations = [
        {name: "Bali, Indonesia", lat: -8.409518, lng: 115.188919},
        {name: "Kyoto, Japan", lat: 35.011665, lng: 135.768326},
        {name: "Santorini, Greece", lat: 36.393156, lng: 25.461509},
        {name: "Sedona, Arizona", lat: 34.869691, lng: -111.760990},
        {name: "Marrakech, Morocco", lat: 31.629472, lng: -7.981084},
        {name: "Reykjavik, Iceland", lat: 64.146582, lng: -21.942429}
    ];

    destinations.forEach(function(dest) {
        L.marker([dest.lat, dest.lng])
            .addTo(map)
            .bindPopup('<b>' + dest.name + '</b>');
    });

    // Hero Canvas Background with THREE.js
    function initHeroCanvas() {
        const canvas = document.getElementById('hero-canvas');
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        canvas.appendChild(renderer.domElement);
        
        // Create gradient background
        scene.background = new THREE.Color('#264653');
        
        // Add particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#e9c46a'
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 2;
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const newWidth = canvas.offsetWidth;
            const newHeight = canvas.offsetHeight;
            
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            
            renderer.setSize(newWidth, newHeight);
        });
    }
    
    // Initialize hero canvas if THREE.js is loaded
    if (typeof THREE !== 'undefined') {
        initHeroCanvas();
    }
});