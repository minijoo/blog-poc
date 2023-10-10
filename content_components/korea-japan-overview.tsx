import { useState } from "react";

const reviews = [
  {
    name: "Marugame Seimen Roppongi",
    link: "/posts/korea-japan#1",
    category: "Udon",
    showCategory: true,
    rating: 82,
  },
  {
    name: "ON Bbq",
    link: "/posts/korea-japan#2",
    category: "K-bbq",
    showCategory: true,
    rating: 76,
  },
  {
    name: "집밥집",
    link: "/posts/korea-japan#3",
    category: "쌈",
    showCategory: true,
    rating: 73,
  },
  {
    name: "옹골래",
    link: "/posts/korea-japan#4",
    category: "순댓국",
    showCategory: true,
    rating: 90,
  },
  {
    name: "솔밭",
    link: "/posts/korea-japan#5",
    category: "삼겹살",
    showCategory: true,
    rating: 81,
  },
  {
    name: "구들장 불곱창",
    link: "/posts/korea-japan#6",
    category: "대창",
    showCategory: true,
    rating: 82,
  },
  {
    name: "대도식당",
    link: "/posts/korea-japan#7",
    category: "K-bbq",
    showCategory: true,
    rating: 85,
  },
  {
    name: "김치찌개집",
    link: "/posts/korea-japan#8",
    category: "김치찌개",
    showCategory: false,
    rating: 71,
  },
  {
    name: "평양냉면",
    link: "/posts/korea-japan#9",
    category: "냉면",
    showCategory: false,
    rating: 76,
  },
  {
    name: "화경",
    link: "/posts/korea-japan#10",
    category: "짜장면",
    showCategory: true,
    rating: 74,
  },
  {
    name: "Ivy Place",
    link: "/posts/korea-japan#11",
    category: "Western",
    showCategory: true,
    rating: 79,
  },
  {
    name: "Midori Sushi",
    link: "/posts/korea-japan#12",
    category: "Sushi",
    showCategory: false,
    rating: 76,
  },
  {
    name: "Umu",
    link: "/posts/korea-japan#13",
    category: "Sushi",
    showCategory: true,
    rating: 69,
  },
  {
    name: "Tachibana Sushi",
    link: "/posts/korea-japan-pt2#14",
    category: "Sushi",
    showCategory: false,
    rating: 90,
  },
  {
    name: "Tsujihan",
    link: "/posts/korea-japan-pt2#15",
    category: "Donburi",
    showCategory: true,
    rating: 89,
  },
  {
    name: "Etsubo",
    link: "/posts/korea-japan-pt2#16",
    category: "Izakaya",
    showCategory: true,
    rating: 93,
  },
  {
    name: "Tenfuku",
    link: "/posts/korea-japan-pt2#17",
    category: "Tempura",
    showCategory: true,
    rating: 80,
  },
  {
    name: "양평해장국",
    link: "/posts/korea-japan-pt2#18",
    category: "순댓국",
    showCategory: true,
    rating: 77,
  },
  {
    name: "Kara-age Senmon Kimisei",
    link: "/posts/korea-japan-pt2#19",
    category: "Kara-age",
    showCategory: false,
    rating: 80,
  },
  {
    name: "세광양대창",
    link: "/posts/korea-japan-pt2#20",
    category: "대창",
    showCategory: false,
    rating: 95,
  },
  {
    name: "Congee GoGo",
    link: "/posts/korea-japan-pt2#21",
    category: "짜장면",
    showCategory: true,
    rating: 80,
  },
  {
    name: "Sarutahiko Coffee",
    link: "/posts/korea-japan-pt2#22",
    category: "Coffee",
    showCategory: false,
    rating: 90,
  },
];

const categorys = Array.from(
  reviews.reduce((catSet, review) => {
    catSet.add(review.category);
    return catSet;
  }, new Set())
);

const doSort = (descending: number) => {
  reviews.sort((a, b) => (b.rating - a.rating) * (descending ? 1 : -1));
};

export default function KoreaJapanOverview() {
  const [descending, setDescending] = useState(1);
  const [category, setCategory] = useState("");
  doSort(descending);
  return (
    <>
      <div className="grid grid-cols-3 place-content-center pb-5">
        <div className="col-span-1">
          <button
            className="secondary-button"
            onClick={() => {
              setDescending(descending ? 0 : 1);
              doSort(descending);
            }}
          >
            Sort ⤵
          </button>
        </div>
        <div className="col-span-2">
          <select
            id="countries"
            className="dropdown"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            defaultValue=""
          >
            <option key="" value="">
              Choose a category
            </option>
            {categorys.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {reviews.map((review, index) => {
          if (category && review.category !== category) {
            return <></>;
          }

          const map1 = {
            1: "bg-grad-1",
            2: "bg-grad-2",
            3: "bg-grad-3",
            4: "bg-grad-4",
            5: "bg-grad-5",
            6: "bg-grad-6",
            7: "bg-grad-7",
            8: "bg-grad-8",
            9: "bg-grad-9",
            10: "bg-grad-10",
            11: "bg-grad-11",
            12: "bg-grad-12",
            13: "bg-grad-13",
            14: "bg-grad-14",
            15: "bg-grad-15",
            16: "bg-grad-16",
            17: "bg-grad-17",
            18: "bg-grad-18",
            19: "bg-grad-19",
            20: "bg-grad-20",
            21: "bg-grad-21",
            22: "bg-grad-22",
            23: "bg-grad-23",
            24: "bg-grad-24",
            25: "bg-grad-25",
            26: "bg-grad-26",
            27: "bg-grad-27",
            28: "bg-grad-28",
            29: "bg-grad-29",
            30: "bg-grad-30",
            31: "bg-grad-31",
            32: "bg-grad-32",
            33: "bg-grad-33",
            34: "bg-grad-34",
            35: "bg-grad-35",
            36: "bg-grad-36",
            37: "bg-grad-37",
            38: "bg-grad-38",
            39: "bg-grad-39",
            40: "bg-grad-40",
            41: "bg-grad-41",
            42: "bg-grad-42",
            43: "bg-grad-43",
            44: "bg-grad-44",
            45: "bg-grad-45",
            46: "bg-grad-46",
            47: "bg-grad-47",
            48: "bg-grad-48",
            49: "bg-grad-49",
            50: "bg-grad-50",
            51: "bg-grad-51",
            52: "bg-grad-52",
            53: "bg-grad-53",
            54: "bg-grad-54",
            55: "bg-grad-55",
            56: "bg-grad-56",
            57: "bg-grad-57",
            58: "bg-grad-58",
            59: "bg-grad-59",
            60: "bg-grad-60",
            61: "bg-grad-61",
            62: "bg-grad-62",
            63: "bg-grad-63",
            64: "bg-grad-64",
            65: "bg-grad-65",
            66: "bg-grad-66",
            67: "bg-grad-67",
            68: "bg-grad-68",
            69: "bg-grad-69",
            70: "bg-grad-70",
            71: "bg-grad-71",
            72: "bg-grad-72",
            73: "bg-grad-73",
            74: "bg-grad-74",
            75: "bg-grad-75",
            76: "bg-grad-76",
            77: "bg-grad-77",
            78: "bg-grad-78",
            79: "bg-grad-79",
            80: "bg-grad-80",
            81: "bg-grad-81",
            82: "bg-grad-82",
            83: "bg-grad-83",
            84: "bg-grad-84",
            85: "bg-grad-85",
            86: "bg-grad-86",
            87: "bg-grad-87",
            88: "bg-grad-88",
            89: "bg-grad-89",
            90: "bg-grad-90",
            91: "bg-grad-91",
            92: "bg-grad-92",
            93: "bg-grad-93",
            94: "bg-grad-94",
            95: "bg-grad-95",
            96: "bg-grad-96",
            97: "bg-grad-97",
            98: "bg-grad-98",
            99: "bg-grad-99",
            100: "bg-grad-100",
          };
          const colour = map1[review.rating];

          return (
            <div
              tabIndex={index}
              key={index}
              className={`col-span-1 grid grid-cols-1`}
            >
              <div
                className={`my-0 mx-auto flex items-center place-content-center text-3xl p-3 w-20 h-16 rounded-lg hover:cursor-pointer hover:outline-slate-950 hover:outline-2 hover:outline active:outline-4 focus:outline-2 focus:outline-slate-950 focus:outline ${colour}`}
              >
                <a href={review.link}>
                  <div>{review.rating}</div>
                </a>
              </div>
              <div className="grid grid-rows-2 pt-2 text-sm text-center">
                <div className="row-span-1 h-5 truncate">
                  {review.name.length > 20
                    ? review.name.substring(0, 20) + ".."
                    : review.name}
                </div>
                <div className="row-span-1">
                  <em> {review.showCategory && review.category}</em>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
