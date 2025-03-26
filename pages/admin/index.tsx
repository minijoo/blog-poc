import useSWR from "swr";
import Head from "next/head";
import ContainerHome from "../../components/container-home";
import Footer from "../../components/footer";
import Layout from "../../components/layout";

const DB_URL = "http://localhost:3001/";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function AdminPage({ allPosts }) {
  const { data, error, isLoading } = useSWR(DB_URL + "posts/all", fetcher);

  if (error) {
    return <div>Failed</div>;
  }
  return (
    <>
      <Layout>
        <Head>
          <title>{`Admins Only | Jordy's Site`}</title>
        </Head>
        <ContainerHome>
          <h1 className="text-5xl text-center">Admin Only</h1>
          {isLoading ? (
            <div>loading...</div>
          ) : (
            data.map((post) => (
              <div key={post._id}>
                {post._id}, {post.title}, {post.excerpt}
              </div>
            ))
          )}
        </ContainerHome>
        <div className="fixed bottom-0 w-screen flex flex-col gap-y-2 justify-items-center place-items-center">
          <Footer />
        </div>
      </Layout>
    </>
  );
}
