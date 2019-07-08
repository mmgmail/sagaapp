import { URL } from 'AppConstans';

export class Api {
  static async getSomeData() {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }

  // static async getCategoryData(cat) {
  //   const response = await fetch(`https://newsapi.org/v2/top-headlines?country=au&category=${cat}&apiKey=2822a86cf66c4cc8a3306d7ac63dc2f6`);
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return await response.json();
  // }
}
