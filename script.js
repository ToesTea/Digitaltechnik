var isValid;
var resultArray = []; // Declare resultArray outside of the validInput function
var binArrayResult = [];

document.addEventListener("DOMContentLoaded", function () {
  let binArray = [
    "011110000001",
    "001100011111",
    "111000111111",
    "000000000111",
    "000000001100",
  ].map((binaryString) => binaryString.split("").map((bit) => bit === "1"));

  console.log(binArray);

  let array = [
    "01010101010101010101010101010101",
    "00110011001100110011001100110011",
    "00001111000011110000111100001111",
    "00000000111111110000000011111111",
    "00000000000000001111111111111111",
  ].map((binaryString) => binaryString.split("").map((bit) => bit === "1"));

  console.log(array);

  document.getElementById("connectionInput").value = "";
  function handleInputChange() {
    var inputValue = document.getElementById("connectionInput").value;
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
    var valid = /^([0-9!&|\\/\-$() eE]+)$/; // Regular expression to match valid input format
    var operationsOnly = inputValue.replace(/[^!&|\\/\-$()]/g, ""); // Extract operations only
    var positionsOnly = inputValue.replace(/[^Ee0-9]/g, "").toUpperCase(); // Extract positions only
    var positionsArray = positionsOnly.split("E").filter(Boolean).map(Number); // Convert positions string to array of numbers

    if (valid.test(inputValue)) {
      document.getElementById("ball").style.backgroundColor = "green";
      isValid = true;

      var result = binArray[eArray[positionsArray[0] - 1] - 1]; // Initialize result with the binary array of the first position
      var binResult = array[eArray[positionsArray[0] - 1] - 1]; // Initialize result with the binary array of the first position

      for (var i = 0; i < operationsOnly.length; i++) {
        var operation = operationsOnly[i];
        var position = eArray[positionsArray[i + 1] - 1] - 1; // Adjust position to 0-based index

        switch (operation) {
          case "!":
            // NOT operation
            result = result.map((bit) => !bit);
            binResult = binResult.map((bit) => !bit);
            break;
          case "&":
            // AND operation
            result = result.map(
              (bit, index) => bit && binArray[position][index],
            );
            binResult = binResult.map(
              (bit, index) => bit && array[position][index],
            );
            break;
          case "|":
            // OR operation
            result = result.map(
              (bit, index) => bit || binArray[position][index],
            );
            binResult = binResult.map(
              (bit, index) => bit || array[position][index],
            );
            break;
          case "\\":
            // NOR operation
            result = result.map(
              (bit, index) => !(bit || binArray[position][index]),
            );
            binResult = binResult.map(
              (bit, index) => !(bit || array[position][index]),
            );
            break;
          case "/":
            // XOR operation
            result = result.map(
              (bit, index) => bit !== binArray[position][index],
            );
            binResult = binResult.map(
              (bit, index) => bit !== array[position][index],
            );
            break;
          case "-":
            // XNOR operation
            result = result.map(
              (bit, index) => bit === binArray[position][index],
            );
            binResult = binResult.map(
              (bit, index) => bit === array[position][index],
            );
            break;
          case "$":
            // NAND operation
            result = result.map(
              (bit, index) => !(bit && binArray[position][index]),
            );
            binResult = binResult.map(
              (bit, index) => !(bit && array[position][index]),
            );
            break;
          default:
            break;
        }
      }

      resultArray = [result]; // Update resultArray
      binArrayResult = [binResult]; // Update resultArray
    } else {
      document.getElementById("ball").style.backgroundColor = "red";
      isValid = false;
    }
    console.log(resultArray);
    console.log(binArrayResult);
  }

  document
    .getElementById("connectionInput")
    .addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        // 13 is the key code for Enter
        event.preventDefault(); // Prevent the default action to stop the form from being submitted
        document.getElementById("submit").click(); // Trigger the click event on the submit button
      }
    });

  // Create a paragraph for the output text
  var outputParagraph = document.createElement("p");
  outputParagraph.setAttribute("id", "outputText");
  document.body.appendChild(outputParagraph);
  var outputText = document.createElement("p");
  outputText.setAttribute("id", "outputParagraph");
  document.body.appendChild(outputText);

  document.getElementById("submit").addEventListener("click", function () {
    var outputText = document.getElementById("outputText");
    var outputParagraph = document.getElementById("outputParagraph");

    if (isValid) {
      console.log("Connection successful");

      // Convert boolean values in resultArray[0] to 0s and 1s
      var resultInBinary = resultArray[0].map((value) => (value ? 1 : 0));
      var binResultInBinary = binArrayResult[0].map((value) => (value ? 1 : 0));

      outputText.textContent = "Output: " + resultInBinary;
      outputParagraph.textContent = "Output: " + binResultInBinary;

      outputText.style.display = "block"; // Show the output text
      outputParagraph.style.display = "block"; // Show the output text
    } else {
      console.log("Connection failed");
      outputText.style.display = "none"; // Hide the output text
    }
  });

  var eArray = [];

  function pictureRandomizer() {
    var numbers = [1, 2, 3, 4, 5];

    // Shuffle the array
    var i;
    for (i = numbers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Join the shuffled numbers into a single string
    var shuffledString = numbers.join("");
    console.log(shuffledString);

    // Display images based on the shuffled order
    for (i = 0; i < shuffledString.length; i++) {
      var img = document.createElement("img");
      var image = document.createElement("img");
      img.src = `img/${shuffledString[i]}.png`;
      image.src = `img/${shuffledString[i]}.1.png`;
      document.body.appendChild(img);
      document.body.appendChild(image);
      linking(shuffledString[i]);
    }
  }
  pictureRandomizer();

  function linking(random) {
    eArray.push(random);
  }
});
