import { URL, URLS } from 'AppConstans';

export class Api {
  static async getSomeData() {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }

  static async getCategoriesData() {
    const dataUrls = [];
    for (let url of URLS) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const res = await response.json();
      await dataUrls.push(res);
    }
    return await dataUrls;
  }
}
