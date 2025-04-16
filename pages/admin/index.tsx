import Head from "next/head";
import ContainerHome from "../../components/container-home";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import { useEffect, useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ApiPost, AuthenticationError } from "../../interfaces/jordys-api";
import cn from "classnames";
import DateFormatter from "../../components/date-formatter";
import { JordysAPI } from "../../lib/jordys-api";

type Card = {
  element: Element;
  width: number;
  height: number;
  date: Date;
};

type YearOfMonthsOfColsOfCards = {
  year: number;
  monthsOfColsOfCards: MonthOfColsOfCards[];
  isTail?: boolean;
};

type MonthOfColsOfCards = {
  month: number;
  colsOfCards: Card[][];
  isTail?: boolean;
};

const colsOfCards: Card[][] = [];
const yearsOfMonthsOfColsOfCards: YearOfMonthsOfColsOfCards[] = [];
let shortestTailCol: number;
export default function AdminPage({ ip }) {
  const Jordys_API = new JordysAPI(ip);
  let COLS = 2;

  const [cardsReady, setCardsReady] = useState<boolean>(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [colsRef, setColsRef] = useState<HTMLDivElement | null>(null);
  const [data, setData] = useState<ApiPost[]>(null);

  useEffect(() => {
    Jordys_API.retrieveAllPosts()
      .then((allPosts) => {
        setData(allPosts);
      })
      .catch((err) => {
        if (err instanceof AuthenticationError) {
          console.log("You are not authenticated");
          alert(
            "This page requires authentication. Upon acknowledgement, you will be immediately rerouted to the login page."
          );
          window.location.replace("/admin/login?redirectPath=admin");
          return;
        }
        console.log("an error occurred retrieving posts. ", err);
      });
  }, []);

  useLayoutEffect(() => {
    COLS = window.matchMedia("(width >= 48rem)").matches ? 3 : 2;
    if (!ref) return;
    const readCards: Card[] = [];
    for (let i = 0; i < ref.children.length; i++) {
      const child = ref.children[i];
      const rect = child.getBoundingClientRect();

      readCards.push({
        width: rect.width,
        height: rect.height,
        element: child,
        date: new Date(data[i].date),
      });
    }
    // sort cards by date
    readCards.sort((a, b) => (a.date < b.date ? -1 : 1));

    const totalHeights: number[] = [];
    for (let i = 0; i < COLS; i++) {
      colsOfCards.push([]);
      totalHeights.push(0);
    }

    const prev_year_and_month = [-1, -1];
    readCards.forEach((card, index) => {
      if (card.date.getUTCFullYear() !== prev_year_and_month[0]) {
        // if year is new
        // Housekeeping
        const initColsOfCards = [];
        for (let i = 0; i < COLS; i++) {
          // reset to 0s
          totalHeights[i] = 0;
          // init cols array
          initColsOfCards.push([]);
        }

        const newYear: YearOfMonthsOfColsOfCards = {
          year: card.date.getUTCFullYear(),
          monthsOfColsOfCards: [
            { month: card.date.getUTCMonth(), colsOfCards: initColsOfCards },
          ],
        };
        yearsOfMonthsOfColsOfCards.push(newYear);
        prev_year_and_month[0] = card.date.getUTCFullYear();
        prev_year_and_month[1] = card.date.getUTCMonth();
      } else if (card.date.getUTCMonth() !== prev_year_and_month[1]) {
        // if year is same but month is new
        // Housekeeping
        const initColsOfCards = [];
        for (let i = 0; i < COLS; i++) {
          // reset to 0s
          totalHeights[i] = 0;
          // init cols array
          initColsOfCards.push([]);
        }

        const newMonth: MonthOfColsOfCards = {
          month: card.date.getUTCMonth(),
          colsOfCards: initColsOfCards,
        };
        yearsOfMonthsOfColsOfCards[
          yearsOfMonthsOfColsOfCards.length - 1
        ].monthsOfColsOfCards.push(newMonth);
        prev_year_and_month[1] = card.date.getUTCMonth();
      }
      // else .. there is already a bucket to place card into.. keep moving

      // determine which column to add to using TOTAL HEIGHTS
      let minCol = 0;
      for (let i = 1; i < COLS; i++) {
        if (totalHeights[i] < totalHeights[minCol]) minCol = i;
      }
      yearsOfMonthsOfColsOfCards[
        yearsOfMonthsOfColsOfCards.length - 1
      ].monthsOfColsOfCards[
        yearsOfMonthsOfColsOfCards[yearsOfMonthsOfColsOfCards.length - 1]
          .monthsOfColsOfCards.length - 1
      ].colsOfCards[minCol].push(card);
      totalHeights[minCol] += card.height;
    });

    const yearsLength = yearsOfMonthsOfColsOfCards.length;
    if (yearsLength) {
      yearsOfMonthsOfColsOfCards[yearsLength - 1].isTail = true;
      const monthsLength =
        yearsOfMonthsOfColsOfCards[yearsLength - 1].monthsOfColsOfCards.length;
      if (monthsLength) {
        yearsOfMonthsOfColsOfCards[yearsLength - 1].monthsOfColsOfCards[
          monthsLength - 1
        ].isTail = true;
      }
    }

    shortestTailCol = totalHeights.reduce(
      ([minCol, minHeight], h, i) => {
        if (h < minHeight) return [i, h];
        return [minCol, minHeight];
      },
      [-1, Infinity]
    )[0];
    console.log(shortestTailCol);

    setCardsReady(true);
  }, [ref]);

  useLayoutEffect(() => {
    if (!colsRef) return;
    const node = createRoot(colsRef);
    node.render(
      <>
        {yearsOfMonthsOfColsOfCards.map((yearOfMonthsOfColsOfCards) => (
          <>
            <div className="col-span-2 md:col-span-3 text-center sticky h-6 top-0">
              <div className="flex flex-row items-center bg-white">
                <div className="h-0.5 grow mr-1" />
                <div className="grow-0 text-black/60">
                  {yearOfMonthsOfColsOfCards.year}
                </div>
                <div className="h-0.5 grow ml-1" />
              </div>
            </div>
            {yearOfMonthsOfColsOfCards.monthsOfColsOfCards.map(
              (monthOfColsOfCards) => (
                <>
                  <div className="col-span-2 md:col-span-3 text-center sticky h-6 top-6">
                    <div className="flex flex-row items-center bg-white">
                      <div className="bg-black/20 h-0.5 grow mr-1" />
                      <div className="grow-0 text-black/60">
                        {new Date(
                          Date.UTC(2025, monthOfColsOfCards.month + 1, 1)
                        ).toLocaleDateString("en-US", { month: "long" })}
                      </div>
                      <div className="bg-black/20 h-0.5 grow ml-1" />
                    </div>
                  </div>
                  {monthOfColsOfCards.colsOfCards.map((colOfCards, i) => (
                    <>
                      <div className="col-span-1 flex flex-col">
                        {colOfCards.map((card) => (
                          <div
                            ref={(ref) => {
                              ref.appendChild(card.element);
                            }}
                          ></div>
                        ))}
                        {yearOfMonthsOfColsOfCards.isTail &&
                        monthOfColsOfCards.isTail &&
                        shortestTailCol === i ? (
                          <a
                            className="w-full my-1 text-center h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                            href="/admin/db-post/new"
                          >
                            ➕ New Post
                          </a>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  ))}
                </>
              )
            )}
          </>
        ))}
      </>
    );
  }, [colsRef]);

  return (
    <>
      <Layout>
        <Head>
          <title>{`Admins Only | Jordy's Site`}</title>
        </Head>
        <ContainerHome>
          <h1 className="text-5xl text-center">All Posts</h1>
          <div className="px-2 pb-32">
            {cardsReady ? (
              <div
                className={cn("grid grid-cols-2 md:grid-cols-3 gap-x-2")}
                ref={setColsRef}
              >
                {/** this is populated dynamically */}
              </div>
            ) : !data ? (
              <div>loading...</div>
            ) : (
              <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-x-2")}>
                <div className="col-span-1" ref={setRef}>
                  {data.map((post) => (
                    <div
                      className="w-full px-1 pb-1 grid grid-cols-1 gap-1 border-2 border-blue-500 rounded-md my-1"
                      key={post._id}
                    >
                      <div className="text-lg text-center">{post.title}</div>
                      <div className="text-sm pb-1">
                        <em>{post.excerpt}</em>
                      </div>
                      <div className="text-sm text-center">
                        <DateFormatter dateString={post.date} />
                      </div>
                      <div className="flex place-content-evenly items-end text-center">
                        <div>{post.gallery.length} 🏞</div>
                        <div>{post.body.split(/\s+/).length} 🔤</div>
                        <div>{post.published ? "✅" : "❌"} 📖</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <a
                          href={`/admin/db-post/edit?id=${post._id}`}
                          className="col-span-2 text-center h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                        >
                          Edit
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ContainerHome>
        <div className="fixed bottom-0 w-screen flex flex-col gap-y-2 justify-items-center place-items-center">
          <Footer />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return { props: { ip: process.env.IP || "" } };
}
