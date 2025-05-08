//  background animation
document.addEventListener('DOMContentLoaded', function() {
    initThreeBackground();
    initTechParticles();
    addTextGlitchEffect();
    
    //  button hover sound effects
    const buttons = document.querySelectorAll('button, .app-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => playHoverSound());
    });
    
    //  team member images interactive
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            playHoverSound(200);
        });
    });
});

// THREE.js Background Animation
function initThreeBackground() {
    const container = document.querySelector('.background-animation');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 1);
    container.appendChild(renderer.domElement);
    
    //  grid
    const size = 100;
    const divisions = 50;
    const gridColor = 0x00ffaa;
    const gridHelper = new THREE.GridHelper(size, divisions, gridColor, 0x222222);
    scene.add(gridHelper);
    
    //  more 3D objects
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ffaa,
        wireframe: true
    });
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
        const particle = new THREE.Mesh(geometry, material);
        particle.position.x = Math.random() * 100 - 50;
        particle.position.y = Math.random() * 100 - 50;
        particle.position.z = Math.random() * 100 - 50;
        particle.scale.set(
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5
        );
        particles.push({
            mesh: particle,
            rotationSpeed: {
                x: Math.random() * 0.01,
                y: Math.random() * 0.01,
                z: Math.random() * 0.01
            },
            velocity: {
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05,
                z: (Math.random() - 0.5) * 0.05
            }
        });
        scene.add(particle);
    }
    
    // Position camera
    camera.position.z = 15;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        //  grid
        gridHelper.rotation.y += 0.001;
        
        //  particles
        particles.forEach(p => {
            p.mesh.rotation.x += p.rotationSpeed.x;
            p.mesh.rotation.y += p.rotationSpeed.y;
            p.mesh.rotation.z += p.rotationSpeed.z;
            
            p.mesh.position.x += p.velocity.x;
            p.mesh.position.y += p.velocity.y;
            p.mesh.position.z += p.velocity.z;
            
            // Bounce off invisible boundaries
            const boundsSize = 50;
            ['x', 'y', 'z'].forEach(axis => {
                if (Math.abs(p.mesh.position[axis]) > boundsSize) {
                    p.velocity[axis] *= -1;
                }
            });
        });
        
        //  rotate camera around the scene
        const radius = 20;
        const speed = 0.0005;
        camera.position.x = Math.sin(Date.now() * speed) * radius;
        camera.position.z = Math.cos(Date.now() * speed) * radius;
        camera.lookAt(0, 0, 0);
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

//  tech particles for hero sections
function initTechParticles() {
    const techParticlesContainers = document.querySelectorAll('.tech-particles');
    if (techParticlesContainers.length === 0) return;
    
    techParticlesContainers.forEach(container => {
        // Create binary code particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('binary-particle');
            particle.textContent = Math.random() > 0.5 ? '1' : '0';
            
            // Random position
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            
            // Random size and opacity
            const size = Math.random() * 12 + 8;
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Set styles
            particle.style.position = 'absolute';
            particle.style.top = `${top}%`;
            particle.style.left = `${left}%`;
            particle.style.fontSize = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.color = Math.random() > 0.3 ? '#00ffaa' : '#0088ff';
            
            // Animation
            particle.style.animation = `float ${Math.random() * 10 + 5}s infinite linear`;
            
            container.appendChild(particle);
        }
    });
    
    //  CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

//  glitch text effect to important headings
function addTextGlitchEffect() {
    const titles = document.querySelectorAll('h1, .section-title');
    titles.forEach(title => {
        title.addEventListener('mouseover', () => {
            title.classList.add('glitch-text');
            setTimeout(() => {
                title.classList.remove('glitch-text');
            }, 1000);
        });
    });
    
    //  CSS for the glitch effect
    const style = document.createElement('style');
    style.textContent = `
        .glitch-text {
            animation: glitch 0.5s linear forwards;
        }
        
        @keyframes glitch {
            0% {
                text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                             -0.05em -0.025em 0 rgba(0, 255, 170, 0.75),
                             -0.025em 0.05em 0 rgba(0, 136, 255, 0.75);
            }
            15% {
                text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                             0.025em 0.025em 0 rgba(0, 255, 170, 0.75),
                             -0.05em -0.05em 0 rgba(0, 136, 255, 0.75);
            }
            50% {
                text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                             0.05em 0 0 rgba(0, 255, 170, 0.75),
                             0 -0.05em 0 rgba(0, 136, 255, 0.75);
            }
            100% {
                text-shadow: -0.025em 0 0 rgba(255, 0, 255, 0.75),
                             -0.025em -0.025em 0 rgba(0, 255, 170, 0.75),
                             -0.025em -0.05em 0 rgba(0, 136, 255, 0.75);
            }
        }
    `;
    document.head.appendChild(style);
}

// Sound effect for interactive elements
function playHoverSound(frequency = 400) {
    // Check if AudioContext is supported
    if (window.AudioContext || window.webkitAudioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.1;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        
        // Quick fade out
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        setTimeout(() => {
            oscillator.stop();
        }, 200);
    }
}

//  custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Add CSS for custom cursor
    const style = document.createElement('style');
    style.textContent = `
        body {
            cursor: none;
        }
        
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00ffaa;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            mix-blend-mode: difference;
        }
        
        .custom-cursor::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 5px;
            height: 5px;
            background-color: #00ffaa;
            border-radius: 50%;
        }
        
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
            width: 40px;
            height: 40px;
            border-color: #0088ff;
        }
    `;
    document.head.appendChild(style);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Change cursor style on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .team-member, .reason, .opportunity, .join-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
});

// Matrix code rain effect for hero sections
/*
document.addEventListener('DOMContentLoaded', function() {
    const heroSections = document.querySelectorAll('.hero');
    heroSections.forEach(section => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.3';
        section.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
        const matrixChars = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#00ffaa";
            ctx.font = fontSize + "px monospace";
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
    });
});
*/