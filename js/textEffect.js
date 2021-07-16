// Wrap every letter in a span
var textWrapper = document.querySelector(".ml2");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml2 .letter",
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 350,
    // duration: 5950,
    delay: (el, i) => 70 * i,
  })
  .add({
    targets: ".ml2",
    opacity: 0,
    duration: 4500, //Tiempo en aparecer
    // duration: 5000,
    easing: "easeOutExpo",
    delay: 1000,
    // delay: 9000,
  });

//Text 2
var textWrapper2 = document.querySelector(".ml3");
textWrapper2.innerHTML = textWrapper2.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml3 .letter",
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 500,
    // duration: 5950,
    delay: (el, i) => 70 * i,
  })
  .add({
    targets: ".ml3",
    opacity: 0,
    duration: 7000,
    // duration: 5000,
    easing: "easeOutExpo",
    // delay: 1000,
    delay: 1000,
    // delay: 9000,
  });

//Text 3
var textWrapper3 = document.querySelector(".ml4");
textWrapper3.innerHTML = textWrapper3.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml4 .letter",
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 790,
    // duration: 5950,
    delay: (el, i) => 70 * i,
  })
  .add({
    targets: ".ml4",
    opacity: 0,
    duration: 8500,
    // duration: 5000,
    easing: "easeOutExpo",
    delay: 1000,
    // delay: 9000,
  });
