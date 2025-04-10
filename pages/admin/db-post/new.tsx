import { JordysAPI } from "../../../lib/jordys-api";

export function getStaticProps() {
  return { props: { ip: process.env.IP } };
}

export default function NewPost({ ip }) {
  const Jordys_API = new JordysAPI(ip);

  const createPost = async () => {
    try {
      return Jordys_API.createPost();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto grid place-content-center items-center h-screen">
      <div className="flex flex-col">
        <div className="text-2xl">Create a New Post?</div>
        <div className="grid grid-rows-1 grid-flow-col place-content-center items-center gap-x-2 mt-2">
          <button
            className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            onClick={async () => {
              const result = await createPost();
              window.location.replace("./" + result._id);
            }}
          >
            Yes
          </button>
          <button
            className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              alert("Please close this window");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
