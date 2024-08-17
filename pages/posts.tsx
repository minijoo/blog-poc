import Head from "next/head";
import Container from "../components/container";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout";
import PostPreviewStatic from "../components/post-preview-static";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";

type Props = {
  allPosts: Post[];
};

export default function Posts({ allPosts }: Props) {
  const posts = allPosts;
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Head>
            <title>{`All Posts - Jordy's Site`}</title>
          </Head>
          <section>
            <div className="grid grid-cols-1 gap-4 mb-32 max-w-2xl mx-auto">
              {posts.map((post, i) => (
                <PostPreviewStatic
                  key={post.slug}
                  coverImage={post.coverImage}
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  index={i}
                />
              ))}
            </div>
          </section>
        </Container>
        <div className="fixed bottom-0 w-screen flex flex-col gap-y-2 justify-items-center place-items-center">
          <Footer />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
