const DB_URL = "http://localhost:3001/";

const createPost = async () => {
  try {
    const resp = await fetch(DB_URL + "posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "---",
        excerpt: "...",
        date: new Date().toISOString().split("T")[0],
        postBody: "# Hello World",
      }),
    });
    if (!resp.ok) {
      alert("Response from server not OK");
    }
    return await resp.json();
  } catch (error) {
    alert(error);
  }
};

export default function NewPost({}) {
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
