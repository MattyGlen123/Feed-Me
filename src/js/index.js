import * as searchView from './view/searchView';
import Search from './modal/search';


// Global State of App
const state = {
  search: {}
};

// Preset querys
state.defaultIngredients = ['beef', 'chicken'];


const controlSearch = async (item) => {
  // 1. add new search object to state
  state.search[item] = new Search(item);
  // 2. Prepare UI for results
  
  // 3. store results in state
  await state.search[item].getResults();
  // 4. Render Results
  searchView.renderRecipe(state.search[item].results.recipes[0]);
}


state.defaultIngredients.forEach(item => {
  controlSearch(item);
});