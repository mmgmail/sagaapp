
const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2822a86cf66c4cc8a3306d7ac63dc2f6`;
const URLS = [];
const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

for (let item in CATEGORIES) {
  URLS.push(
    `https://newsapi.org/v2/top-headlines?country=us&category=${
      CATEGORIES[item]
    }&apiKey=2822a86cf66c4cc8a3306d7ac63dc2f6`
  );
}

export { URL, URLS, CATEGORIES };
