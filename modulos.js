/**Fetching the dog apis */
const dogs = fetch('https://api.thedogapi.com/v1/images/search?limit=2').then(response => response.json());
export default await dogs;