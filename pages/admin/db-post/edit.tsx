import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ItemForUpload, JordysAPI } from "../../../lib/jordys-api";
import { ApiPost } from "../../../interfaces/jordys-api";
import { injectGalleryMdx } from "../../../lib/utils";
import Head from "next/head";
import Layout from "../../../components/layout";
import cn from "classnames";
import { AiTwotoneCloseCircle } from "react-icons/ai";

interface ItemForUploadAndPreviewing extends ItemForUpload {
  previewUrl: string;
  coverBlob?: Blob;
}

export function getStaticProps() {
  return { props: { ip: process.env.IP || "" } };
}

export default function DbPost({ ip }) {
  const Jordys_API = new JordysAPI(ip);
  const router = useRouter();
  const postId = router.query.id;
  const [data, setData] = useState<ApiPost>(null);
  const [hasBodyChangedSinceSave, setHasBodyChangedSinceSave] =
    useState<boolean>(false);

  useEffect(() => {
    if (!postId) return;
    Jordys_API.retrievePost(postId)
      .then((responseData: ApiPost) => {
        responseData.gallery = responseData.gallery.reverse();
        setData(responseData);
        setCoverUrl(responseData.cover_url);
        bodyRef.current.value = responseData.body;
      })
      .catch((err) => {
        alert(err);
      });
  }, [postId]);

  useEffect(() => {
    if (!hasBodyChangedSinceSave) return;

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [hasBodyChangedSinceSave]);

  const handleImageDelete = async (event) => {
    const confirmDelete = confirm(
      "Delete " + event.currentTarget.dataset.name + "?"
    );
    if (!confirmDelete) return;

    try {
      const resp = await Jordys_API.removeGalleryItem(
        router.query.id,
        event.currentTarget.dataset.name
      );
      data.gallery = resp.gallery.reverse();
      setGreenMessage("Removed item successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
    } catch (err) {
      alert("Error removing gallery item");
      console.log(err);
    }
  };

  const handlePublishToggle = async () => {
    try {
      const newData = await Jordys_API.updatePost(router.query.id, {
        published: data.published ? "no" : "yes",
      });
      setData(newData);
      setGreenMessage("Saved published successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
    } catch (err) {
      alert("Error saving published");
      console.log(err);
    }
  };

  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const handleHeaderClick = async () => {
    let newName = prompt("Enter new cover image name:");
    const item = data.gallery.filter(
      (it) => it.name === newName.toLowerCase() && it.type === "image"
    );
    if (!item.length) {
      setRedMessage(
        "Nothing happened. No gallery item exists with name: " + newName
      );
      // @ts-ignore
      document.getElementById("red-popover").showPopover();
      return;
    }
    setCoverUrl(item[0].url);
    try {
      await Jordys_API.updatePost(router.query.id, {
        cover_url: item[0].url,
      });
      setGreenMessage("Saved successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
    } catch (err) {
      alert("Error saving cover_url");
      console.log(err);
    }
  };

  const handleSaveClick = async () => {
    try {
      await Jordys_API.updatePost(router.query.id, {
        postBody: bodyRef.current.value,
      });
      setGreenMessage("Saved post body successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
      setHasBodyChangedSinceSave(false);
    } catch (err) {
      alert("Error saving post body");
      console.log(err);
    }
  };

  const handleTitleSaveClick = async () => {
    if (!titleRef.current.value || !dateRef.current.value) {
      titleRef.current.focus();
      setRedMessage("Entered value not allowed. Try again.");
      // @ts-ignore
      document.getElementById("red-popover").showPopover();
      return;
    }

    try {
      const newData = await Jordys_API.updatePost(router.query.id, {
        title: titleRef.current.value,
        date: new Date(dateRef.current.value).toISOString().split("T")[0],
      });
      console.log(newData);
      setData(newData);
      setGreenMessage("Title & post date changed successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
      setOpenTitleModal(false);
    } catch (err) {
      alert("error saving post title");
      console.log(err);
    }
  };

  const handleExcerptSaveClick = async () => {
    if (!excerptRef.current.value) {
      excerptRef.current.focus();
      setRedMessage("Entered value not allowed. Try again.");
      // @ts-ignore
      document.getElementById("red-popover").showPopover();
      return;
    }
    try {
      const newData = await Jordys_API.updatePost(router.query.id, {
        excerpt: excerptRef.current.value,
      });
      setData(newData);
      setGreenMessage("Excerpt changed successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
      setOpenExcerptModal(false);
    } catch (err) {
      alert("error saving post excerpt");
      console.log(err);
    }
  };

  const getVideoElement = async (buffer) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = URL.createObjectURL(buffer);
    video.muted = true;
    video.playsInline = true;
    document.getElementById("video-preview").append(video);
    await video.play();
    return video;
  };

  const handleVideoFileSelection = (
    videoFile: File
  ): Promise<ItemForUploadAndPreviewing> => {
    return new Promise(async (res, rej) => {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      let frameCount = 0;

      if (HTMLVideoElement.prototype.requestVideoFrameCallback) {
        const video = await getVideoElement(videoFile);
        const drawingLoop = async () => {
          if (frameCount === 10 || video.ended) {
            const bitmap = await createImageBitmap(video, {
              resizeHeight: video.videoHeight,
              resizeWidth: video.videoWidth,
            });
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            ctx.drawImage(bitmap, 0, 0);
            const imgBuffer: Blob = await new Promise((res) =>
              canvas.toBlob(res)
            );
            video.pause();

            res({
              file: videoFile,
              name: videoFile.name,
              previewUrl: URL.createObjectURL(imgBuffer),
              coverBlob: imgBuffer,
            } as ItemForUploadAndPreviewing);
          } else {
            frameCount++;
            video.requestVideoFrameCallback(drawingLoop);
          }
        };
        video.requestVideoFrameCallback(drawingLoop);
      } else {
        console.error("your browser doesn't support this API yet");
        rej("video file selection failed");
      }
    });
  };

  const handleFileInputChange = async () => {
    setUploadErrs([]);
    const inputElement = document.getElementById(
      "file-input"
    ) as HTMLInputElement;

    const inputFiles = inputElement.files;

    if (inputFiles[0].type.includes("video") && inputFiles.length > 1) {
      setUploadErrs(["Video uploads are only allowed one at a time"]);
      return;
    }

    if (inputFiles.length === 1 && inputFiles[0].type.includes("video")) {
      const videoUploadItem = await handleVideoFileSelection(inputFiles[0]);
      setFiles([videoUploadItem]);
      return;
    }

    // for non-video, image, files, we allow multiple items
    const promises = [];
    for (const file of inputFiles) {
      if (file.type === "image/heic") {
        promises.push(Jordys_API.convertHeic(file));
      } else {
        promises.push(null);
      }
    }

    setUploadWaitingMsg("converting...");

    const newFiles: ItemForUploadAndPreviewing[] = [];
    Promise.all(promises)
      .then((values) => {
        console.assert(values.length === inputFiles.length);
        values.forEach((v, i) => {
          const file: File = v ? v : inputFiles[i];
          newFiles.push({
            file,
            previewUrl: URL.createObjectURL(file),
            name: inputFiles[i].name,
          });
        });
        setFiles(newFiles);
        (
          document.getElementById("upload-save-button") as HTMLButtonElement
        ).disabled = false;
      })
      .catch((errs) => {
        console.log("One or more errors occurred during jpeg conversion.");
        setUploadErrs([
          "Error occurred during JPEG conversion. Please try a different image.",
        ]);
      })
      .finally(() => {
        setUploadWaitingMsg(null);
      });
  };

  const handleUploadSaveClick = async () => {
    if (_uploadErrs.current.some((err) => !!err)) {
      alert("this should be handled better; errors exists on the page");
      return;
    }

    // Read the name changes from input
    let i = 0;
    for (const input of document.getElementsByClassName(
      "file-names"
    ) as HTMLCollectionOf<HTMLInputElement>) {
      files[i++].name = input.value.trim();
    }

    try {
      setUploadWaitingMsg("uploading...");
      if (files.length === 1 && files[0].file.type.includes("video")) {
        const resp = await Jordys_API.uploadVideoAndCover(
          router.query.id,
          files[0],
          files[0].coverBlob
        );
        data.gallery = resp.gallery.reverse();
      } else {
        const resp = await Jordys_API.uploadImages(router.query.id, files);
        data.gallery = resp.gallery.reverse();
      }

      setFiles([]);
      setOpenUploadModal(false);
    } catch (error) {
      alert("error uploading images");
      console.log(error);
    } finally {
      setTimeout(() => {
        setUploadWaitingMsg(null);
      }, 2000);
    }
  };

  const _uploadErrs = useRef<string[]>([]);
  const handleUploadNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const index = parseInt(event.target.dataset.index);
    if (!value) {
      event.target.classList.add("border-3");
      event.target.classList.add("border-red-500");
      _uploadErrs.current[index] = `Item ${index + 1}: Value is empty`;
    } else {
      // check against all other names
      let dupeFound = false;
      for (let i = 0; i < event.target.parentElement.children.length; i++) {
        if (i === index) continue;

        console.assert(
          event.target.parentElement.children[i] instanceof HTMLInputElement
        );
        if (
          value ===
          (event.target.parentElement.children[i] as HTMLInputElement).value
        ) {
          dupeFound = true;
          break;
        }
      }

      if (dupeFound || data.gallery.some(({ name }) => name === value)) {
        event.target.classList.add("border-3");
        event.target.classList.add("border-red-500");
        _uploadErrs.current[index] = `Item ${
          index + 1
        }: Duplicate value found in this form or in rest of gallery`;
      } else {
        // all is good
        event.target.classList.remove("border-3");
        event.target.classList.remove("border-red-500");

        _uploadErrs.current[index] = null;
      }
    }
    setUploadErrs(_uploadErrs.current.filter((err) => !!err));
  };

  async function setClipboard(text) {
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
  }

  function insertAtCursor(myField: HTMLTextAreaElement, myValue) {
    //IE support
    // @ts-ignore
    if (document.selection) {
      myField.focus();
      // @ts-ignore
      const sel = document.selection.createRange();
      sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == 0) {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value =
        myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);
    } else {
      myField.value += myValue;
    }
  }

  const handleImageClick = async (event) => {
    insertAtCursor(bodyRef.current, event.currentTarget.dataset.name);
  };

  const [files, setFiles] = useState<ItemForUploadAndPreviewing[]>([]);
  const [uploadErrs, setUploadErrs] = useState<string[]>([]);
  const [uploadWaitingMsg, setUploadWaitingMsg] = useState<string>(null);
  const [coverUrl, setCoverUrl] = useState<string>(null);

  const [openTitleModal, setOpenTitleModal] = useState(false);
  const [openExcerptModal, setOpenExcerptModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const excerptRef = useRef(null);

  const [greenPopoverMessage, setGreenMessage] = useState("");
  const [redPopoverMessage, setRedMessage] = useState("");

  return (
    <Layout>
      <Head>
        <title>{`[E] ${data?.title} | Edit Post`}</title>
      </Head>
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
      <div className="max-w-3xl mx-auto flex flex-col h-dvh">
        <>
          <div
            className="relative flex-none text-4xl py-3 mb-1 text-center"
            onClick={handleHeaderClick}
          >
            <div className="absolute -z-50 top-0 w-full h-full overflow-hidden">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt="cover image"
                  className="top-1/2 -translate-y-1/2 opacity-60"
                />
              ) : (
                <></>
              )}
            </div>
            {router.query.id ? "Edit Post" : "New Post"}
          </div>
          <div className="grow flex flex-col mx-4 overflow-hidden">
            {/* <div className="text-xs flex-none">Title</div>
            <div className="pl-4 flex-none">{data.title}</div>
            <div className="text-xs flex-none">Excerpt</div>
            <div className="pl-4 flex-none">{data.excerpt}</div> */}
            {/* <div className="text-xs flex-none">Body</div> */}
            <div className="grow `overflow-scroll pb-4">
              <textarea
                className="px-2 font-mono w-full h-full"
                ref={bodyRef}
                onChange={() => {
                  setHasBodyChangedSinceSave(true);
                }}
              ></textarea>
            </div>
          </div>

          <div className="flex-none h-16 min-h-20 flex bg-gray-100 overflow-x-auto justify-items-center items-center">
            {data?.gallery?.map((galleryItem) => (
              <div
                className="relative h-12 flex-1 min-w-32 mx-3 grid grid-cols-4 bg-gray-300 rounded-md"
                key={galleryItem.name}
              >
                <div
                  data-name={galleryItem.name}
                  className="absolute -top-2 -right-2 text-2xl"
                  onClick={handleImageDelete}
                >
                  <AiTwotoneCloseCircle />
                </div>
                <div className="h-12 col-span-1 relative rounded-l-md flex place-content-center items-center overflow-hidden">
                  <a
                    href={galleryItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {galleryItem.type === "image" ? (
                      <img src={galleryItem.url} className="w-full h-full" />
                    ) : galleryItem.type === "video" ? (
                      <img
                        src={galleryItem.video_thumb_url}
                        className="w-full h-full"
                      />
                    ) : (
                      <></>
                    )}
                  </a>
                </div>
                <div
                  className="col-span-3 pt-1 flex place-content-center items-center text-center overflow-hidden"
                  data-name={galleryItem.name}
                  onClick={handleImageClick}
                >
                  <div>{galleryItem.name}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-none h-16 min-h-16 grid grid-rows-1 grid-flow-col gap-x-2 place-content-center items-center border-t-2">
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                setOpenTitleModal(true);
              }}
            >
              Title/Date
            </button>
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                setOpenExcerptModal(true);
              }}
            >
              Excerpt
            </button>
            <button
              className={cn(
                "h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded",
                { "outline-3": hasBodyChangedSinceSave }
              )}
              onClick={handleSaveClick}
              id="save-button"
            >
              💾
            </button>
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                setOpenUploadModal(true);
              }}
            >
              🏞
            </button>
            <a
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              href="./preview"
              target="_blank"
              onClick={() => {
                const titleExcerptBody =
                  (coverUrl
                    ? `<img src="${coverUrl}" />`
                    : `No cover image\n\n`) +
                  `Title: ${data.title}\n\nDate: ${data.date}\n\nExcerpt: ${data.excerpt}\n\nBody:\n\n` +
                  bodyRef.current.value;
                localStorage.setItem("cat", titleExcerptBody);
              }}
            >
              👀
            </a>
            <button
              className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={handlePublishToggle}
            >
              {data?.published ? "❌" : "✅"}
            </button>
          </div>
        </>
      </div>

      {openTitleModal ? (
        <div className="h-screen w-screen top-0 fixed grid grid-rows-1 grid-flow-col place-content-center items-center backdrop-blur-sm">
          <div className="flex flex-col min-h-48 bg-white border-2 rounded-md -translate-y-1/2">
            <div className="p-5 text-2xl border-b">Edit Post Title & Date</div>
            <div className="p-5 flex-grow grid grid-cols-1">
              <div className="text-xs col-span-1">Title</div>
              <input
                defaultValue={data?.title}
                className="text-center col-span-1 border-1 px-1"
                type="text"
                ref={titleRef}
              ></input>
              <div className="text-xs col-span-1 mt-2">Post Date</div>
              <input
                defaultValue={new Date(data?.date).toISOString().split("T")[0]}
                className="col-span-1 border-1 px-1"
                type="date"
                ref={dateRef}
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
              <textarea
                defaultValue={data?.excerpt}
                className="px-2 w-[80vw] h-40"
                ref={excerptRef}
              ></textarea>
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
          <div className="relative flex flex-col min-h-48 max-h-[80vh] mt-[15vh] bg-white border-2 rounded-md overflow-scroll mx-2">
            {uploadWaitingMsg ? (
              <div className="absolute top-0 w-full h-full flex place-content-center items-center bg-white/90 z-50">
                <div className="text-lg">{uploadWaitingMsg}</div>
              </div>
            ) : (
              <></>
            )}
            <div className="p-5 text-2xl border-b">Upload</div>
            <div className="p-5 grow grid grid-cols-1 gap-2">
              <input
                id="file-input"
                type="file"
                name="images"
                accept=".heic, .jpg, .jpeg, .png, .svg, .gif, .mp4, .mpeg, .mpg, .mov, .m4v"
                multiple
                onChange={handleFileInputChange}
              />
              <canvas className="w-20 hidden"></canvas>
              <div className="w-10 hidden" id="video-preview"></div>
              <div className="flex flex-row">
                <div className="w-12 grid grid-cols-1 gap-2">
                  {files.map((el, i) => (
                    <div className="h-10 w-12 relative rounded-md">
                      <Image
                        className="object-cover rounded-l-md"
                        src={el.previewUrl}
                        alt={el.name}
                        fill
                      ></Image>
                    </div>
                  ))}
                </div>
                <div className="flex-grow grid grid-cols-1 gap-2 ml-2">
                  {files.map((el, index) => (
                    <input
                      type="text"
                      autoCapitalize="none"
                      data-index={index}
                      className="pl-2 file-names col-span-3"
                      defaultValue={el.name}
                      onChange={handleUploadNameChange}
                    />
                  ))}
                </div>
              </div>
              {uploadErrs.length ? (
                <ul className="text-red-500">
                  {uploadErrs.map((err) => (
                    <li>{err}</li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
            <div className="p-5 bg-gray-100 grid grid-rows-1 grid-flow-col place-content-center items-center gap-x-2">
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded disabled:opacity-20"
                onClick={handleUploadSaveClick}
                id="upload-save-button"
              >
                Save
              </button>
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  setUploadErrs([]);
                  setFiles([]);
                }}
              >
                Clear
              </button>
              <button
                className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  setUploadErrs([]);
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
    </Layout>
  );
}
