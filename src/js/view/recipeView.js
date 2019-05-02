import { DOMelements } from "./base";

const createItem = (ingredient) => `<li class="">${ingredient}</li>`;

export const renderDetails = (recipe) => {
  
  const markup = `
    <span class="modal-return"><i class="fas fa-arrow-left"></i></span>
    <div class="modal-image" style="background-image: url('${recipe.img}')"></div>
    <h2 class="modal-title">${recipe.title}</h2>
    <ul class="modal-list">
      ${recipe.ingredients.map(ingredient => createItem(ingredient)).join('')}
    </ul>
  `;
  
  DOMelements.modal.insertAdjacentHTML('afterbegin', markup);
}

export const clearDetails = () => DOMelements.modal.innerHTML = "";