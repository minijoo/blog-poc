import Head from "next/head";
import Container from "../components/container";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout";
import PostPreviewStatic from "../components/post-preview-static";
import { JordysAPI } from "../lib/jordys-api";
import Author from "../interfaces/author";
import { PreviewPost } from "../interfaces/preview-post";

const Jordys_API = new JordysAPI(process.env.IP); // we can reference env var here because it will be used only at build time

type Props = {
  allPosts: PreviewPost[];
};

export default function Posts({ allPosts }: Props) {
  const posts = allPosts.filter((p) => !p.metadata.private);
  const privatePosts = allPosts.filter((p) => p.metadata.private);
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Head>
            <title>{`All Posts - Jordy's Site`}</title>
          </Head>
          <section>
            <div className="grid grid-cols-1 gap-4 pb-32 max-w-2xl mx-auto">
              {posts.map((post, i) => (
                <PostPreviewStatic
                  key={post.slug}
                  coverImage={post.metadata.coverImage}
                  title={post.metadata.title}
                  date={post.metadata.date}
                  author_name={post.metadata.author_name}
                  slug={post.slug}
                  index={i}
                />
              ))}
              <div className="w-1/2 mx-auto pt-4 pb-3 md:pt-5 md:pb-4">
                <div className="border border-black/50" />
              </div>
              {privatePosts.map((post, i) => (
                <PostPreviewStatic
                  key={post.slug}
                  coverImage={post.metadata.coverImage}
                  title={"🔑 " + post.metadata.title}
                  date={post.metadata.date}
                  author_name={post.metadata.author_name}
                  slug={post.slug}
                  index={i}
                />
              ))}
            </div>
          </section>
        </Container>
        <div className="z-50 fixed bottom-0 w-full flex flex-col gap-y-2 justify-items-center place-items-center">
          <Footer />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const apiPosts = await Jordys_API.retrieveAllPostsWithToken();
  apiPosts.sort(
    (postA, postB) => Date.parse(postB.date) - Date.parse(postA.date)
  );

  const authors = await Jordys_API.getAuthorInfos(
    apiPosts.map((p) => p.author?.toString()).filter((a) => !!a)
  );
  const authorMap = new Map<string, Author>();
  authors.forEach((author) =>
    authorMap.set(author._id.toString(), {
      name: author.username,
      picture: author.picture,
    })
  );
  authorMap.set(undefined, { name: "Anonymous", picture: "" });

  const allPosts: PreviewPost[] = apiPosts.map((apiPost) => ({
    metadata: {
      title: apiPost.title,
      date: apiPost.date,
      coverImage: apiPost.cover_url || "",
      author_name: authorMap.get(apiPost.author?.toString()).name,
      author_picture: authorMap.get(apiPost.author?.toString()).picture,
      excerpt: apiPost.excerpt,
      private: apiPost.private ? true : false,
    },
    slug: apiPost._id,
  }));

  return {
    props: { allPosts },
  };
};
