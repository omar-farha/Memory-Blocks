document.querySelector(".control-button span").onclick = function () {
  let yourName = prompt("What is your name?");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-button").remove();
};

let duration = 1000;

let blockContainer = document.querySelector(".game-container");

let blocks = Array.from(blockContainer.children);

let orderChange = [...Array(blocks.length).keys()];

shuffle(orderChange);
// Css order
blocks.forEach((block, index) => {
  block.style.order = orderChange[index];

  // add flip
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// flip function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// stop clicking function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blockContainer.classList.add("no-clicking");

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

// check for matched blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (
    firstBlock.getAttribute("data-technology") ===
    secondBlock.getAttribute("data-technology")
  ) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}
// shuffle function
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // random number
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
