window.addEventListener(
  "load",
  () => {
    console.log("Ironmaker app started successfully!");
  },
  false
);

document.getElementById("recipe").onkeyup = function() {
  let keyword = document.getElementById("recipe").value;
  axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${keyword}&apiKey=4bbde67ea47345b69767d4d3093f0fe5`
    )
    .then(result => {
      console.log(result.data);
    });
};
