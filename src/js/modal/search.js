export default class Search {
  constructor(query) {
    this.query = query;
  }
  
  async getResults(query) {
    const key = '380e54aef1f0e9204bb643d77c675390';
    const result = await fetch(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
    let res = await result.json();
    this.results = res.recipes;
  }
}
  // 40730867ded85d610247e0f00abf6477 
  // 380e54aef1f0e9204bb643d77c675390 
  // https://www.food2fork.com/api/search?
  