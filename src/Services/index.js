const URL = `https://newsapi.org/v2/top-headlines?country=au&apiKey=2822a86cf66c4cc8a3306d7ac63dc2f6`;
export class Api {
  static async getSomeData() {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }
}
