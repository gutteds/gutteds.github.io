document.addEventListener('DOMContentLoaded', () => {
    const soundIcon = document.getElementById('sound-icon');
    const audioPlayer = document.getElementById('audio-player');
    const closePlayer = document.getElementById('close-player');
    const audio = document.getElementById('audio');
    const progressBar = document.getElementById('progress-bar');
    const songName = document.getElementById('song-name');
    
    songName.textContent = "Your Song Name";
    audio.src = "https://files.catbox.moe/v62kpu.mp3";

    soundIcon.addEventListener('click', () => {
        audioPlayer.style.display = 'block';
        audio.play();
    });

    closePlayer.addEventListener('click', () => {
        audioPlayer.style.display = 'none';
        audio.pause();
        audio.currentTime = 0;
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    const canvas = document.getElementById('background-effect');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedY = Math.random() * 1 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.active = true;
        }

        update() {
            if (this.active) {
                this.y += this.speedY;
                this.x += this.speedX;
                if (this.y > canvas.height) {
                    this.reset();
                }
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        reset() {
            this.active = true;
            this.y = 0;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 5 + 1;
            this.speedY = Math.random() * 1 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let particle of particlesArray) {
            particle.update();
            particle.draw();
        }

        let pileHeight = canvas.height;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, pileHeight, canvas.width, canvas.height - pileHeight);

        for (let particle of particlesArray) {
            if (particle.y >= canvas.height) {
                particle.y = canvas.height;
                particle.active = false;
            } else {
                pileHeight = Math.min(pileHeight, particle.y + particle.size);
            }
        }

        particlesArray.filter(particle => !particle.active).forEach(particle => particle.reset());

        requestAnimationFrame(animate);
    }

    document.getElementById('welcome-text').addEventListener('click', function () {
        document.getElementById('welcome-screen').style.display = 'none';
        
        const mainContent = document.getElementById('main-content');
        mainContent.style.display = 'block';
        mainContent.classList.add('fade-in');

        const audio = document.getElementById('background-music');
        audio.play();

        typeWord();
        initParticles();
        animate();
    });

    const words = ["javascript", "python", "c++", "html", "css"];
    let wordIndex = 0;
    let letterIndex = 0;
    const typingText = document.getElementById("typing-text");

    function typeWord() {
        if (letterIndex < words[wordIndex].length) {
            typingText.textContent += words[wordIndex].charAt(letterIndex);
            letterIndex++;
            setTimeout(typeWord, 150);
        } else {
            setTimeout(removeWord, 1000);
        }
    }

    function removeWord() {
        if (letterIndex > 0) {
            typingText.textContent = words[wordIndex].substring(0, letterIndex);
            letterIndex--;
            setTimeout(removeWord, 100);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            letterIndex = 0;
            typingText.textContent = "";
            setTimeout(typeWord, 500);
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
