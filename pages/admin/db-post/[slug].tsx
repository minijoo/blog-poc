import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Editor from "../../../components/editor";
// import { assert } from "console";

const DB_URL = "http://localhost:3001/";
const uploadImages = async (id, files, names: string[]) => {
  const formData = new FormData();
  // const names = [];
  for (const file of files) {
    // names.push(file.name);
    formData.append("images", file);
  }
  formData.append("names", names.join(","));

  // try {
  const resp = await fetch(DB_URL + "posts/gallery-upload/" + id, {
    method: "POST",
    headers: {},
    body: formData,
  });
  // if (!resp.ok) {
  // alert("Response from server not OK");
  // }
  return await resp.json();
  // } catch (error) {
  // alert(error);
  // }
};

const updatePost = async (id, fields) => {
  try {
    const resp = await fetch(DB_URL + "posts/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    if (!resp.ok) {
      alert("Response from server not OK");
    }
    return await resp.json();
  } catch (error) {
    alert(error);
  }
};

export default function DbPost() {
  const router = useRouter();
  const postId = router.query.slug;
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (!postId) return;
    const fetchPostById = async () => {
      try {
        const result = await fetch(DB_URL + "posts/" + postId);
        const responseData = await result.json();
        responseData.gallery = responseData.gallery.reverse();
        setData(responseData);
        editorRef.current.loadContent(responseData.body);
      } catch (error) {
        alert(error);
      }
    };
    fetchPostById();
  }, [postId]);

  const editorRef = useRef(null);

  const handleSaveClick = async () => {
    await updatePost(router.query.slug, {
      postBody: editorRef.current.getContent(),
    });
    setGreenMessage("Saved post body successfully");
    // @ts-ignore
    document.getElementById("green-popover").showPopover();
  };

  const handleTitleSaveClick = async () => {
    if (!titleRef.current.value) {
      titleRef.current.focus();
      setRedMessage("Entered value not allowed. Try again.");
      // @ts-ignore
      document.getElementById("red-popover").showPopover();
    } else {
      const newData = await updatePost(router.query.slug, {
        title: titleRef.current.value,
      });
      setData(newData);
      setGreenMessage("Title changed successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
      editorRef.current.shouldListen();
      setOpenTitleModal(false);
    }
  };

  const handleExcerptSaveClick = async () => {
    if (!excerptRef.current.value) {
      excerptRef.current.focus();
      setRedMessage("Entered value not allowed. Try again.");
      // @ts-ignore
      document.getElementById("red-popover").showPopover();
    } else {
      const newData = await updatePost(router.query.slug, {
        excerpt: excerptRef.current.value,
      });
      setData(newData);
      setGreenMessage("Excerpt changed successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
      editorRef.current.shouldListen();
      setOpenExcerptModal(false);
    }
  };

  type ItemForUpload = {
    name: string;
    file: Blob | File;
    preview?: Blob;
  };
  const handleFileInputChange = () => {
    const newItemsForUpload: ItemForUpload[] = [];
    const files = (document.getElementById("file-input") as HTMLInputElement)
      .files;
    for (const file of files) {
      newItemsForUpload.push({
        name: file.name,
        // src: URL.createObjectURL(file),
        file,
      });
    }
    setItemsForUpload(newItemsForUpload);
  };

  const handleUploadSaveClick = async () => {
    // const newData = await updatePost(router.query.slug, {
    //   excerpt: excerptRef.current.value,
    // });
    // setData(newData);
    // setGreenMessage("Excerpt changed successfully");
    // // @ts-ignore
    // document.getElementById("green-popover").showPopover();
    const names = [];
    for (const input of document.getElementsByClassName(
      "file-names"
    ) as HTMLCollectionOf<HTMLInputElement>) {
      names.push(input.value);
    }
    const files = (document.getElementById("file-input") as HTMLInputElement)
      .files;
    console.assert(names.length === files.length);
    try {
      const resp = await uploadImages(router.query.slug, files, names);
      data.gallery = resp.gallery.reverse();

      setItemsForUpload([]);
      editorRef.current.shouldListen();
      setOpenUploadModal(false);
    } catch (error) {
      setRedMessage("Callout to upload image failed");
      // @ts-ignore
      document.getElementById("red-popover").showPopover();
    }
  };

  async function setClipboard(text) {
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
  }

  const handleImageClick = async (event) => {
    await setClipboard(event.currentTarget.dataset.name);
    setGreenMessage("Copied image name to clipboard");
    // @ts-ignore
    document.getElementById("green-popover").showPopover();
  };

  const [itemsForUpload, setItemsForUpload] = useState<ItemForUpload[]>([]);

  const [openTitleModal, setOpenTitleModal] = useState(false);
  const [openExcerptModal, setOpenExcerptModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const titleRef = useRef(null);
  const excerptRef = useRef(null);

  const [greenPopoverMessage, setGreenMessage] = useState("");
  const [redPopoverMessage, setRedMessage] = useState("");
  return (
    <>
      <div
        className="fixed bottom-0 bg-red-200 rounded-md px-2"
        popover="auto"
        id="red-popover"
      >
        {redPopoverMessage}
      </div>
      <div
        className="fixed bottom-0 bg-green-200 rounded-md px-2"
        popover="auto"
        id="green-popover"
      >
        {greenPopoverMessage}
      </div>
      <div className="max-w-2xl mx-auto flex flex-col h-screen">
        <>
          <div className="text-4xl my-4 text-center">
            {router.query.slug ? "Edit Post" : "New Post"}
          </div>
          <div className="flex flex-col mx-4 flex-grow">
            <div className="text-xs flex-none">Title</div>
            <div className="pl-4 flex-none">{data.title}</div>
            <div className="text-xs flex-none">Excerpt</div>
            <div className="pl-4 flex-none">{data.excerpt}</div>
            <div className="text-xs flex-none">Body</div>
            <div className="flex-grow border-2 py-3 px-8 mx-2 mb-4 h-48 overflow-scroll">
              <Editor ref={editorRef} />
            </div>
          </div>
          <div className="h-14 min-h-14 flex bg-gray-100 overflow-x-auto justify-items-center items-center">
            <div
              className="h-8 mx-3 border-2 px-2 hover:bg-gray-300 active:bg-gray-300 items-center flex rounded-md"
              onClick={() => {
                editorRef.current.shouldNotListen();
                setOpenUploadModal(true);
              }}
            >
              Upload
            </div>
            {data.gallery?.map((galleryItem) => (
              <div
                className="h-8 min-w-32 mx-3 grid grid-cols-4 bg-gray-300 rounded-md"
                key={galleryItem.name}
              >
                <div className="h-8 col-span-1 relative rounded-l-md flex place-content-center items-center overflow-hidden">
                  <a
                    href={galleryItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {galleryItem.type === "image" ? (
                      <img src={galleryItem.url} className="w-full h-full" />
                    ) : galleryItem.type === "video" ? (
                      <div className="text-center">🎥</div>
                    ) : (
                      <></>
                    )}
                  </a>
                </div>
                <div
                  className="col-span-3 pt-1 flex place-content-center items-start text-center overflow-hidden"
                  data-name={galleryItem.name}
                  onClick={handleImageClick}
                >
                  <div>{galleryItem.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-16 min-h-16 grid grid-rows-1 grid-flow-col gap-x-2 place-content-center items-center border-t-2">
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                editorRef.current.shouldNotListen();
                setOpenTitleModal(true);
              }}
            >
              X-Ttl
            </button>
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                editorRef.current.shouldNotListen();
                setOpenExcerptModal(true);
              }}
            >
              X-Exc
            </button>
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                if (!editorRef.current.callUndo()) {
                  setRedMessage("Nothing left to undo");
                  // @ts-ignore
                  document.getElementById("red-popover").showPopover();
                }
              }}
            >
              ⤴️
            </button>
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                editorRef.current.callPaste(text);
                // setRedMessage("Nothing left to undo");
                // @ts-ignore
                // document.getElementById("red-popover").showPopover();
              }}
            >
              🖌
            </button>
            <a
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              href="./preview"
              target="_blank"
              onClick={() => {
                localStorage.setItem("cat", editorRef.current.getContent());
              }}
            >
              Preview
            </a>
          </div>
        </>
      </div>
      {openTitleModal ? (
        <div className="h-screen w-screen top-0 fixed grid grid-rows-1 grid-flow-col place-content-center items-center backdrop-blur-sm">
          <div className="flex flex-col min-h-48 bg-white border-2 rounded-md -translate-y-1/2">
            <div className="p-5 text-2xl border-b">Edit Post Title</div>
            <div className="p-5 flex-grow">
              <input
                defaultValue={data.title}
                className="text-center"
                type="text"
                ref={titleRef}
              ></input>
            </div>
            <div className="p-5 bg-gray-100 grid grid-rows-1 grid-flow-col place-content-center items-center gap-x-2">
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={handleTitleSaveClick}
              >
                Save
              </button>
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  editorRef.current.shouldListen();
                  setOpenTitleModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {openExcerptModal ? (
        <div className="h-screen w-screen top-0 fixed grid grid-rows-1 grid-flow-col place-content-center items-start backdrop-blur-sm">
          <div className="flex flex-col min-h-48 max-h-[80vh] mt-[15vh] bg-white border-2 rounded-md">
            <div className="p-5 text-2xl border-b">Edit Post Excerpt</div>
            <div className="p-5 flex-grow">
              <input
                defaultValue={data.excerpt}
                className="text-center w-[80vw] h-40"
                type="text"
                ref={excerptRef}
              ></input>
            </div>
            <div className="p-5 bg-gray-100 grid grid-rows-1 grid-flow-col place-content-center items-center gap-x-2">
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={handleExcerptSaveClick}
              >
                Save
              </button>
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  editorRef.current.shouldListen();
                  setOpenExcerptModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {openUploadModal ? (
        <div className="h-screen w-screen top-0 fixed grid grid-rows-1 grid-flow-col place-content-center items-start backdrop-blur-sm">
          <div className="flex flex-col min-h-48 max-h-[80vh] mt-[15vh] bg-white border-2 rounded-md overflow-scroll">
            <div className="p-5 text-2xl border-b">Upload</div>
            <div className="p-5 flex-grow grid grid-cols-1 gap-2">
              <input
                id="file-input"
                type="file"
                name="images"
                accept=".heic, .jpg, .jpeg, .png, .svg, .gif, .mp4, .mpeg, .mpg, .mov"
                multiple
                onChange={handleFileInputChange}
              />
              {itemsForUpload.map((el) => (
                <div
                  key={el.name}
                  className="h-10 min-w-40 mx-3 grid grid-cols-4 bg-gray-300 rounded-md"
                >
                  <div className="h-10 w-12 col-span-1 relative rounded-md">
                    <Image
                      className="object-cover rounded-l-md"
                      src={URL.createObjectURL(
                        el.preview ? el.preview : el.file
                      )}
                      alt={el.name}
                      fill
                    ></Image>
                  </div>
                  <input
                    type="text"
                    className="file-names col-span-3"
                    defaultValue={el.name}
                  />
                </div>
              ))}
            </div>
            <div className="p-5 bg-gray-100 grid grid-rows-1 grid-flow-col place-content-center items-center gap-x-2">
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={handleUploadSaveClick}
              >
                Save
              </button>
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  editorRef.current.shouldListen();
                  setOpenUploadModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
