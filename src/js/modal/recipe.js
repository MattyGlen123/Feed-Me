export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    const key = '380e54aef1f0e9204bb643d77c675390';
    const result = await fetch(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
    let res = await result.json();
    this.title = res.recipe.title;
    this.author = res.recipe.publisher;
    this.img = res.recipe.image_url;
    this.url = res.recipe.source_url;
    this.ingredients = res.recipe.ingredients;
  }
}