import { useImperativeHandle, useLayoutEffect, useRef } from "react";
let LINE_LIMIT = 39;

export default function Editor({ ref }) {
  useImperativeHandle(
    ref,
    () => {
      return {
        callPaste(str: string) {
          handlePaste(str);
        },
        callUndo() {
          return handleUndo();
        },
        loadContent(loadText: string) {
          console.log("in loadContent");
          if (divRef.current.children[0].children.length > 1) {
            console.log("did not load any content");
            return;
          }
          for (let i = 0; i < loadText?.length; i++) {
            renderSingleInput(loadText[i]);
          }
        },
        getContent() {
          const charArr = domToArr();
          const content = charArr.reduce((str, el) => {
            return (
              str +
              el.reduce((row, char) => {
                return row + char;
              }, "") +
              "\n"
            );
          }, "");
          return content.trim();
        },
        shouldListen() {
          addMyListener();
        },
        shouldNotListen() {
          removeMyListener();
        },
      };
    },
    []
  );

  type Action = {
    type: "add" | "enter" | "delete" | "paste";
    deletedNode?: HTMLElement;
    pasteCharLen?: number;
    caret: HTMLElement;
  };

  const history: Action[] = [];

  const handleUndo = () => {
    if (!history.length) return false;
    const act = history.pop();
    // caret is on the last div of pasted divs
    caretRef.classList.remove("bg-black/20");
    if (act.type === "add") {
      // caret is on the added div
      caretRef = act.caret.nextSibling;
      act.caret.remove();
    } else if (act.type === "enter") {
      // caret is on the last child div of the line you split from
      caretRef = act.caret.parentElement.nextSibling.firstChild;
      // caret is on the last div of pasted divs
      renderSingleInput("Backspace");
    } else if (act.type === "delete") {
      caretRef = act.caret;
      if (act.deletedNode) {
        caretRef.before(act.deletedNode);
      } else {
        renderSingleInput("Enter");
      }
    } else if (act.type === "paste") {
      // caret is on the last div of pasted divs
      caretRef = act.caret;
      for (let i = 0; i < act.pasteCharLen - 1; i++) {
        renderSingleInput("Backspace");
      }
      caretRef = act.caret.nextSibling;
      act.caret.remove();
    }
    caretRef.classList.add("bg-black/20");
    return true;
  };

  const handleOnKeyDown = (event) => {
    // console.log("key: |" + event.key + "|");
    // console.log("ctrl: |" + event.ctrlKey + "|");
    // console.log("meta: |" + event.metaKey + "|");
    if (event.metaKey && event.key === "z") {
      handleUndo();
      return;
    }
    if (event.ctrlKey || event.metaKey) return;
    renderSingleInput(event.key, true);
    caretRef.scrollIntoView();
  };

  const handlePaste = (paste: string) => {
    for (let i = 0; i < paste?.length; i++) {
      renderSingleInput(paste[i]);
    }

    history.push({
      type: "paste",
      pasteCharLen: paste.length,
      caret: caretRef.previousSibling,
    });
  };
  const addMyListener = () => {
    window.addEventListener("keydown", handleOnKeyDown, false);
  };
  const removeMyListener = () => {
    window.removeEventListener("keydown", handleOnKeyDown, false);
  };
  const addPasteListener = () => {
    window.addEventListener(
      "paste",
      (event: ClipboardEvent) => {
        event.preventDefault();
        const paste = event.clipboardData.getData("text");
        paste && handlePaste(paste);
      },
      false
    );
  };

  let caretRef;

  const renderSingleInput = (input, saveHistory?) => {
    if (input.length === 1 && input !== "\n") {
      input = input === " " ? "&#160;" : input;
      const currentNode = caretRef;
      const nextNode = currentNode.nextSibling;

      if (currentNode.classList.contains("empty")) {
        currentNode.classList.remove(...currentNode.classList);
        currentNode.classList.add("inline-block");
        currentNode.innerHTML = input;
        if (!nextNode) {
          const domNode = document.createElement("div");
          domNode.classList.add("inline-block");
          domNode.classList.add("bg-black/20");
          domNode.classList.add("empty");
          domNode.addEventListener("click", handleCharClick);
          domNode.innerHTML = "<span>&#160;</span>";
          currentNode.parentElement.appendChild(domNode);
          caretRef = domNode;
        } else {
          nextNode.classList.add("bg-black/20");
          caretRef = nextNode;
        }
        saveHistory && history.push({ type: "add", caret: currentNode });
      } else {
        const domNode = document.createElement("div");
        domNode.classList.add("inline-block");
        domNode.addEventListener("click", handleCharClick);
        domNode.innerHTML = input;
        currentNode.before(domNode);
        saveHistory && history.push({ type: "add", caret: domNode });
      }
    } else if (input === "Enter" || input === "\n") {
      const currentNode = caretRef;
      const remainder = [];
      const currentRow = currentNode.parentElement;
      let itNode = currentNode;
      while (!itNode.classList.contains("empty")) {
        let next = itNode.nextSibling;
        itNode.remove();
        remainder.push(itNode);
        itNode = next;
      }
      itNode.classList.remove("bg-black/20");

      // add caretNode to current line
      const caretNode = document.createElement("div");
      caretNode.classList.add("inline-block");
      caretNode.classList.add("empty");
      caretNode.innerHTML = "<span>&#160;</span>";
      caretNode.addEventListener("click", handleCharClick);
      currentRow.appendChild(caretNode);

      const domNode = document.createElement("div");
      domNode.classList.add("mt-2");
      domNode.classList.add("block");
      currentRow.after(domNode);
      remainder.forEach((node, i) => {
        // if (i === 0) {
        //   domNode.insertAdjacentElement("afterbegin", node);
        // } else {
        domNode.appendChild(node);
        // }
      });
      const emptyNode = document.createElement("div");
      emptyNode.classList.add("inline-block");
      emptyNode.classList.add("empty");
      emptyNode.innerHTML = "<span>&#160;</span>";
      emptyNode.addEventListener("click", handleCharClick);
      domNode.appendChild(emptyNode);

      caretRef = domNode.firstChild;
      caretRef.classList.add("bg-black/20");

      saveHistory && history.push({ type: "enter", caret: caretNode });
    } else if (input === "Delete") {
    } else if (input === "ArrowLeft") {
      caretRef.classList.remove("bg-black/20");
      if (caretRef.previousSibling) {
        caretRef = caretRef.previousSibling;
      } else {
        if (caretRef.parentElement.previousSibling) {
          caretRef = caretRef.parentElement.previousSibling.lastChild;
        }
      }
      caretRef.classList.add("bg-black/20");
    } else if (input === "ArrowRight") {
      caretRef.classList.remove("bg-black/20");
      if (caretRef.nextSibling) {
        caretRef = caretRef.nextSibling;
      } else {
        if (caretRef.parentElement.nextSibling) {
          caretRef = caretRef.parentElement.nextSibling.firstChild;
        }
      }
      caretRef.classList.add("bg-black/20");
    } else if (input === "ArrowUp") {
      caretRef.classList.remove("bg-black/20");

      let tempCaretRef = caretRef;
      for (let i = 0; i < LINE_LIMIT; i++) {
        if (tempCaretRef) {
          tempCaretRef = tempCaretRef.previousSibling;
        }
      }

      if (tempCaretRef) caretRef = tempCaretRef;
      else {
        if (caretRef.parentElement.previousSibling) {
          let currentOffset = 1;
          while (caretRef.previousSibling) {
            caretRef = caretRef.previousSibling;
            currentOffset++;
          }
          let prevLineTailLen =
            caretRef.parentElement.previousSibling.children.length % LINE_LIMIT;
          caretRef = caretRef.parentElement.previousSibling.lastChild;
          while (prevLineTailLen > currentOffset) {
            // a shorter previous line tail will not enter loop
            caretRef = caretRef.previousSibling;
            prevLineTailLen--;
          }
        } else {
          caretRef = caretRef.parentElement.firstChild;
        }
      }

      caretRef.classList.add("bg-black/20");
    } else if (input === "ArrowDown") {
      caretRef.classList.remove("bg-black/20");

      let tempCaretRef = caretRef;
      for (let i = 0; i < LINE_LIMIT; i++) {
        if (tempCaretRef) {
          tempCaretRef = tempCaretRef.nextSibling;
        }
      }

      if (tempCaretRef) caretRef = tempCaretRef;
      else {
        // check tail for current caret. If current caret not in tail, set caret to last child
        const TAIL_LEN = caretRef.parentElement.children.length % LINE_LIMIT;
        let temp = caretRef.parentElement.lastChild;
        let tailExistsWithoutCurrentCaret = true;
        for (let i = 0; i < TAIL_LEN; i++) {
          if (temp === caretRef) {
            tailExistsWithoutCurrentCaret = false;
            break;
          }
          temp = temp.previousSibling;
        }
        if (
          tailExistsWithoutCurrentCaret ||
          !caretRef.parentElement.nextSibling
        ) {
          caretRef = caretRef.parentElement.lastChild;
        } else {
          let currentOffset = TAIL_LEN;
          while (caretRef.nextSibling) {
            caretRef = caretRef.nextSibling;
            currentOffset--;
          }
          caretRef = caretRef.parentElement.nextSibling.firstChild;
          // caretRef starts on firstChild, so -1
          for (let i = 0; i < currentOffset - 1; i++) {
            if (!caretRef.nextSibling) break;
            caretRef = caretRef.nextSibling;
          }
        }
      }
      caretRef.classList.add("bg-black/20");
    } else if (input === "Backspace") {
      if (caretRef.previousSibling) {
        const deletedNode = caretRef.previousSibling;
        (caretRef.previousSibling as HTMLElement).remove();
        saveHistory &&
          history.push({ type: "delete", deletedNode, caret: caretRef });
      } else if (caretRef.parentElement.previousSibling) {
        const currentRow = caretRef.parentElement;
        if (caretRef.classList.contains("empty")) {
          caretRef.classList.remove("bg-black/20");
          caretRef = currentRow.previousSibling.lastChild;
          caretRef.classList.add("bg-black/20");
        } else {
          currentRow.previousSibling.lastChild.remove();
          let itNode = caretRef;
          while (itNode) {
            let nextNode = itNode.nextSibling;
            currentRow.previousSibling.appendChild(itNode);
            itNode = nextNode;
          }
        }
        // delete current row since there are no nodes left here
        currentRow.remove();

        saveHistory && history.push({ type: "delete", caret: caretRef });
      }
    }
  };

  const handleCharClick = (event) => {
    caretRef.classList.remove("bg-black/20");
    caretRef =
      event.target.tagName === "SPAN"
        ? event.target.parentElement
        : event.target;
    caretRef.classList.add("bg-black/20");
  };

  const divRef = useRef(null);

  useLayoutEffect(() => {
    caretRef = divRef.current.children[0].children[0];
    caretRef.addEventListener("click", handleCharClick);

    LINE_LIMIT = Math.floor(
      divRef.current.getBoundingClientRect().width /
        caretRef.getBoundingClientRect().width
    );

    addMyListener();
    addPasteListener();
  }, []);

  const domToArr = (): string[][] => {
    const charArr2D = [];
    for (let i = 0; i < divRef.current.children.length; i++) {
      const row = [];
      for (let j = 0; j < divRef.current.children[i].children.length; j++) {
        const node = divRef.current.children[i].children[j];
        if (!node.classList.contains("empty")) {
          const conv = document.createElement("textarea");
          conv.innerHTML = node.innerHTML;
          //   row.push(node.innerHTML === "&nbsp;" ? " " : node.innerHTML);
          const char =
            conv.value.charCodeAt(0) === 160
              ? String.fromCharCode(32)
              : conv.value;
          row.push(char);
        }
      }
      charArr2D.push(row);
    }
    return charArr2D;
  };

  return (
    <>
      <div className="relative w-full">
        <div className="font-mono text-xs block" ref={divRef}>
          <div className="block">
            <div className="inline-block bg-black/20 empty">&#160;</div>
          </div>
        </div>
      </div>
    </>
  );
}
