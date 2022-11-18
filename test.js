// create a function which takes in a string parameter and returns the string with the first letter capitalized

function capitalizeFirstLetter(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}

// call above function

capitalizeFirstLetter("hello");
