import Head from "next/head";
import Container from "../components/container";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout";

export default function Contact() {
  return (
    <Layout>
      <Container>
        <Header />
        <Head>
          <title>{`Contact - Jordy's Site`}</title>
        </Head>
        <section>
          <div>Shoot me an email at minijoo at gmail dot com for now.</div>
        </section>
      </Container>
      <div className="fixed bottom-0 w-screen flex flex-col gap-y-2 justify-items-center place-items-center">
        <Footer />
      </div>
    </Layout>
  );
}
