document.getElementById('welcome-text').addEventListener('click', function() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Start the typing effect after clicking to enter
    typeWord();
});

const words = ["OSINT | CSINT", "discord @pzrc", "rfz is a cute little skid",]; // Words to cycle through
let wordIndex = 0;
let letterIndex = 0;
const typingText = document.getElementById("typing-text");

function typeWord() {
    if (letterIndex < words[wordIndex].length) {
        typingText.textContent += words[wordIndex].charAt(letterIndex);
        letterIndex++;
        setTimeout(typeWord, 150); // Speed of typing
    } else {
        setTimeout(removeWord, 1000); // Wait before removing
    }
}

function removeWord() {
    if (letterIndex > 0) {
        typingText.textContent = words[wordIndex].substring(0, letterIndex);
        letterIndex--;
        setTimeout(removeWord, 100); // Speed of removing
    } else {
        wordIndex = (wordIndex + 1) % words.length; // Cycle through words
        letterIndex = 0; // Reset letter index for the next word
        typingText.textContent = ""; // Clear the text before typing the next word
        setTimeout(typeWord, 500); // Wait before typing the next word
    }
}
document.getElementById('welcome-text').addEventListener('click', function() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Play the background music
    const audio = document.getElementById('background-music');
    audio.play();
    
    // Start the typing effect after clicking to enter
    typeWord();
});
