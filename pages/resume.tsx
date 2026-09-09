import { useEffect, useRef, useState } from "react"
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { PiArrowSquareLeftLight, PiArrowSquareRightLight, PiMouseScrollLight } from "react-icons/pi";

const DIVS = 11;
const CLIPPATH_DUR = 900;

const roundToNthDecimal = (x: number, n: number) => {
  n = Math.max(0, Math.min(10, n))
  const f = Math.pow(10, n);
  return Math.round(x * f) / f
}

const easeFunc = (n: number) => {
  return n;
}

function Card({ show, title, cardNum, divRef, children }: { show: boolean, title: string, cardNum: number, divRef?: React.Ref<HTMLDivElement>, children: React.ReactNode }) {
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

  const cardRRNum = cardNum % 4;
  return (
    <div
      ref={divRef}
      className="card w-full origin-top h-full"
      style={{ "--open": mounted ? 1 : 0 } as React.CSSProperties}
    >
      <div className="px-5 flex justify-center items-center h-full">
        <div className={`flex flex-col justify-between border border-zinc-600 rounded-2xl px-3 py-3 max-h-full overflow-hidden from-[#AFEEFD] via-[#F7D2D3] to-[#EDA659]'
          ${cardRRNum === 1
            ? 'bg-linear-to-bl'
            : cardRRNum === 2
              ? 'bg-linear-to-br'
              : cardRRNum === 3
                ? 'bg-linear-to-tr'
                : 'bg-linear-to-tl'
          }
                `}>
          <div className="text-xl md:text-2xl font-bold">{title}</div>
          {children}
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
  const [cardNum, setCardNum] = useState<number>(1);
  const positsRef = useRef<number[]>(Array(5));
  const isAnimating = useRef<boolean>(false);
  const onOtherSide = useRef<boolean>(false);
  const lastCardInTopRow = useRef<HTMLDivElement>(null);
  const navBtnsRef = useRef<HTMLDivElement>(null);

  const updateBar = (sPoint: number) => {
    const ONE_SCROLL = 1 / (DIVS);
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
    console.log(positsRef.current)
    let lastNegValAt = DIVS - 1
    for (const p of positsRef.current.toReversed()) {
      if (p <= 0) break;
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
      if (lastCardInTopRow.current) {
        lastCardInTopRow.current.style.setProperty('opacity', '20%', 'important');
        lastCardInTopRow.current.style.transform = 'scale(90%)';
      }
      ufo1[0].style.opacity = '1';
      ufo1[0].style.animation = 'roam-out 2.5s ease-in 0s normal 1 forwards';
      ufo2[0].style.opacity = '1';
      ufo2[0].style.animation = 'roam-in 1s ease-out 800ms normal 1';
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
    circles2[4].style.transform = `scale(${positsRef.current[10] <= 0 ? '1.25' : '0'})`

    // console.log(positsRef.current);
    //
    // console.log(currentCardNum)

    setCardNum(currentCardNum);
  }

  useEffect(() => {
    handleCardStateChange({ isForward: true, num: 11 }, false);
    scrollRef.current.addEventListener("scroll", (evt) => {
      if (isAnimating.current) {
        return;
      }
      const myTarget = evt.target as HTMLDivElement
      const onePageHeight = scrollRef.current?.clientHeight || 0
      const divHeight = onePageHeight * 12;//scrollRef.current.children[0].clientHeight; //scrollRef.current.scrollHeight;
      const sPoint = roundToNthDecimal(myTarget.scrollTop / (divHeight - onePageHeight), 5);
      updateBar(sPoint);
      setScollPoint(sPoint);
    });

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'ArrowLeft') {
        (navBtnsRef.current?.children[0] as HTMLDivElement).click()
      } else if (evt.key === 'ArrowRight') {
        (navBtnsRef.current?.children[1] as HTMLDivElement).click()
      }
    });
  }, []);

  const handleCardStateChange = async (currentCardState: CardState, boost: boolean) => {
    const pipes = [
      ...bar1.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>,
      ...bar2.current?.getElementsByClassName('clip-pipe') as HTMLCollectionOf<HTMLDivElement>,
    ]
    for (const zone of pipes) {
      zone.style.transition = `transform 300ms ease-out, clip-path ${CLIPPATH_DUR}ms ease-out`;
    }

    const onePageHeight = scrollRef.current?.clientHeight;
    const scrollAmt = (-1 + (currentCardState.num) * onePageHeight + (boost ? 50 : 0))
    const result = await scrollRef.current.scroll(0, scrollAmt) as any;
    if (result.interrupted) {
      return;
    }

    for (const zone of pipes) {
      zone.style.transition = "";
    }
  }

  const handleNewCardNum = (oldNum: number, newNum: number) => {
    if (newNum >= oldNum) {
      const newNextNum =
        positsRef.current[oldNum - 1] < 0.02 ? newNum : oldNum
      handleCardStateChange({ isForward: true, num: newNextNum }, false);
      return;
    }
    const nextNum = (newNum === 7 && oldNum === 8) ? 6 : newNum;
    handleCardStateChange({ isForward: false, num: nextNum }, false);
  };

  return <div className="h-dvh w-full font-sans flex justify-center overflow-hidden bg-linear-to-b from-[#AFEEFD]/60 via-[#F7D2D3]/20 to-[#EDA659]/70">
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <div className="h-full w-full md:w-3xl flex flex-col justify-between items-center">
      <title>Jordan Kang Resume</title>
      <style jsx global>{`
        html, body {
          overflow: hidden;
          overscroll-behavior: none;
          height: 100%;
        }
      `}</style>
      <div className="w-full relative flex flex-col justify-start z-7">
        <div className="w-full text-3xl md:text-4xl font-bold py-4 justify-center flex gap-2 hover:cursor-pointer active:underline hover:underline active:scale-90 transition-transform duration-150 ease-out;"
          onClick={() => { handleCardStateChange({ isForward: false, num: 1 }, false) }}
        >
          My Resume
          <div className="text-sm flex flex-col items-center">
            (mobile-friendly!)
            <div className="text-xs font-normal italic flex gap-0.5">*navigate:
              <span className="text-lg"><PiMouseScrollLight /></span>
              <span className="text-lg"><PiArrowSquareLeftLight /></span>
              <span className="text-lg"><PiArrowSquareRightLight /></span>
            </div>
          </div>
        </div>
        <div className="w-full perspective-distant mt-10 mb-12 md:mb-16">
          <div className="px-4 flex items-center w-full text-xs">
            <div className="relative z-2">
              <div className="absolute date-bubble-top -translate-x-2.5 md:translate-x-0">
                <div className="relative flex justify-center items-center date-bubble-text">
                  <div className="z-1">Present</div>
                  <BubbleLeft className="absolute top-0 left-0 z-0 overflow-visible w-full" />
                </div>
              </div>
              <div className="rounded-full circle" />
            </div>
            <div className="grow pipe" />
            <div className="relative z-2">
              <div className="absolute date-bubble-bottom date-bubble-center">
                <div className="relative flex justify-center items-center date-bubble-text">
                  <div className="z-1">JUN24</div>
                  <BubbleCenter className="absolute bottom-0 left-0 z-0 overflow-visible rotate-180 w-full" />
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
              <div className="absolute date-bubble-top date-bubble-center">
                <div className="relative flex justify-center items-center date-bubble-text">
                  <div className="z-1">JAN23</div>
                  <BubbleCenter className="absolute top-0 left-0 z-0 overflow-visible w-full" />
                </div>
              </div>
              <div className="rounded-full circle" />
            </div>
            <div className="grow-2 pipe" />
            <div className="relative z-2">
              <div className="absolute date-bubble-bottom date-bubble-center">
                <div className="relative flex justify-center items-center date-bubble-text">
                  <div className="z-1">JAN20</div>
                  <BubbleCenter className="absolute bottom-0 left-0 z-0 overflow-visible rotate-180 w-full" />
                </div>
              </div>
              <div className="rounded-full circle" />
            </div>
            <div className="grow-2 pipe" />
            <div className="relative z-2">
              <div className="absolute date-bubble-top date-bubble-center">
                <div className="relative flex justify-center items-center date-bubble-text">
                  <div className="z-1">SEP18</div>
                  <BubbleCenter className="absolute top-0 left-0 z-0 overflow-visible w-full" />
                </div>
              </div>
              <div className="rounded-full circle" />
            </div>
            <div className="grow-2 pipe" />
            <div className="relative z-2">
              <div className="absolute date-bubble-bottom date-bubble-center">
                <div className="relative flex justify-center items-center date-bubble-text">
                  <div className="z-1">SEP13</div>
                  <BubbleCenter className="absolute bottom-0 left-0 z-0 overflow-visible rotate-180 w-full" />
                </div>
              </div>
              <div className="rounded-full circle" />
            </div>
            <div className="grow pipe" />
            <div className="relative z-2">
              <div className="absolute date-bubble-top translate-x-2.5 md:translate-x-0 right-0">
                <div className="relative flex justify-center items-center date-bubble-text">
                  <div className="z-1">MAY09</div>
                  <BubbleRight className="absolute top-0 left-0 z-0 overflow-visible w-full" />
                </div>
              </div>
              <div className="rounded-full circle" />
            </div>
          </div>
          <div ref={bar1} className="absolute top-0 px-4 flex items-center w-full">
            <div className="rounded-full circle clip-circle" />
            <div className="grow clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow-2 clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow-2 clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow-2 clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="relative z-7">
              <div className="rounded-full circle clip-circle scale-0" />
              <div className="absolute top-0 rounded-full ufo opacity-0" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[calc(100dvh_-_var(--spacing)_*_100)] relative z-5">
        <div ref={scrollRef} className="absolute w-full h-full overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 z-1">
          <div className="h-[calc((100dvh_-_var(--spacing)_*_100)_*_12_+_10px)] opacity-0" />
        </div>
        <div className="card-section absolute w-full flex items-center h-full z-0">
          <Card
            show={cardNum === 1}
            title="Product Owner / Full-Stack Engineer"
            cardNum={1}
          >
            <div className="text-base md:text-lg italic">
              <u>Bucky.live</u>, Remote, 1 yr.
            </div>
            <div className="text-base md:text-xl">
              Built it from ground-up to beta version in less than a year. Using OpenAI’s Transcribe and Response APIs, built a scalable product that translates audio from device mic into structured data, brought it to beta launch.
            </div>
            <div className="tech-rings">
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">React-Router</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Redis Queues</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Redis Pubsub</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">OpenAI</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">psql</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">NextJS</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">FastAPI</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Websockets</div>
            </div>
          </Card>
          <Card
            show={cardNum === 2}
            title="Career Break (Medical)"
            cardNum={2}
          >
            <div className="text-lg md:text-xl">18 mos.</div>
          </Card>
          <Card
            show={cardNum === 3}
            title="Director of Applications/Dev."
            cardNum={3}
          >
            <div className="flex flex-col gap-2">
              <div className="text-base md:text-lg italic">
                <u>CM&F Group Inc.</u>, New York City, 3 yrs.
              </div>
              <div className="text-xs md:text-lg">
                Owned development and deployment of AWS and Salesforce codebases. Built out a real-time insurance quote comparison tool, delivered value to millions of users. Engineered responsive backend PDF generation achieving concurrency. Proofed out and polished home-grown CI/CD automation. Mentored three associate developers, while working closely with C-suite. Developed a customer portal, providing personalized experience for the entire online customer base.
              </div>
            </div>
            <div className="tech-rings">
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
            show={cardNum === 4}
            title="Technical Manager"
            cardNum={4}
          >
            <div className="text-base md:text-lg italic">
              <u>IBM</u>, New York City, 1 yr 3 mos.
            </div>
            <div className="text-sm md:text-xl">Worked with Engs, EMs, Sales to create solutions, present proposals to prospective clients. Responsible for reviewing code written for clients in the NE region (20-30 codebases total). Ran code reviews and workshops with the internal Salesforce developer community. Acted as tech lead on projects for companies that rank in the Fortune 500 (44th and 75th).</div>
            <div className="tech-rings">
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">SFDC</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Mulesoft</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">SOQL</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Java</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Mobile (iOS)</div>
            </div>
          </Card>
          <Card
            show={cardNum === 5}
            title="Senior Salesforce Developer"
            cardNum={5}
          >
            <div className="text-base md:text-lg italic">
              <u>BlueWolf</u>, Boston/Chicago/NYC, 5 yrs.
            </div>
            <div className="text-base md:text-xl">Implemented solutions for small-to-medium size clients’ Salesforce instances. Learned to adapt to different situations, identifying and filling in gaps, leveraging technical expertise. Ranked among top 20 best performers out of 300+ employees. Moved to Chicago to help start new branch.</div>
          </Card>
          <Card
            divRef={lastCardInTopRow}
            show={cardNum === 6 || cardNum === 7}
            title="Education — Tufts University"
            cardNum={6}
          >
            <div className="text-base md:text-lg italic">
              B.A.Sc. degree in Computer Science, Medford, MA, 4 yrs.
            </div>
            <div className="text-base md:text-xl">
              Relevant coursework: Data Structures, Algorithms, Machine Structure and Assembly-Language Programming, Programming Languages, Web Programming, Web Engineering, Discrete Math, Intro to ML, OS, Networks, Computational Theory, Music Apps on the iPad
            </div>
          </Card>
          <Card
            show={cardNum === 8}
            title="Project (1/3)"
            cardNum={8}
          >
            <div className="text-h2 mt-2">
              Last I Checked <span className="text-base md:text-lg italic">2026</span>
            </div>
            <div className="text-p-sm">
              A vibe-coded app that helps users keep track of public numbers and shows what they saw last time they checked. (tinyurl.com/lastichecked)
            </div>
            <div className="text-h2 mt-2">
              Jordys.Site <span className="text-base md:text-lg italic">2024</span>
            </div>
            <div className="text-p-sm">
              My personal blog, Jordys.site, lets me or any authenticated user make posts and upload media, leveraging SSG for speed.
            </div>
            <div className="tech-rings">
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Claude Code</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Puppeteer MCP</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">IndexedDB</div>
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
            show={cardNum === 9}
            title="Projects (2/3)"
            cardNum={9}
          >
            <div className="text-h2 mt-2">
              Hoop <span className="text-base md:text-lg italic">2022</span>
            </div>
            <div className="text-p-sm">
              Precursor to Bucky, keyboard-input stat-tracking terminal program. Used to record, share, and analyze stats at basketball tournaments.
            </div>
            <div className="text-h2 mt-2">
              Shazam Music Files <span className="text-base italic">2022</span>
            </div>
            <div className="text-p-sm">
              Bash program to get album art and metadata from Shazam for disparate music files.
            </div>
            <div className="tech-rings">
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">NodeJS</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">Bash</div>
            </div>
          </Card>
          <Card
            show={cardNum === 10}
            title="Projects (3/3)"
            cardNum={10}
          >
            <div className="text-h2 mt-2">
              WordPress Guru <span className="text-base md:text-lg italic">2021-2022</span>
            </div>
            <div className="text-p-sm">
              Built websites for small business, like coffee shops and non-profit sports orgs.
            </div>
            <div className="text-h2 mt-2">
              Uji Shower <span className="text-base italic">2013</span>
            </div>
            <div className="text-p-sm">
              Built the website and Arduino code for UjiShower, a showerhead that provides feedback for water consumption. Won 3rd place in the Tufts New Ventures comp.
            </div>
            <div className="tech-rings">
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">HTML</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">CSS</div>
              <div className="rounded-3xl px-1 py-0.5 border border-zinc-600">C++</div>
            </div>
          </Card>
          <Card
            show={cardNum === 11}
            title="Skills"
            cardNum={11}
          >
            <div className="text-h2-sm mt-2">
              Programming
            </div>
            <div className="text-p-sm">
              Java, Typescript, C++, Python, MySQL, HTML/CSS, Apex, Lightning, VF, Bash, Lua
            </div>
            <div className="text-h2-sm mt-2">
              Languagues
            </div>
            <div className="text-xs md:text-lg">
              Korean, Japanese (JLPT N4), English
            </div>
            <div className="text-h2-sm mt-2">
              Technical
            </div>
            <div className="text-xs md:text-lg">
              105 WPM, nvim, npm, Redis, PSQL, NodeJS, Redux, NextJS, GH, git, Linux, MacOS, Windows
            </div>
            <div className="text-h2-sm mt-2">
              Interests
            </div>
            <div className="text-xs md:text-lg">
              Basketball, wine, food blogging, audiophile, history, TFT (game)
            </div>
          </Card>
          <Card
            show={cardNum === 12}
            title="Contact"
            cardNum={12}
          >
            <div className="text-h2 mt-2">
              Jordan Kang <span className="text-sm md:text-base font-normal italic">Also "Joo"</span>
            </div>
            <div className="text-p">
              <div className="mt-2">(Email) minijoo@gmail.com</div>
              <div className="">(Phone) 212-301-7792</div>
              <div className="">(LinkedIn) jyk-7r0</div>
              <div className="">(GitHub) minijoo</div>
              <div className="">(Location) New York City</div>
              <div className="mt-2">US Citizen</div>
            </div>
          </Card>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div ref={navBtnsRef} className="mt-3 flex gap-1.5 justify-center">
          <div
            className={`secondary-button py-4! border-zinc-800! hover:text-black!
                ${cardNum === 1 ? 'pointer-events-none opacity-50' : ''}
                `}
            onClick={() => {
              if (isAnimating.current) return;
              handleNewCardNum(cardNum, Math.max(1, cardNum - 1))
            }}
          >
            <GiPreviousButton />
          </div>
          <div
            className={`secondary-button py-4! border-zinc-800! hover:text-black!
                ${cardNum === 12 ? 'pointer-events-none opacity-50' : ''}
                `}
            onClick={() => {
              if (isAnimating.current) return;
              handleNewCardNum(cardNum, Math.min(DIVS + 1, cardNum + 1))
            }}
          >
            {false ? 'You must SCROLL' : <GiNextButton />}
          </div>
        </div>
        <div className="w-full relative h-12 md:h-18">
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
            <div className="relative z-7">
              <div className="rounded-full circle clip-circle" />
              <div
                className="absolute top-0 rounded-full ufo ufo-2"
                onAnimationEnd={() => {
                  isAnimating.current = false;
                  handleCardStateChange({ isForward: true, num: 8 }, false)
                }}
              />
            </div>
            <div className="grow clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
            <div className="grow clip-pipe pipe">
              <div className="pipe-fill" />
            </div>
            <div className="rounded-full circle clip-circle" />
          </div>
          <div className="absolute px-4 md:px-7.5 w-full grid grid-cols-4 justify-center translate-y-2.5">
            <div className="col-span-3 flex justify-start items-center">
              <div className="h-3 w-0.5 md:h-6 md:w-1 bg-zinc-600" />
              <div className="grow h-0.5 md:h-1 bg-zinc-600" />
              <div className="font-sans text-xs md:text-base px-2 py-1 rounded-lg bg-white border border-zinc-600">
                Projects
              </div>
              <div className="grow h-0.5 md:h-1 bg-zinc-600" />
              <div className="h-3 w-0.5 md:h-6 md:w-1 bg-zinc-600" />
            </div>
            <div className="col-span-1" />
          </div>
        </div>
        <div className="footer h-8">
        </div>
      </div>
    </div>
  </div>
}

const BubbleCenter = ({ className }: { className: string }) => {
  return <svg className={className} width="60" height="36" viewBox="-1 -1 62 38" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8,0 L52,0 A8,8 0 0 1 60,8 L60,16 A8,8 0 0 1 52,24
L38,24 L30,36 L22,24
L8,24 A8,8 0 0 1 0,16 L0,8 A8,8 0 0 1 8,0 Z"
      fill="#FFF"
      stroke="#52525C"
      strokeWidth="1"
    />
  </svg>
}

const BubbleRight = ({ className }: { className: string }) => {
  return <svg className={className} width="60" height="36" viewBox="-1 -1 62 38" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8,0 L52,0 A8,8 0 0 1 60,8 L60,16 A8,8 0 0 1 52,24
L44,36 L36,24
L8,24 A8,8 0 0 1 0,16 L0,8 A8,8 0 0 1 8,0 Z"
      fill="#FFF"
      stroke="#52525C"
      strokeWidth="1"
    />
  </svg>
}

const BubbleLeft = ({ className }: { className: string }) => {
  return <svg className={className} width="60" height="36" viewBox="-1 -1 62 38" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8,0
         L52,0
         A8,8 0 0 1 60,8
         L60,16
         A8,8 0 0 1 52,24
         L24,24
         L16,36
         L8,24
         A8,8 0 0 1 0,16
         L0,8
         A8,8 0 0 1 8,0
         Z"
      fill="#FFF"
      stroke="#52525C"
      strokeWidth="1"
    />
  </svg>
}
