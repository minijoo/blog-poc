//pages/sitemap.xml.js
import { JordysAPI } from "../lib/jordys-api";

const EXTERNAL_DATA_URL = 'https://www.jordys.site';
 
function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.jordys.site/contact</loc>
     </url>
     ${posts
       .map(({ _id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/posts2/${_id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}
 
function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
 
export async function getServerSideProps({ res }) {
  const Jordys_API = new JordysAPI(process.env.IP);

  const allPosts = await Jordys_API.retrieveAllPostsWithToken();
 
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(allPosts);
 
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
 
  return {
    props: {},
  };
}
 
export default SiteMap;
