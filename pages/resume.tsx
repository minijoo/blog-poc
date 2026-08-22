import { useEffect, useRef, useState } from "react"
import { GiNextButton, GiPreviousButton } from "react-icons/gi";

const DIVS = 11;
const CLIPPATH_DUR = 900;

const roundTo1000th = (n: number) => {
  return Math.round(n * 1000) / 1000
}

const easeFunc = (n: number) => {
  return Math.pow(Math.E, 6.003 * n - 6) - 0.0025
}

function Card({ show, title, onNewCardNum, cardNum, children }: { show: boolean, title: string, onNewCardNum: (oldNum: number, newNum: number) => void, cardNum: number, children: React.ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [doRender, setRender] = useState<boolean>(false);
  const [disabledNext, setDisableNext] = useState<boolean>(false);
  useEffect(() => {
    if (show) {
      setRender(true);
      setDisableNext(false);
    } else {
      setMounted(false);
      setRender(false);
    }
  }, [show]);

  useEffect(() => {
    if (doRender) {
      setTimeout(() => {
        setMounted(true);
      }, 100)
    }
  }, [doRender]);

  if (!doRender) {
    return <></>;
  }
  return (
    <div
      className="card w-full origin-top absolute"
      style={{ "--open": mounted ? 1 : 0 } as React.CSSProperties}
    >
      <div className="px-5 flex justify-center">
        <div className="flex flex-col border border-black rounded-2xl px-3 py-2">
          <div className="text-2xl font-bold">{title}</div>
          {children}
          <div className="mt-3 flex gap-1.5 justify-center">
            <div
              className={`secondary-button py-1!
                ${cardNum === 1 ? 'pointer-events-none opacity-50' : ''}
                `}
              onClick={() => onNewCardNum(cardNum, Math.max(1, cardNum - 1))}
            >
              <GiPreviousButton />
            </div>
            <div
              className={`secondary-button py-1! flex items-center
                ${disabledNext || cardNum === 12 ? 'pointer-events-none opacity-50' : ''}
                `}
              onClick={() => {
                if (cardNum === 6) {
                  setDisableNext(true);
                }
                onNewCardNum(cardNum, Math.min(DIVS + 1, cardNum + 1))
              }}
            >
              {disabledNext ? 'You must SCROLL' : <GiNextButton />}
            </div>
          </div>
          debug: {show && 'show'}{mounted && 'mounted'}{doRender && 'render'}
        </div>
      </div>
    </div>
  )
}

interface CardState {
  doScroll: boolean;
  num: number;
}

export default function Resume() {
  const bar1 = useRef<HTMLDivElement>(null);
  const bar2 = useRef<HTMLDivElement>(null);
  const vbar = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPoint, setScollPoint] = useState<number>(0);
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [show3, setShow3] = useState<boolean>(false);
  const [show4, setShow4] = useState<boolean>(false);
  const [show5, setShow5] = useState<boolean>(false);
  const [show6, setShow6] = useState<boolean>(false);
  const [show7, setShow7] = useState<boolean>(false);
  const [show8, setShow8] = useState<boolean>(false);
  const [show9, setShow9] = useState<boolean>(false);
  const [show10, setShow10] = useState<boolean>(false);
  const [show11, setShow11] = useState<boolean>(false);
  const [show12, setShow12] = useState<boolean>(false);
  const positsRef = useRef<number[]>(Array(5));

  const updateBar = (sPoint: number) => {
    const ONE_SCROLL = 1 / DIVS;
    positsRef.current = [
      easeFunc(Math.max(0, ONE_SCROLL - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 2 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 3 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 4 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 5 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 6 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 7 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 8 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 9 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 10 - sPoint) / ONE_SCROLL),
      easeFunc(Math.max(0, ONE_SCROLL * 11 - sPoint) / ONE_SCROLL),
    ]
    let lastNegValAt = DIVS - 1
    for (const p of positsRef.current.toReversed()) {
      if (p < 0) break;
      lastNegValAt--;
    }

    const currentCardNum = lastNegValAt + 2;
    const pipes1 = bar1.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>;
    pipes1[0].style.clipPath = `inset(0 ${(100 * positsRef.current[0]).toFixed()}% 0 0)`;
    pipes1[1].style.clipPath = `inset(0 ${(100 * positsRef.current[1]).toFixed()}% 0 0)`;
    pipes1[2].style.clipPath = `inset(0 ${(100 * positsRef.current[2]).toFixed()}% 0 0)`;
    pipes1[3].style.clipPath = `inset(0 ${(100 * positsRef.current[3]).toFixed()}% 0 0)`;
    pipes1[4].style.clipPath = `inset(0 ${(100 * positsRef.current[4]).toFixed()}% 0 0)`;

    vbar.current.style.clipPath = `inset(0 0 ${(100 * positsRef.current[5]).toFixed()}% 0)`;

    const pipes2 = bar2.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>;
    pipes2[3].style.clipPath = `inset(0 0 0 ${(100 * positsRef.current[7]).toFixed()}%)`;
    pipes2[2].style.clipPath = `inset(0 0 0 ${(100 * positsRef.current[8]).toFixed()}%)`;
    pipes2[1].style.clipPath = `inset(0 0 0 ${(100 * positsRef.current[9]).toFixed()}%)`;
    pipes2[0].style.clipPath = `inset(0 0 0 ${(100 * positsRef.current[10]).toFixed()}%)`;

    const throw1 = bar2.current?.getElementsByClassName('clip-throw') as HTMLCollectionOf<HTMLDivElement>;
    throw1[0].style.clipPath = `inset(0 ${(100 - 100 * positsRef.current[6] - (positsRef.current[6] > 0 ? 10 : 5)).toFixed()}% 0 ${(100 * positsRef.current[6]).toFixed()}% round 20px)`;

    const circles1 = bar1.current?.getElementsByClassName('circle') as HTMLCollectionOf<HTMLDivElement>;
    circles1[1].style.transform = `scale(${positsRef.current[0] <= 0 ? '1' : '0'})`
    circles1[2].style.transform = `scale(${positsRef.current[1] <= 0 ? '1' : '0'})`
    circles1[3].style.transform = `scale(${positsRef.current[2] <= 0 ? '1' : '0'})`
    circles1[4].style.transform = `scale(${positsRef.current[3] <= 0 ? '1' : '0'})`
    circles1[5].style.transform = `scale(${positsRef.current[4] <= 0 ? '1' : '0'})`

    const circles2 = bar2.current?.getElementsByClassName('circle') as HTMLCollectionOf<HTMLDivElement>;
    circles2[5].style.transform = `scale(${positsRef.current[5] <= 0 ? '1' : '0'})`
    circles2[4].style.transform = `scale(${positsRef.current[6] <= 0 ? '1' : '0'})`
    circles2[3].style.transform = `scale(${positsRef.current[7] <= 0 ? '1' : '0'})`
    circles2[2].style.transform = `scale(${positsRef.current[8] <= 0 ? '1' : '0'})`
    circles2[1].style.transform = `scale(${positsRef.current[9] <= 0 ? '1' : '0'})`
    circles2[0].style.transform = `scale(${positsRef.current[10] <= 0 ? '1' : '0'})`

    console.log(positsRef.current);

    console.log(currentCardNum)

    setShow1(currentCardNum === 1);
    setShow2(currentCardNum === 2);
    setShow3(currentCardNum === 3);
    setShow4(currentCardNum === 4);
    setShow5(currentCardNum === 5);
    setShow6(currentCardNum === 6);
    setShow7(currentCardNum === 7);
    setShow8(currentCardNum === 8);
    setShow9(currentCardNum === 9);
    setShow10(currentCardNum === 10);
    setShow11(currentCardNum === 11);
    setShow12(currentCardNum === 12);
  }

  useEffect(() => {
    setShow1(true);
    updateBar(0);
    window.addEventListener("scroll", (evt) => {
      const divHeight = scrollRef.current?.clientHeight || 0
      const sPoint = roundTo1000th(window.scrollY / (divHeight - window.innerHeight));
      // const myTarget = evt.target as HTMLDivElement
      // const sPoint = roundTo1000th(
      //   myTarget.scrollTop / (myTarget.scrollHeight - myTarget.offsetHeight)
      // );
      updateBar(sPoint);
      setScollPoint(sPoint);
    });
  }, []);

  const handleCardStateChange = async (currentCardState: CardState) => {
    if (currentCardState.doScroll) {
      const pipes = [
        ...bar1.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>,
        ...bar2.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>,
        ...bar2.current?.getElementsByClassName('clip-throw') as HTMLCollectionOf<HTMLDivElement>,
        vbar.current
      ]
      for (const zone of pipes) {
        zone.style.transition = `transform 300ms ease-out, clip-path ${CLIPPATH_DUR}ms ease-out`;
      }
      const divHeight = scrollRef.current?.clientHeight || 0
      const scrollPerCard = (divHeight - window.innerHeight);
      const result =
        await window.scroll(0, Math.floor(((currentCardState.num - 1) * Math.ceil(scrollPerCard / DIVS)))) as any;
      if (result.interrupted) {
        return;
      }
      for (const zone of pipes) {
        zone.style.transition = "";
      }
    }
  }

  const handleNewCardNum = (oldNum: number, newNum: number) => {
    console.log(oldNum, newNum)
    if (newNum >= oldNum) {
      handleCardStateChange({ doScroll: true, num: newNum });
      return;
    }
    const newPrevNum =
      !positsRef.current[oldNum - 1] || positsRef.current[oldNum - 1] > 0.93 ? newNum : oldNum
    handleCardStateChange({ doScroll: true, num: newPrevNum });
  };
  return <div ref={scrollRef} className="relative h-[calc((100dvh_-_var(--spacing)_*_15)_*_11)]">
    <div className="fixed">
      {scrollPoint}
    </div>
    <div className="fixed top-20 w-full">
      <div className="px-4 flex items-center w-full text-xs">
        <div className="relative z-2">
          <div className="absolute -translate-y-10">
            <div className="px-2 py-1 rounded-md bg-blue-200 font-sans">
              Present
            </div>
            <div className="bubble-tick-left bg-blue-200 h-3 w-3 translate-x-1" />
          </div>
          <div className="rounded-full circle" />
        </div>
        <div className="grow pipe" />
        <div className="relative z-2">
          <div className="rounded-full circle" />
        </div>
        <div className="grow pipe" />
        <div className="relative z-2">
          <div className="absolute -translate-y-10 -translate-x-[calc(50%-var(--spacing)*1)]">
            <div className="px-2 py-1 rounded-md bg-blue-200 font-sans text-nowrap">
              JAN23
            </div>
            <div className="flex justify-center">
              <div className="bubble-tick-mid bg-blue-200 h-3 w-4" />
            </div>
          </div>
          <div className="rounded-full circle" />
        </div>
        <div className="grow-2 pipe" />
        <div className="relative z-2">
          {/* var(--spacing)*1: 1 is becasue the circle is size-5. Since
              the bubble is moved left 50% based on start of div, midpoint of bubble
              will be aligned to the start of the circle so we need to move it half the 
              circle width back to the middle */}
          <div className="absolute -translate-y-10 -translate-x-[calc(50%-var(--spacing)*1)]">
            <div className="px-2 py-1 rounded-md bg-blue-200 font-sans text-nowrap">
              JAN20
            </div>
            <div className="flex justify-center">
              <div className="bubble-tick-mid bg-blue-200 h-3 w-4" />
            </div>
          </div>
          <div className="rounded-full circle" />
        </div>
        <div className="grow-2 pipe" />
        <div className="relative z-2">
          <div className="absolute -translate-y-10 -translate-x-[calc(50%-var(--spacing)*1)]">
            <div className="px-2 py-1 rounded-md bg-blue-200 font-sans text-nowrap">
              SEP18
            </div>
            <div className="flex justify-center">
              <div className="bubble-tick-mid bg-blue-200 h-3 w-4" />
            </div>
          </div>
          <div className="rounded-full circle" />
        </div>
        <div className="grow-2 pipe" />
        <div className="relative z-2">
          <div className="absolute -translate-y-10 right-0">
            <div className="px-2 py-1 rounded-md bg-blue-200 font-sans text-nowrap">
              SEP13
            </div>
            <div className="flex justify-end">
              <div className="bubble-tick-right bg-blue-200 h-3 w-3 -translate-x-1" />
            </div>
          </div>
          <div className="rounded-full circle" />
        </div>
      </div>
      <div ref={bar1} className="absolute top-0 px-4 flex items-center w-full">
        <div className="rounded-full circle clip-circle" />
        <div className="grow clip-pipe pipe"
        />
        <div className="rounded-full circle clip-circle" />
        <div className="grow clip-pipe pipe"
        />
        <div className="rounded-full circle clip-circle" />
        <div className="grow-2 clip-pipe pipe"
        />
        <div className="rounded-full circle clip-circle" />
        <div className="grow-2 clip-pipe pipe"
        />
        <div className="rounded-full circle clip-circle" />
        <div className="grow-2 clip-pipe pipe"
        />
        <div className="rounded-full circle clip-circle" />
      </div>
      <div className="relative w-full px-4 flex justify-end">
        <div className="w-3 flex justify-center">
          <div className="v-pipe" />
        </div>
        <div ref={vbar} className="absolute w-3 flex justify-center">
          <div className="v-pipe bg-blue-600!" />
        </div>
      </div>
      <div className="relative">
        <div className="px-4 flex items-center w-full text-xs">
          <div className="relative z-2">
            <div className="rounded-full circle" />
          </div>
          <div className="grow pipe" />
          <div className="relative z-2">
            <div className="rounded-full circle" />
          </div>
          <div className="grow pipe" />
          <div className="relative z-2">
            <div className="rounded-full circle" />
          </div>
          <div className="grow pipe" />
          <div className="relative z-2">
            <div className="rounded-full circle" />
          </div>
          <div className="grow pipe" />
          <div className="relative z-2">
            <div className="rounded-full circle" />
          </div>
          <div className="grow throw" />
          <div className="relative z-2">
            <div className="absolute translate-y-2.5 right-0">
              <div className="flex justify-end">
                <div className="bubble-tick-left rotate-180 bg-blue-200 h-2 w-3 -translate-x-1" />
              </div>
              <div className="px-2 py-1 rounded-md bg-blue-200 font-sans text-nowrap">
                MAY09
              </div>
            </div>
            <div className="rounded-full circle" />
          </div>
        </div>
        <div ref={bar2} className="absolute top-0 px-4 flex items-center w-full">
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-pipe pipe"
          />
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-pipe pipe"
          />
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-pipe pipe"
          />
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-pipe pipe"
          />
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-throw throw"
          />
          <div className="rounded-full circle clip-circle" />
        </div>
        <div className="absolute px-4 w-full grid grid-cols-5 justify-center translate-y-2.5">
          <div className="col-span-2" />
          <div className="col-span-2 flex justify-center items-center">
            <div className="h-3 w-0.5 bg-blue-200" />
            <div className="grow h-0.5 bg-blue-200" />
            <div className="font-sans text-xs px-2 py-1 rounded-md bg-blue-200">Projects</div>
            <div className="grow h-0.5 bg-blue-200" />
            <div className="h-3 w-0.5 bg-blue-200" />
          </div>
          <div className="col-span-1" />
        </div>
      </div>
      <div className="relative w-full pt-12">
        <Card
          show={show1}
          title="Product Owner / Full-Stack Engineer"
          cardNum={1}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">
            Built it from ground-up to beta version in less than a year. Using OpenAI’s Transcribe and Response APIs, built a scalable product that translates audio from device mic into structured data, brought it to beta launch.
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-zinc-600 mt-1">
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">React-Router</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">OpenAI</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">psql</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">NextJS</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Redis Queues</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Redis Pubsub</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">FastAPI</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Websockets</div>
          </div>
        </Card>
        <Card
          show={show2}
          title="Career Break"
          cardNum={2}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show3}
          title="Director of Applications"
          cardNum={3}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show4}
          title="Technical Manager"
          cardNum={4}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show5}
          title="Senior Salesforce Developer"
          cardNum={5}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show6 || show7}
          title="Education — Tufts University"
          cardNum={6}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show8}
          title="Project Blog"
          cardNum={8}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show9}
          title="Project Hoop"
          cardNum={9}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show10}
          title="Misc. Projects"
          cardNum={10}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show11}
          title="Skills"
          cardNum={11}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
        <Card
          show={show12}
          title="Contact Info"
          cardNum={12}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">Some text will go here. Hello. This is text.</div>
        </Card>
      </div>
    </div>
  </div>
}
