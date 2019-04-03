export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    const key = '40730867ded85d610247e0f00abf6477';
    const result = await fetch(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
    let res = await result.json();
    this.title = res.recipe.title;
    this.author = res.recipe.publisher;
    this.img = res.recipe.image_url;
    this.url = res.recipe.source_url;
    this.ingredients = res.recipe.ingredients;
  }
}