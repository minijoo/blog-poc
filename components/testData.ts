import { MongoClient } from "mongodb";
let allPosts = [];
// @TODO -- replace with jordy-api callout and then remove mongodb from project
// @TODO -- Change this filename to something appropriate or move this to another file
const getAllPosts = async () => {
  if (allPosts.length) return allPosts;
  const uri =
    "mongodb://127.0.0.1:27017/test2?directConnection=true&serverSelectionTimeoutMS=2000";
  const client = new MongoClient(uri);

  const database = client.db("test2");
  const posts = database.collection("posts");
  for await (const p of posts.find({})) {
    const p2 = {
      _id: p._id.toString(),
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      date: p.date,
      // images: p.images,
      gallery: p.gallery,
    };
    allPosts.push(p2);
  }
  // console.log(allPosts);
  return allPosts;
};
// const allPosts = [
//   {
//     id: "id1",
//     title: "Myeongdong Test",
//     excerpt: "This is a test excerpt.",
//     body: `(Written on Jan 27, 2024) What do we Millenials love? Walking into local coffee shops, which is what I did yesterday morning in Myeongdong. Little did I know that an innocent scone <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/scone.jpg" class="float-right w-[45%] m-2 md:m-2"/> would completely shake up everything I've come to know about scones. Up until this day, my loose definition of a scone was a pastry with dry crumbly texture, almost biscuit-like, but everthing changed when I took a bite of this scone. It was moist yet kept together sturdily like a right-out-of-the-oven chocolate chip cookie that's cooled for about thirty minutes. It was paired with an earl grey milk tea <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/milktea.jpg" class="float-left w-[45%] m-2 md:m-2"/> that was so warm and delicious that it momentarily put an end to my coffee cravings, which I've been dealing with since I had quit coffee at the turn of the new year. I can proudly say that my Millenial senses did not fail me when I stumbled into [카페느티](https://kko.to/9ioSq7JPd1) on this cold morning. Starting my day there would be a sign of more good things follow because what proceeded it was an on-point lunch meal at [슈슈차이](https://kko.to/0zFo7EZxEi), a Koreo-Chinese restaurant inside of a department store food hall. In an effort to maintain low gluten intake, I opted out of the 자장면 and in for the 자장밥 <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/jjajjang.jpg" class="float-right w-[45%] m-2 md:m-2"/>. I couldn't believe it when I took the first spoonful <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/jjajjang2.jpg" class="float-left w-[45%] m-2 md:m-2"/> of rice after lightly tossing in the black sauce because I had just tasted a flavor that I did not know existed. It could only be described as black magic or, more coloquially, top-shelf MSG. My mother had 짬뽕 <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/jjam.jpg" class="float-right w-[45%] m-2 md:m-2"/> which I've always regarded as a supporting character to the 자장 and hardly a dish that can stand on its own, but I have to admit the bits of squid in it were almost as soft as scallop. On a different day, lunch was to be enjoyed at the world famous [명동교자](https://kko.to/kCqtkOgjdQ) on a Friday afternoon when the lines were suprisingly only a few tables long. Similar to Kat'z Deli in NYC's houston st, this place ran on organized chaos, a common phenomenon when an old restaurant meets popularity. The restaurant had been around since my parents childhood days serving the same dishes that people love today. When a table opened up, we were directed through a maze of tables to our seats, and as good korean customers that we are, we gave the usher our order as we lowered our butts to our seats, and in a matter of minutes, maybe seconds, we were served with steaming hot 칼국수 <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/noodles1.jpg" class="float-left w-[45%] m-2 md:m-2"/>, 비빔면 <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/bibim.jpg" class="float-right w-[45%] m-2 md:m-2"/>, 만두 <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/dumpling1.jpg" class="float-left w-[45%] m-2 md:m-2"/> (cover photo), and a bucket of kimchi <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/kimchi.jpg" class="float-right w-[45%] m-2 md:m-2"/> . The noodles were delicious, soft and chewy, just like the skin of the dumplings, which were perfect in temperature and density, making it easy to eat in one bite. It <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/dumpling2.jpg" class="float-left w-[45%] m-2 md:m-2"/>  was like a scene out of Kungfu Panda. From there we left the restaurant and got a cup of sweet cream coffee <img src="https://d1goytf13un2gh.cloudfront.net/assets/food/dabang.jpg" class="float-right w-[45%] m-2 md:m-2"/>  at a cafe that my parents used to actually hang out at called [Gamoo Cafe](https://kko.to/5ptMu2DCpp). Everyone there was people of my parents generation indulging in nostalgia.`,
//     date: "2024-08-29T09:30:00.000Z",
//   },

//   {
//     id: "id2",
//     title: "Test Title 2",
//     excerpt: "This is a test excerpt.",
//     body: "Hello world! This is the body of *this* post",
//     date: "2024-08-29T09:30:00.000Z",
//   },

export default getAllPosts;
