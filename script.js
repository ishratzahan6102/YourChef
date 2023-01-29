const searchBtn = document.getElementById('search-Btn');
const mealList = document.getElementById('meal');
const mealDetailsContent= document.querySelector('.meal-details-content');
const recipeCloseButton = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);


recipeCloseButton.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data=> {
       let html = "";
       if(data.meals){
        console.log(data.meals.slice([0], [10]))
        data.meals.slice([0], [7]).map(meal => {
                html +=`
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <div class="part-1">
                                <p>6 minutes ago</p>
                
                                <div>
                                    <i></i>
                                    <p>${meal.idMeal}</p>
                                </div>
            
                            </div>
                            <h3>${meal.strMeal}</h3>
                            <p class="part-3">By<span> Chef John</span></p>

                            

                           
                         
                            <a href="#" class="recipe-btn">Get Recipe</a>
                           
                           


                        </div>
                    </div> 


                    
                `;
           });

        mealList.classList.remove('notFound');
       } else{
           html = "Sorry, we couldn't find anything! Make 2 minute maggie.";
           mealList.classList.add('notFound');
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
            .then(response => response.json())
            .then(data => mealRecipeModel(data.meals));
    }
}
function mealRecipeModel(meal){
    console.log(meal);
    meal= meal[0];
    let html = `
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt = "">
            </div>
            <div>
                <h2 class="recipe-title">${meal.strMeal}</h2>
                <h3>Ingredient List : </h3>
                <ul class= "ingredients-list">
                <li>${meal.strMeasure1} ${meal.strIngredient1} , ${meal.strMeasure2} ${meal.strIngredient2}, ${meal.strMeasure3} ${meal.strIngredient3}, ${meal.strMeasure4} ${meal.strIngredient4}, ${meal.strMeasure5} ${meal.strIngredient5}, ${meal.strMeasure6} ${meal.strIngredient6}, ${meal.strMeasure7} ${meal.strIngredient7}, ${meal.strMeasure8} ${meal.strIngredient8}, ${meal.strMeasure9} ${meal.strIngredient9}, ${meal.strMeasure10} ${meal.strIngredient10}</li>
                </ul>
            <div>
                <h3>Instructions : </h3>
                <p>${meal.strInstructions}</p>
            </div>
            
            <div class = "recipe-link">
                <a href="${meal.strYoutube}" target="_blank">Watch recipe on  Youtube</a>
            </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

getMealList("");


function sendEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "emailcheck2023@gmail.com",
        Password : "B395357BE745EB06AD1DB81A6F3CDDC77989",
        To : "emailcheck2023@gmail.com",
        From : "emailcheck2023@gmail.com",
        Subject : "This is the subject",
        Body : "Name : " + document.getElementById('name').value 
        + "<br> Email : " + document.getElementById('email').value
        + "<br> Phone : " + document.getElementById('phone').value
        + "<br> Requested Recipe : " + document.getElementById('recipe').value
        + "<br> Message : " + document.getElementById('message').value
    }).then(
      message => alert("Thanks for your message.")
    );
}


// emailcheck2023@gmail.com
// EmailCheck#23

