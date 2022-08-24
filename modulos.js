/**Fetching the dog apis */
const dogs = fetch('https://api.thedogapi.com/v1/images/search').then(response => response.json());
export default await dogs;