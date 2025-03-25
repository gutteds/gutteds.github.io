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


let mouseX = 0,
    mouseY = 0;
let lastX = 0,
    lastY = 0;
let deltaX = 0,
    deltaY = 0;
let isHoveringUI = false;

const dynamicUI = document.getElementById('dynamic-ui');
if (dynamicUI) {
    dynamicUI.addEventListener('mouseenter', () => {
        isHoveringUI = true;
    });

    dynamicUI.addEventListener('mouseleave', () => {
        isHoveringUI = false;
        dynamicUI.style.transform = 'translate(-50%, -50%)';
    });
}

document.addEventListener('mousemove', (event) => {
    if (isHoveringUI && dynamicUI) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        deltaX = mouseX - lastX;
        deltaY = mouseY - lastY;

        updateParallax();

        lastX = mouseX;
        lastY = mouseY;
    }
});

function updateParallax() {
    const x = (mouseX - window.innerWidth / 2) / 30;
    const y = (mouseY - window.innerHeight / 2) / 30;

    dynamicUI.style.transform = `translate(-50%, -50%) perspective(1200px) rotateY(${x}deg) rotateX(${y}deg)`;
    dynamicUI.style.transition = 'transform 0.1s ease-out';
}


const star = [];
const star_x = [];
const star_y = [];
const star_remaining_ticks = [];
const tiny = [];
const tiny_x = [];
const tiny_y = [];
const tiny_remaining_ticks = [];
const sparkles = 250;
const sparkle_lifetime = 30;
const sparkle_distance = 30;

let doc_height;
let doc_width;
let sparkles_enabled = null;

window.onload = function() {

    doc_height = document.documentElement.scrollHeight;
    doc_width = document.documentElement.scrollWidth;

    animate_sparkles();
    if (sparkles_enabled === null) {
        sparkle(true);
    }
};

function sparkle(enable = null) {
    if (enable === null) {
        sparkles_enabled = !sparkles_enabled;
    } else {
        sparkles_enabled = !!enable;
    }

    if (sparkles_enabled && star.length < sparkles) {
        sparkle_init();
    }
}


function sparkle_destroy() {

    let elem;
    while (tiny.length) {
        elem = tiny.pop();
        if (elem) {
            document.body.removeChild(elem);
        }
    }

    while (star.length) {
        elem = star.pop();
        if (elem) {
            document.body.removeChild(elem);
        }
    }
}

function sparkle_init() {

    function create_div(height, width) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.height = height + "px";
        div.style.width = width + "px";
        div.style.overflow = "hidden";
        return (div);
    }

    for (let i = 0; i < sparkles; i++) {

        const tiny_div = create_div(3, 3);
        tiny_div.style.visibility = "hidden";
        tiny_div.style.zIndex = "999";

        if (tiny[i]) {
            document.body.removeChild(tiny[i])
        }

        document.body.appendChild(tiny_div);
        tiny[i] = tiny_div;
        tiny_remaining_ticks[i] = null;

        const star_div = create_div(5, 5);
        star_div.style.backgroundColor = "transparent";
        star_div.style.visibility = "hidden";
        star_div.style.zIndex = "999";

        const bar_horiz = create_div(1, 5);
        const bar_vert = create_div(5, 1);
        star_div.appendChild(bar_horiz);
        star_div.appendChild(bar_vert);
        bar_horiz.style.top = "2px";
        bar_horiz.style.left = "0px";
        bar_vert.style.top = "0px";
        bar_vert.style.left = "2px";

        if (star[i]) {
            document.body.removeChild(star[i])
        }

        document.body.appendChild(star_div);
        star[i] = star_div;
        star_remaining_ticks[i] = null;
    }

    window.addEventListener('resize', function() {

        for (let i = 0; i < sparkles; i++) {
            star_remaining_ticks[i] = null;
            star[i].style.left = "0px";
            star[i].style.top = "0px";
            star[i].style.visibility = "hidden";

            tiny_remaining_ticks[i] = null;
            tiny[i].style.top = '0px';
            tiny[i].style.left = '0px';
            tiny[i].style.visibility = "hidden";
        }

        doc_height = document.documentElement.scrollHeight;
        doc_width = document.documentElement.scrollWidth;
    });

    document.onmousemove = function(e) {
        if (sparkles_enabled && !e.buttons) {

            const distance = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
            const delta_x = e.movementX * sparkle_distance * 2 / distance;
            const delta_y = e.movementY * sparkle_distance * 2 / distance;
            const probability = distance / sparkle_distance;
            let cumulative_x = 0;

            let mouse_y = e.pageY;
            let mouse_x = e.pageX;

            while (Math.abs(cumulative_x) < Math.abs(e.movementX)) {
                create_star(mouse_x, mouse_y, probability);

                let delta = Math.random();
                mouse_x -= delta_x * delta;
                mouse_y -= delta_y * delta;
                cumulative_x += delta_x * delta;
            }
        }
    };
}

function animate_sparkles(fps = 60) {
    const interval_milliseconds = 1000 / fps;

    let alive = 0;

    for (let i = 0; i < star.length; i++) {
        alive += update_star(i);
    }

    for (let i = 0; i < tiny.length; i++) {
        alive += update_tiny(i);
    }

    if (alive === 0 && !sparkles_enabled) {
        sparkle_destroy();
    }

    setTimeout("animate_sparkles(" + fps + ")", interval_milliseconds);
}

function create_star(x, y, probability = 1.0) {

    if (x + 5 >= doc_width || y + 5 >= doc_height) {
        return;
    }

    if (Math.random() > probability) {
        return;
    }

    function get_random_color() {

        let c = [];
        c[0] = 255;
        c[1] = Math.floor(Math.random() * 256);
        c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
        c.sort(function() {
            return (0.5 - Math.random());
        });
        return ("rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")");
    }

    let min_lifetime = sparkle_lifetime * 2 + 1;
    let min_index = NaN;
    for (let i = 0; i < sparkles; i++) {
        if (!star_remaining_ticks[i]) {
            min_lifetime = null;
            min_index = i;
            break;
        } else if (star_remaining_ticks[i] < min_lifetime) {
            min_lifetime = star_remaining_ticks[i];
            min_index = i;
        }
    }

    if (min_lifetime) {
        star_to_tiny(min_index);
    }

    if (min_index >= 0) {
        const cursorEffectsColor = document.getElementById('curEffClr') ? .innerHTML || '#ffffff';

        star_remaining_ticks[min_index] = sparkle_lifetime * 2;
        star_x[min_index] = x;
        star[min_index].style.left = x + "px";
        star_y[min_index] = y;
        star[min_index].style.top = y + "px";
        star[min_index].style.clip = "rect(0px, 5px, 5px, 0px)";
        star[min_index].childNodes[0].style.backgroundColor =
            star[min_index].childNodes[1].style.backgroundColor = `${cursorEffectsColor} `;
        star[min_index].style.visibility = "visible";
        return min_index
    }

}

function update_star(i) {
    if (star_remaining_ticks[i] === null) {
        return false;
    }

    star_remaining_ticks[i] -= 1;

    if (star_remaining_ticks[i] === 0) {
        star_to_tiny(i);
        return false;
    }

    if (star_remaining_ticks[i] === sparkle_lifetime) {
        star[i].style.clip = "rect(1px, 4px, 4px, 1px)"
    }

    if (star_remaining_ticks[i] > 0) {
        star_y[i] += 1 + 3 * Math.random();
        star_x[i] += (i % 5 - 2) / 5;

        if (star_y[i] + 5 < doc_height && star_x[i] + 5 < doc_width) {
            star[i].style.top = star_y[i] + "px";
            star[i].style.left = star_x[i] + "px";
            return true;
        }
    }

    star_remaining_ticks[i] = null;
    star[i].style.left = "0px";
    star[i].style.top = "0px";
    star[i].style.visibility = "hidden";
    return false;
}

function star_to_tiny(i) {
    if (star_remaining_ticks[i] === null) {
        return;
    }

    if (star_y[i] + 3 < doc_height && star_x[i] + 3 < doc_width) {
        tiny_remaining_ticks[i] = sparkle_lifetime * 2;
        tiny_y[i] = star_y[i];
        tiny[i].style.top = star_y[i] + "px";
        tiny_x[i] = star_x[i];
        tiny[i].style.left = star_x[i] + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
    }

    star_remaining_ticks[i] = null;
    star[i].style.left = "0px";
    star[i].style.top = "0px";
    star[i].style.visibility = "hidden";
}

function update_tiny(i) {
    if (tiny_remaining_ticks[i] === null) {
        return false;
    }

    tiny_remaining_ticks[i] -= 1;

    if (tiny_remaining_ticks[i] === sparkle_lifetime) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }

    if (tiny_remaining_ticks[i] > 0) {
        tiny_y[i] += 1 + 2 * Math.random();
        tiny_x[i] += (i % 4 - 2) / 4;

        if (tiny_y[i] + 3 < doc_height && tiny_x[i] + 3 < doc_width) {
            tiny[i].style.top = tiny_y[i] + "px";
            tiny[i].style.left = tiny_x[i] + "px";
            return true
        }
    }

    tiny_remaining_ticks[i] = null;
    tiny[i].style.top = '0px';
    tiny[i].style.left = '0px';
    tiny[i].style.visibility = "hidden";
    return false
}
