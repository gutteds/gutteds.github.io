document.getElementById('enterButton').addEventListener('click', function() {
  // Play music
  document.getElementById('backgroundMusic').play();

  // Hide landing page and show main content
  document.getElementById('landingPage').classList.add('hidden');
  document.getElementById('mainContent').classList.remove('hidden');
});

// 3D mouse movement effect
const container = document.querySelector('.container');

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  const x = (clientX / window.innerWidth - 0.5) * 30; // Increase range for more pronounced effect
  const y = (clientY / window.innerHeight - 0.5) * 30; // Increase range for more pronounced effect

  container.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

// Reset rotation when mouse leaves
container.addEventListener('mouseleave', () => {
  container.style.transform = 'rotateY(0deg) rotateX(0deg)';
});
