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

  // practise data
  // author: "The Pioneer Woman"
  // id: "47025"
  // img: "http://static.food2fork.com/pestoa0e7.jpg"
  // ingredients: (11) ["3/4 cups Fresh Basil Leaves", "1/2 cup Grated Parmesan Cheese", "3 Tablespoons Pine Nuts", "2 cloves Garlic, Peeled", "Salt And Pepper, to taste", "1/3 cup Extra Virgin Olive Oil", "1/2 cup Heavy Cream", "2 Tablespoons Butter", "1/4 cup Grated Parmesan (additional)", "12 ounces, weight Pasta (cavitappi, Fusili, Etc.)", "2 whole Tomatoes, Diced"]
  // title: "Pasta with Pesto Cream Sauce"
  // url: "http://thepioneerwoman.com/cooking/2011/06/pasta-with-pesto-cream-sauce/"
  