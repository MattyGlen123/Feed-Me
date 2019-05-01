import { DOMelements } from "./base";

const createItem = (ingredient) => `<li class="">${ingredient}</li>`;

export const renderDetails = (recipe) => {
  
  const markup = `
    <img class="recipe-details__img" src="${recipe.img}" alt="${recipe.title}">
    <h3 class="">${recipe.title}</h3>
    <ul class="">
      ${recipe.ingredients.map(ingredient => createItem(ingredient)).join('')}
    </ul>
    <a href="${recipe.url}"><p>${recipe.author}</p></a>
  `;
  console.log(markup, recipe);
    DOMelements.recipeDetails.insertAdjacentHTML('afterbegin', markup);
}

export const clearDetails = () => DOMelements.recipeDetails.innerHTML = "";