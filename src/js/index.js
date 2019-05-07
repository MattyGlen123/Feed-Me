import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import { DOMelements, attachRecipeEvent } from './view/base';
import Search from './modal/search';
import Recipe from './modal/recipe';



// Global State of App
const state = {
  search: {},
  recipeArr: [],
  currentIngredients:['beef', "pasta"]
}; 

// replaces current ingredients with User input value
const updatecurrentIngredients = (item) => state.currentIngredients = item;

const controlSearch = async (item, userSearch = false) => {
  // Add new search object to state
  state.search[item] = new Search(item);
  
  // store results in state
  await state.search[item].getResults();

  // if the user enters a value into the search input
  if(userSearch) {
    // Replace default ingredients with the user input 
    updatecurrentIngredients(item);

    // Use the new value to add 4 new recipes to state recipe array
    state.recipeArr = state.search[item].results.splice(0, 4);
  } else {
    // get 4 new recipes from state
    state.recipeArr.push(...state.search[item].results.splice(0, 1));
  }

  // if state has 4 recipes ready
  if(state.recipeArr.length === 4 || state.recipeArr.length === 2) {
    // prepare UI
    searchView.clearLoader();
    searchView.clearResults();

    // render results to UI
    searchView.renderRecipe(state.recipeArr);
  }

  // get current UI recipe
  const currentRecipeList = document.querySelectorAll('.recipe');
  // Add EventListener
  attachRecipeEvent(currentRecipeList);

}


// Get data for default ingredients ex beef, chicken, pasta, lamb
state.currentIngredients.forEach(item => {
  // Query api
  controlSearch(item);
});


// Search data
DOMelements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  // Get User input
  let query = searchView.getInput();
  
  // Prepare UI for results
  searchView.clearResults();
  searchView.renderLoader(DOMelements.results);
  
  // call API with user input
  controlSearch(query, true);
});

// used to reset UI recipes
const clearRecipeArr = () => state.recipeArr = [];


const userRecipeUpdate = () => {
  state.recipeArr = state.search[state.currentIngredients].results.splice(0, 4);
};


const defaultRecipeUpdate = () => {
  // remove old recipes
  clearRecipeArr();
  
  // Add next recipe from state to recipe array
  state.currentIngredients.forEach(item => {
    state.recipeArr.push(...state.search[item].results.splice(0, 1));
  });
} 


DOMelements.refreshBtn.addEventListener('click', () => {
  // update recipeArr with 4 new recipes from state
  if(typeof state.currentIngredients === 'string') {
    userRecipeUpdate();
  } else {
    defaultRecipeUpdate();
  }

  // prepare UI
  searchView.clearResults();
  searchView.renderLoader(DOMelements.results);
  
  // render new recipes
  searchView.clearLoader();
  searchView.renderRecipe(state.recipeArr);

  // get current UI recipe
  const currentRecipeList = document.querySelectorAll('.recipe');
  // Add EventListener
  attachRecipeEvent(currentRecipeList);
});


/**
 * Recipe Controller
 */

const controlRecipe = async () => {
  // get the id from the url
  const id = window.location.hash.replace('#', '');

  if(id) {
    // create new recipe object
    state.recipe = new Recipe(id);

    // get recipe data
    await state.recipe.getRecipe();

    // prepare UI from changes
    recipeView.clearDetails();

    // render recipe
    recipeView.renderDetails(state.recipe);

    // Add event listener to return button
    document.querySelector('.modal-return').addEventListener('click', () => {
      DOMelements.modal.classList.toggle('active');
      DOMelements.modal.classList.toggle('slide-in-out');
    });
  }
};


window.addEventListener('hashchange', controlRecipe);

