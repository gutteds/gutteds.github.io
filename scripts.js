// Add smooth scrolling to all links
document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior
    const targetID = this.getAttribute('href');
    window.scrollTo({
      top: document.querySelector(targetID).offsetTop,
      behavior: 'smooth'
    });
  });
});

// Add hover effects with JavaScript (optional)
const links = document.querySelectorAll('.links a');
links.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = '#ff0';  // Change color on hover
    link.style.transform = 'scale(1.2)'; // Scale effect
  });
  link.addEventListener('mouseout', () => {
    link.style.color = '';  // Revert color
    link.style.transform = '';  // Revert scale
  });
});
