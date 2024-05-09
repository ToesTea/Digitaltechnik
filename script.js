let isValid;
let resultArray = []; // Declare resultArray outside of the validInput function

document.addEventListener("DOMContentLoaded", function () {
  const eArray = [];
  const binArray = [];

  // Part 1
  binArray.push([
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
  ]);

  // Part 2
  binArray.push([
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
  ]);

  // Part 3
  binArray.push([
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  // Part 4
  binArray.push([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
  ]);

  // Part 5
  binArray.push([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
  ]);

  // Accessing values
  console.log(binArray[0]); // Output: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1] (Part 1)
  console.log(binArray[1]); // Output: [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1] (Part 2)
  console.log(binArray[2]); // Output: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1] (Part 3)
  console.log(binArray[3]); // Output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1] (Part 4)
  console.log(binArray[4]); // Output: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0] (Part 5)

  function handleInputChange() {
    const inputValue = document.getElementById("connectionInput").value;
    if (!inputValue) {
      document.getElementById("ball").style.backgroundColor = "gray";
      isValid = false;
    } else {
      validInput(inputValue);
    }
  }

  handleInputChange();

  document
      .getElementById("connectionInput")
      .addEventListener("input", handleInputChange);

  function validInput(inputValue) {
    const valid = /^([0-9!&|\\/\-$() eE]+)$/; // Regular expression to match valid input format
    const operationsOnly = inputValue.replace(/[^!&|\\/\-$()]/g, ""); // Extract operations only
    const positionsOnly = inputValue.replace(/[^Ee0-9]/g, "").toUpperCase(); // Extract positions only
    const positionsArray = positionsOnly.split("E").filter(Boolean).map(Number); // Convert positions string to array of numbers

    if (valid.test(inputValue)) {
      document.getElementById("ball").style.backgroundColor = "green";
      isValid = true;

      let result = binArray[eArray[positionsArray[0] - 1] - 1]; // Initialize result with the binary array of the first position

      for (let i = 0; i < operationsOnly.length; i++) {
        const operation = operationsOnly[i];
        const position = eArray[positionsArray[i + 1] - 1] - 1; // Adjust position to 0-based index

        switch (operation) {
          case "!":
            // NOT operation
            result = result.map((bit) => !bit);
            break;
          case "&":
            // AND operation
            result = result.map((bit, index) => bit && binArray[position][index]);
            break;
          case "|":
            // OR operation
            result = result.map((bit, index) => bit || binArray[position][index]);
            break;
          case "\\":
            // NOR operation
            result = result.map((bit, index) => !(bit || binArray[position][index]));
            break;
          case "/":
            // XOR operation
            result = result.map((bit, index) => bit !== binArray[position][index]);
            break;
          case "-":
            // XNOR operation
            result = result.map((bit, index) => bit === binArray[position][index]);
            break;
          case "$":
            // NAND operation
            result = result.map((bit, index) => !(bit && binArray[position][index]));
            break;
          default:
            break;
        }
      }

      resultArray = [result]; // Update resultArray
    } else {
      document.getElementById("ball").style.backgroundColor = "red";
      isValid = false;
    }
    console.log(resultArray);
  }

  document.getElementById("submit").addEventListener("click", function () {
    if (isValid) {
      console.log("Connection successful");

      // Display the final bit combination on the website
      const bitCombinationContainer = document.createElement("div");
      bitCombinationContainer.setAttribute("id", "bitCombinationContainer");

      // Get the input value
      const inputValue = document.getElementById("connectionInput").value;

      // Create a paragraph for the input value
      const bitParagraph = document.createElement("p");

      // Convert boolean values in resultArray[0] to 0s and 1s
      const resultInBinary = resultArray[0].map(value => value ? 1 : 0);

      bitParagraph.textContent = inputValue + ": " + resultInBinary;
      bitCombinationContainer.appendChild(bitParagraph);

      document.body.appendChild(bitCombinationContainer);
    } else {
      console.log("Connection failed");
    }
  });


  function pictureRandomizer() {
    let i;
    const numbers = [1, 2, 3, 4, 5];

    // Shuffle the array
    for (i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Join the shuffled numbers into a single string
    const shuffledString = numbers.join("");
    console.log(shuffledString);

    // Display images based on the shuffled order
    for (i = 0; i < shuffledString.length; i++) {
      const img = document.createElement("img");
      img.src = `img/${shuffledString[i]}.png`;
      document.body.appendChild(img);
      linking(shuffledString[i]);
    }
  }
  pictureRandomizer();

  function linking(random) {
    eArray.push(random);
  }
});
