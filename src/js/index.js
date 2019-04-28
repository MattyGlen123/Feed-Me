import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import { DOMelements } from './view/base';
import Search from './modal/search';
import Recipe from './modal/recipe';



// Global State of App
const state = {
  search: {},
  recipeArr: [],
  currentIngredients:['beef', 'chicken', 'salad', 'pasta']
};


// replace current ingredients with User input value
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

  // if state recipeArr has 4 item
  if(state.recipeArr.length === 4) {
    // prepare UI
    searchView.clearLoader();
    searchView.clearResults();

    // render results to UI
    searchView.renderRecipe(state.recipeArr);
  }
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
  
  // Query api
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
});


/**
 * Recipe Controller
 */

const controlRecipe = async () => {
  // get the id from the url
  const id = window.location.hash.replace('#', '');

  if(id) {
    // prepare UI from changes
    recipeView.clearDetails();

    // create new recipe object
    state.recipe = new Recipe(id);

    // get recipe data
    await state.recipe.getRecipe();

    // render recipe
    recipeView.renderDetails(state.recipe);
  }
};

window.addEventListener('hashchange', controlRecipe);