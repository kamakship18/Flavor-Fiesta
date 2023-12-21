// Get references to HTML elements using their IDs
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const searchLink = document.getElementById('searchButton')
const searchSection = document.getElementsByClassName("meal-whole");

// Add event listeners to buttons
searchBtn.addEventListener('click', getMealList); // Triggered when the search button is clicked
mealList.addEventListener('click', getMealRecipe); 
recipeCloseBtn.addEventListener('click', () => {
    // Close the meal details modal when the close button is clicked
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

/*
var submitButton = document.getElementById('search-btn');
submitButton.addEventListener('click', function() {
    var inputValue = document.getElementById('myInput').value;
    console.log('Input value:', inputValue);
});
*/

// Function to fetch and display a list of meals based on the search input
function getMealList() {
    let searchInputText = document.getElementById('searchInput').value;
    console.log(searchInputText);
    // Fetch data from the MealDB API based on the category search input
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputText}`)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data);
            let html = "";
            // Check if meals are found
            if (data.meals) {
                // Iterate through each meal and create HTML markup
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h2>${meal.strMeal}</h2>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
            } else {
                // Display a message if no meals are found
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            // Update the HTML content of the meal list container
            mealList.innerHTML = html;
        });
}

// Function to fetch and display the recipe details of a selected meal
function getMealRecipe(e) {
    e.preventDefault();
    // Check if the clicked element has the 'recipe-btn' class
    if (e.target.classList.contains('recipe-btn')) {
        // Get the parent element (meal item) of the clicked button
        let mealItem = e.target.parentElement.parentElement;
        // Fetch the recipe details based on the meal ID
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then((response) => { return response.json() })
            .then(data => mealRecipeModal(data.meals));
    }
}

// Function to create and display a modal with meal recipe details
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let inGrid= ""
    // Create HTML markup for the meal recipe modal
    for (let i = 1; i <= 20; i++) {
        if(`${meal['strIngredient' + i]}` === "" || `${meal['strIngredient' + i]}` == null){
        break
        }
    else{
        inGrid += `<ul><li>${meal['strIngredient' + i]}</li></ul>`;
    }
    }    
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
        <h2>Ingredients:</h2>
            <p>${inGrid}</p>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
            

        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    // Update the HTML content of the meal details container
    mealDetailsContent.innerHTML = html;
    // Display the meal details modal by adding the 'showRecipe' class
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Function to fetch and display a random recipe image
function getRandomList() {
    var randomList = document.getElementById('random1');
    // Fetch a random meal from the MealDB API
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((response) => { return response.json() })
        .then((data1) => {
            console.log(data1);
            // Append HTML markup for the random meal to the random list container
            randomList.innerHTML += `
                <div class="random-item" data-id="${data1.meals[0].idMeal}">
                    <div class="random-img">
                        <img src="${data1.meals[0].strMealThumb}" alt="food">
                    </div>
                    <div class="random-name">
                        <h2>${data1.meals[0].strMeal}</h2>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `;
            // Add an event listener to the random list for handling clicks
            document.getElementById("random1").addEventListener('click', getMealRecipe);
        });
}

// Call the function to fetch and display a random recipe image
getRandomList();

