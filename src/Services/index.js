
export class Api {
  static async getSomeData() {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }
}
