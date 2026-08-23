import next from "next";
import { useEffect, useRef, useState } from "react"
import { GiNextButton, GiPreviousButton } from "react-icons/gi";

const DIVS = 11;
const CLIPPATH_DUR = 900;

const roundToNthDecimal = (x: number, n: number) => {
  n = Math.max(0, Math.min(10, n))
  const f = Math.pow(10, n);
  return Math.round(x * f) / f
}

const easeFunc = (n: number) => {
  return roundToNthDecimal(Math.pow(Math.E, 6.003 * n - 6) - 0.0025, 5);
}

function Card({ show, title, onNewCardNum, cardNum, divRef, children }: { show: boolean, title: string, onNewCardNum: (oldNum: number, newNum: number) => void, cardNum: number, divRef?: React.Ref<HTMLDivElement>, children: React.ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [doRender, setRender] = useState<boolean>(false);
  useEffect(() => {
    if (show) {
      setRender(true);
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
      ref={divRef}
      className="card w-full origin-top absolute"
      style={{ "--open": mounted ? 1 : 0 } as React.CSSProperties}
    >
      <div className="px-5 flex justify-center">
        <div className="flex flex-col border border-black rounded-2xl px-3 py-2 max-h-[calc(100dvh_-_var(--spacing)_*_80)] overflow-scroll">
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
                ${cardNum === 12 ? 'pointer-events-none opacity-50' : ''}
                `}
              onClick={() => {
                onNewCardNum(cardNum, Math.min(DIVS + 1, cardNum + 1))
              }}
            >
              {false ? 'You must SCROLL' : <GiNextButton />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CardState {
  isForward: boolean;
  num: number;
}

export default function Resume() {
  const bar1 = useRef<HTMLDivElement>(null);
  const bar2 = useRef<HTMLDivElement>(null);
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
  const isAnimating = useRef<boolean>(false);
  const onOtherSide = useRef<boolean>(false);
  const lastCardInTopRow = useRef<HTMLDivElement>(null);

  const updateBar = (sPoint: number) => {
    const ONE_SCROLL = 1 / DIVS;
    positsRef.current = [
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 2 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 3 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 4 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 5 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 6 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 7 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 8 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 9 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 10 - sPoint) / ONE_SCROLL)),
      Math.min(100, easeFunc(Math.max(0, ONE_SCROLL * 11 - sPoint) / ONE_SCROLL)),
    ]
    let lastNegValAt = DIVS - 1
    for (const p of positsRef.current.toReversed()) {
      if (p < 0) break;
      lastNegValAt--;
    }

    const isFill = (n: number) => (n > 0 && n <= 1);
    const getClip = (n: number) => (Math.min(1, n))
    const getInset = (n: number) => {
      if (n <= 0) {
        return `inset(0 0 0 100%)`;
      }
      return `inset(0 ${(100 * getClip(n)).toFixed()}% 0 0)`;
    }

    const currentCardNum = lastNegValAt + 2;
    const pipes1 = bar1.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>;
    pipes1[0].style.clipPath = getInset(getClip(positsRef.current[0]));
    pipes1[1].style.clipPath = getInset(getClip(positsRef.current[1]));
    pipes1[2].style.clipPath = getInset(getClip(positsRef.current[2]));
    pipes1[3].style.clipPath = getInset(getClip(positsRef.current[3]));
    pipes1[4].style.clipPath = getInset(getClip(positsRef.current[4]));
    pipes1[5].style.clipPath = getInset(getClip(positsRef.current[5]));

    const ufo1 = bar1.current?.getElementsByClassName('ufo') as HTMLCollectionOf<HTMLDivElement>;
    const ufo2 = bar2.current?.getElementsByClassName('ufo') as HTMLCollectionOf<HTMLDivElement>;
    if (isFill(positsRef.current[6]) && !onOtherSide.current) {
      lastCardInTopRow.current.style.setProperty('opacity', '20%', 'important');
      lastCardInTopRow.current.style.transform = 'scale(90%)';
      ufo1[0].style.opacity = '1';
      ufo1[0].style.animation = 'roam-out 2.5s ease-in 300ms normal 1 forwards';
      ufo2[0].style.opacity = '1';
      ufo2[0].style.animation = 'roam-in 1.5s ease-out 2s normal 1';
      isAnimating.current = true
      onOtherSide.current = true
    } else {
      ufo1[0].style.opacity = '0';
      ufo1[0].style.animation = '';
      ufo2[0].style.opacity = '0';
      ufo2[0].style.animation = '';
    }
    onOtherSide.current = currentCardNum > 6;

    const pipes2 = bar2.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>;
    pipes2[0].style.clipPath = getInset(getClip(positsRef.current[7]));
    pipes2[1].style.clipPath = getInset(getClip(positsRef.current[8]));
    pipes2[2].style.clipPath = getInset(getClip(positsRef.current[9]));
    pipes2[3].style.clipPath = getInset(getClip(positsRef.current[10]));

    const circles1 = bar1.current?.getElementsByClassName('circle') as HTMLCollectionOf<HTMLDivElement>;
    circles1[0].style.transform = `scale(${isFill(positsRef.current[0]) ? '1.25' : '0'})`
    circles1[1].style.transform = `scale(${isFill(positsRef.current[1]) ? '1.25' : '0'})`
    circles1[2].style.transform = `scale(${isFill(positsRef.current[2]) ? '1.25' : '0'})`
    circles1[3].style.transform = `scale(${isFill(positsRef.current[3]) ? '1.25' : '0'})`
    circles1[4].style.transform = `scale(${isFill(positsRef.current[4]) ? '1.25' : '0'})`
    circles1[5].style.transform = `scale(${isFill(positsRef.current[5]) ? '1.25' : '0'})`
    circles1[6].style.transform = `scale(${isFill(positsRef.current[6]) ? '1.25' : '0'})`

    const circles2 = bar2.current?.getElementsByClassName('circle') as HTMLCollectionOf<HTMLDivElement>;
    circles2[0].style.transform = `scale(${isFill(positsRef.current[7]) ? '1.25' : '0'})`
    circles2[1].style.transform = `scale(${isFill(positsRef.current[8]) ? '1.25' : '0'})`
    circles2[2].style.transform = `scale(${isFill(positsRef.current[9]) ? '1.25' : '0'})`
    circles2[3].style.transform = `scale(${isFill(positsRef.current[10]) ? '1.25' : '0'})`
    circles2[4].style.transform = `scale(${positsRef.current[10] < 0 ? '1.25' : '0'})`

    // console.log(positsRef.current);
    //
    // console.log(currentCardNum)

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
    // handleCardStateChange({ isForward: true, num: 1 }, false);
    window.addEventListener("scroll", (evt) => {
      if (isAnimating.current) {
        return;
      }
      const divHeight = scrollRef.current?.clientHeight || 0
      const sPoint = roundToNthDecimal(window.scrollY / (divHeight - window.innerHeight), 3);
      // const myTarget = evt.target as HTMLDivElement
      // const sPoint = roundTo1000th(
      //   myTarget.scrollTop / (myTarget.scrollHeight - myTarget.offsetHeight)
      // );
      updateBar(sPoint);
      setScollPoint(sPoint);
    });
  }, []);

  const handleCardStateChange = async (currentCardState: CardState, boost: boolean) => {
    console.log('going to ', currentCardState.num);
    const pipes = [
      ...bar1.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>,
      ...bar2.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>,
      ...bar2.current?.getElementsByClassName('clip-throw') as HTMLCollectionOf<HTMLDivElement>,
    ]
    for (const zone of pipes) {
      zone.style.transition = `transform 300ms ease-out, clip-path ${CLIPPATH_DUR}ms ease-out`;
    }

    const scrollAmt = ((currentCardState.num) * window.innerHeight + (boost ? 50 : 0))
    const result = await window.scroll(0, scrollAmt) as any;
    if (result.interrupted) {
      return;
    }

    for (const zone of pipes) {
      zone.style.transition = "";
    }
  }

  const handleNewCardNum = (oldNum: number, newNum: number) => {
    console.log(oldNum, newNum, isAnimating.current)
    if (newNum >= oldNum) {
      const newNextNum =
        positsRef.current[oldNum - 1] < 0.36 ? newNum : oldNum
      handleCardStateChange({ isForward: true, num: newNextNum }, false);
      return;
    }
    const nextNum = (newNum === 7 && oldNum === 8) ? 6 : newNum;
    console.log(nextNum)
    handleCardStateChange({ isForward: false, num: nextNum }, false);
  };
  return <div ref={scrollRef} className="relative h-[calc((100vh_-_var(--spacing)_*_15)_*_13)]">
    <div className="fixed w-full h-20 text-3xl font-bold pt-4 justify-center flex">
      Timeline of Experience
    </div>
    <div className="fixed top-28 w-full perspective-distant">
      <div className="px-4 flex items-center w-full text-xs">
        <div className="relative z-2">
          <div className="absolute -translate-y-10">
            <div className="date-bubble">
              Present
            </div>
            <div className="bubble-tick-left bg-blue-200 h-3 w-4 translate-x-1" />
          </div>
          <div className="rounded-full circle" />
        </div>
        <div className="grow pipe" />
        <div className="relative z-2">
          <div className="absolute translate-y-4 -translate-x-[calc(50%-var(--spacing)*1.5)]">
            <div className="flex justify-center">
              <div className="bubble-tick-mid bg-blue-200 h-3 w-4 rotate-180" />
            </div>
            <div className="date-bubble">
              JUN24
            </div>
          </div>
          <div className="rounded-full circle" />
        </div>
        <div className="grow pipe" />
        <div className="relative z-2">
          {/* var(--spacing)*1.5: 1.5 is becasue the circle is size-3. Since
              the bubble is moved left 50% based on start of div, midpoint of bubble
              will be aligned to the start of the circle so we need to move it half the 
              circle width back to the middle */}
          <div className="absolute -translate-y-10 -translate-x-[calc(50%-var(--spacing)*1.5)]">
            <div className="date-bubble">
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
          <div className="absolute -translate-y-10 -translate-x-[calc(50%-var(--spacing)*1.5)]">
            <div className="date-bubble">
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
          <div className="absolute -translate-y-10 -translate-x-[calc(50%-var(--spacing)*1.5)]">
            <div className="date-bubble">
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
          <div className="absolute -translate-y-10 -translate-x-[calc(50%-var(--spacing)*1.5)]">
            <div className="date-bubble">
              SEP13
            </div>
            <div className="flex justify-center">
              <div className="bubble-tick-mid bg-blue-200 h-3 w-4" />
            </div>
          </div>
          <div className="rounded-full circle" />
        </div>
        <div className="grow pipe" />
        <div className="relative z-2">
          <div className="absolute translate-y-4 right-0">
            <div className="flex justify-end">
              <div className="bubble-tick-left bg-blue-200 h-3 w-4 -translate-x-1 rotate-180" />
            </div>
            <div className="date-bubble">
              MAY09
            </div>
          </div>
          <div className="rounded-full circle" />
        </div>
      </div>
      <div ref={bar1} className="absolute top-0 px-4 flex items-center w-full">
        <div className="rounded-full circle clip-circle" />
        <div className="grow clip-pipe pipe" />
        <div className="rounded-full circle clip-circle" />
        <div className="grow clip-pipe pipe" />
        <div className="rounded-full circle clip-circle" />
        <div className="grow-2 clip-pipe pipe" />
        <div className="rounded-full circle clip-circle" />
        <div className="grow-2 clip-pipe pipe" />
        <div className="rounded-full circle clip-circle" />
        <div className="grow-2 clip-pipe pipe" />
        <div className="rounded-full circle clip-circle" />
        <div className="grow clip-pipe pipe" />
        <div className="relative z-2">
          <div className="rounded-full circle clip-circle scale-0" />
          <div
            className="absolute top-0 rounded-full ufo opacity-0"
          />
        </div>
      </div>
      <div className="relative w-full pt-16">
        <Card
          show={show1}
          title="Product Owner / Full-Stack Engineer"
          cardNum={1}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-base italic">
            <u>Bucky</u>, Remote, 1 yr.
          </div>
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
          title="Career Break (Medical)"
          cardNum={2}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-lg">18 mos.</div>
        </Card>
        <Card
          show={show3}
          title="Director of Applications/Dev."
          cardNum={3}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-base italic">
            <u>CM&F Group Inc.</u>, New York City, 3 yrs.
          </div>
          <div className="text-lg">
            Owned development and deployment of AWS and Salesforce codebases. Built out a real-time insurance quote comparison tool, delivered value to millions of users. Engineered responsive backend PDF generation achieving concurrency. Proofed out and polished home-grown CI/CD automation. Mentored three associate developers, while working closely with C-suite. Developed a customer portal, providing personalized experience for the entire online customer base.
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-zinc-600 mt-1">
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">SFDC Lightning</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Apex</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">NodeJS</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">AWS API Gateway</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Lambda</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">SQS</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">CodePipeline</div>
          </div>
        </Card>
        <Card
          show={show4}
          title="Technical Manager"
          cardNum={4}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-base italic">
            <u>IBM</u>, New York City, 1 yr 3 mos.
          </div>
          <div className="text-lg">Worked with Engs, EMs, Sales to create solutions, present proposals to prospective clients. Responsible for reviewing code written for clients in the NE region (20-30 codebases total). Ran code reviews and workshops with the internal Salesforce developer community. Acted as tech lead on projects for companies that rank in the Fortune 500 (44th and 75th).</div>
          <div className="flex flex-wrap gap-1.5 text-xs text-zinc-600 mt-1">
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">SFDC</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Mulesoft</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">SOQL</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Java</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Mobile (iOS)</div>
          </div>
        </Card>
        <Card
          show={show5}
          title="Senior Salesforce Developer"
          cardNum={5}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-base italic">
            <u>BlueWolf</u>, Boston/Chicago/NYC, 5 yrs.
          </div>
          <div className="text-lg">Implemented solutions for small-to-medium size clients’ Salesforce instances. Learned to adapt to different situations, identifying and filling in gaps, leveraging technical expertise. Ranked among top 20 best performers out of 300+ employees. Moved to Chicago to help start new branch.</div>
        </Card>
        <Card
          divRef={lastCardInTopRow}
          show={show6 || show7}
          title="Education — Tufts University"
          cardNum={6}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-base italic">
            B.A.Sc. degree in Computer Science, Medford, MA, 4 yrs.
          </div>
          <div className="text-lg">
            Relevant coursework: Data Structures, Algorithms, Machine Structure and Assembly-Language Programming, Programming Languages, Web Programming, Web Engineering, Discrete Math, Intro to ML, OS, Networks, Computational Theory, Music Apps on the iPad
          </div>
        </Card>
        <Card
          show={show8}
          title="Project — Jordys.Site"
          cardNum={8}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-base italic">
            2024
          </div>
          <div className="text-lg">
            My personal blog, Jordys.site, lets me or any authenticated user make posts and upload media, leveraging SSG for speed.
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-zinc-600 mt-1">
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">MERN</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">MongoDB</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">React</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">NodeJS</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">PassportJS</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">AWS S3</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Bash</div>
          </div>
        </Card>
        <Card
          show={show9}
          title="Project — Hoop"
          cardNum={9}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-base italic">
            2022
          </div>
          <div className="text-lg">
            Precursor to Bucky, keyboard-input stat-tracking terminal program. Images coming soon..
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-zinc-600 mt-1">
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">NodeJS</div>
          </div>
        </Card>
        <Card
          show={show10}
          title="Misc. Projects"
          cardNum={10}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-xl font-bold mt-2">
            Shazam Music Files <span className="text-base italic">2022</span>
          </div>
          <div className="text-lg">
            Bash program to get album art and metadata from Shazam for disparate music files.
          </div>
          <div className="text-xl font-bold mt-2">
            WordPress Guru <span className="text-base italic">2021-2022</span>
          </div>
          <div className="text-lg">
            Built websites for small business, like coffee shops and non-profit sports orgs.
          </div>
          <div className="text-xl font-bold mt-2">
            Uji Shower <span className="text-base italic">2013</span>
          </div>
          <div className="text-lg">
            Built the website and Arduino code for UjiShower, a showerhead that provides feedback for water consumption. Won 3rd place in the Tufts New Ventures comp.
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-zinc-600 mt-1">
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Bash</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">HTML</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">CSS</div>
            <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">C++</div>
          </div>
        </Card>
        <Card
          show={show11}
          title="Skills"
          cardNum={11}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-xl font-bold mt-2">
            Programming
          </div>
          <div className="text-lg">
            Java, Typescript, C++, Python, MySQL, HTML/CSS, Apex, Lightning, VF, Bash, Lua
          </div>
          <div className="text-xl font-bold mt-2">
            Languagues
          </div>
          <div className="text-lg">
            Korean (native), Japanese (JLPT N4), English (native)
          </div>
          <div className="text-xl font-bold mt-2">
            Technical
          </div>
          <div className="text-lg">
            105 WPM, nvim, npm, Redis, PSQL, NodeJS, Redux, NextJS, GH, git, Linux, MacOS, Windows
          </div>
          <div className="text-xl font-bold mt-2">
            Interests
          </div>
          <div className="text-lg">
            Basketball, wine, food blogging, audiophile, history, TFT (game)
          </div>
        </Card>
        <Card
          show={show12}
          title="Contact"
          cardNum={12}
          onNewCardNum={handleNewCardNum}
        >
          <div className="text-xl mt-2">
            Jordan Kang <span className="text-base italic">Also "Joo"</span>
          </div>
          <div className="text-lg mt-2">(Email) minijoo@gmail.com</div>
          <div className="text-lg">(Phone) 212-301-7792</div>
          <div className="text-lg">(LinkedIn) jyk-7r0</div>
          <div className="text-lg">(GitHub) minijoo</div>
          <div className="text-lg">(Location) New York City</div>
          <div className="text-lg mt-2">US Citizen</div>
        </Card>
      </div>
    </div>
    <div className="fixed bottom-20 w-full">
      <div className="relative mt-2">
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
        </div>
        <div ref={bar2} className="absolute top-0 px-4 flex items-center w-full">
          <div className="relative z-2">
            <div className="rounded-full circle clip-circle" />
            <div
              className="absolute top-0 rounded-full ufo ufo-2"
              onAnimationEnd={() => {
                isAnimating.current = false;
                handleCardStateChange({ isForward: true, num: 8 }, false)
              }}
            />
          </div>
          <div className="grow clip-pipe pipe" />
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-pipe pipe" />
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-pipe pipe" />
          <div className="rounded-full circle clip-circle" />
          <div className="grow clip-pipe pipe" />
          <div className="rounded-full circle clip-circle" />
        </div>
        <div className="absolute px-4 w-full grid grid-cols-4 justify-center translate-y-2.5">
          <div className="col-span-3 flex justify-start items-center">
            <div className="h-3 w-0.5 bg-blue-200" />
            <div className="grow h-0.5 bg-blue-200" />
            <div className="font-sans text-xs px-2 py-1 rounded-md bg-blue-200">Projects</div>
            <div className="grow h-0.5 bg-blue-200" />
            <div className="h-3 w-0.5 bg-blue-200" />
          </div>
          <div className="col-span-1" />
        </div>
      </div>
    </div>
  </div>
}
