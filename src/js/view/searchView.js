import { DOMelements } from "./base";

export const getInput = () => DOMelements.searchInput.value;


export const clearResults = () => DOMelements.results.innerHTML = '';

export const renderLoader = parentElement => {
  const loader = `
    <div class="loader">
      <i class="fa fa-spinner loader__icon"></i>
    </div>
`;
  parentElement.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if(loader) loader.parentElement.removeChild(loader);
}


export const renderRecipe = recipeArr => {
    let markup = ``;
    recipeArr.forEach(recipe => {
      markup += `
      <a class="recipe" href="#${recipe.recipe_id}">
        <div class="recipe__card" id="${recipe.recipe_id}">
          <img class="recipe__img" src="${recipe.image_url}" alt="${recipe.title}">
          <p class="recipe__title">${recipe.title}</p>
        </div>
      </a>
    `;
    });
      
    DOMelements.results.insertAdjacentHTML('afterbegin', markup);
  }