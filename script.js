document.addEventListener("DOMContentLoaded", function () {

    //carousel parameters
    const track = document.getElementById("carousel-track");
    const logos = [...track.children];
  
  
    //carousel logic
    // Clone the logos for infinite scrolling effect
    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
  
  
});
  