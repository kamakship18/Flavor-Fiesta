 const searchBtn = document.getElementById('search-btn');
 const mealList = document.getElementById('meal');
 const mealDetailsContent = document.querySelector('.meal-details-content');
 const recipeCloseBtn = document.getElementById('recipe-close-btn');

//  event listeners
 searchBtn.addEventListener('click', getMealList);
 mealList.addEventListener('click', getMealRecipe);
 console.log(recipeCloseBtn)
 recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//var submitButton = document.getElementById('search-btn'); submitButton.addEventListener('click', function() {
//var inputValue = document.getElementById('myInput').value;
//console.log('Input value:', inputValue);
//});

function getMealList() {
    let searchInputText = document.getElementById('searchInput').value;
    console.log(searchInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputText}`)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data);
            let html = "";
            if(data.meals){
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}" >
                        <div class ="meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food" >
                        </div>
                        <div class = "meal-name">
                            <h2>${meal.strMeal}</h2>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                    `;
                });
            }else{
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound')
            }
            
          mealList.innerHTML = html;  
        });
}

  // get recipe of the meal
  function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;  
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then((response) => { return response.json() })
        .then(data => mealRecipeModal(data.meals));
            //console.log(data);
        }
    }

 // create a modal
 function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
                  <p class = "recipe-category">${meal.strCategory}</p>
                  <div class = "recipe-instruct">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                  </div>
                  <div class = "recipe-meal-img">
                    <img src = "${meal.strMealThumb}" alt = "">
                  </div>
                  <div class = "recipe-link">
                    <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
                  </div> 
    `; 
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
 } 



 // random recipe part image
 function getRandomList() {
     var randomList = document.getElementById('random1');
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((response) => { return response.json() })
        .then((data1) => {
            console.log(data1);
            // let html = "";
            // if(data1.meals){
                // data1.meals.forEach(meal => {
                    randomList.innerHTML += `
                    <div class = "random-item" data-id = "${data1.meals[0].idMeal}" >
                        <div class ="random-img">
                            <img src = "${data1.meals[0].strMealThumb}" alt = "food" >
                        </div>
                        <div class = "random-name">
                            <h2>${data1.meals[0].strMeal}</h2>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                    `;
                // });
            // }else{
            //     html = "Sorry, we didn't find any meal!";
            //     random1.classList.add('notFound')
            // }  
            document.getElementById("random1").addEventListener('click', getMealRecipe);

            // document.getElementById("random-item").addEventListener('click', getMealRecipe);
        });
}
getRandomList() 