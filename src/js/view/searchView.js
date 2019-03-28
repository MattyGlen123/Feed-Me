import { DOMelements } from "./base";

export const renderRecipe = recipe => {
  const markup = `
    <div class="recipe" id="${recipe.recipe_id}">
      <img class="recipe__img" src="${recipe.image_url}" alt="${recipe.title}">
      <p class="recipe__title">${recipe.title}</p>
    </div>
  `;
  
  DOMelements.results.insertAdjacentHTML('afterbegin', markup);
}