export const DOMelements = {
  results: document.querySelector('.results'),
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.searchInput'),
  refreshBtn: document.querySelector('.refresh'),
  modal: document.querySelector('.modal'),
  return: document.querySelector('.modal-return'),
  card: document.querySelector('.card')
}

export const attachRecipeEvent = (list) => {
  Array.from(list).map(element => {
    element.addEventListener('click', () => {
      DOMelements.modal.classList.toggle('active');
      DOMelements.modal.classList.toggle('slide-in-out');
    }); 
  });
} 
