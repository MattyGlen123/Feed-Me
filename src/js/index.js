import * as searchView from './view/searchView';
import Search from './modal/search';


// Global State of App
const state = {
  search: {},
  recipeArr: [],
  defaultIngredients:['beef', 'chicken']
};

// Preset querys
state.defaultIngredients = ['beef', 'chicken', 'fish', 'pasta'];


const controlSearch = async (item, userSearch = false) => {
  // Add new search object to state
  state.search[item] = new Search(item);
  
  // store results in state
  await state.search[item].getResults();

  // Create array of 4 recipes
  if(userSearch) {
    state.recipeArr = state.search[item].results.recipes.splice(0, 4);
  } else {
    state.recipeArr.push(state.search[item].results.recipes[0]);
  }

  // if state recipeArr has 4 item
  if(state.recipeArr.length === 4) {
    // prepare UI
    // clearLoader();
    
    // render results to UI
    searchView.renderRecipe(state.recipeArr);
  }
}


// Get data for default ingredients ex beef, chicken, pasta, lamb
state.defaultIngredients.forEach(item => {
  
  controlSearch(item);
});

