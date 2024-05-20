// test.js
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    document.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            currentSectionIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
        } else {
            currentSectionIndex = Math.max(0, currentSectionIndex - 1);
        }
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    });
});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
