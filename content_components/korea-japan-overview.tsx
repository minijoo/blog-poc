import { useState } from "react";
import Container from "../components/container";
import ProgressBar from "../components/progress-bar";

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

const onSort = (descending) => {
  reviews.sort((a, b) => (b.rating - a.rating) * (descending ? 1 : -1));
};

export default function KoreaJapanOverview() {
  const [descending, setDescending] = useState(1);
  const [category, setCategory] = useState("");
  onSort(descending);
  return (
    <>
      <Container>
        <div className="grid grid-cols-3 place-content-center pb-5">
          <div className="col-span-1">
            <button
              className="secondary-button"
              onClick={() => {
                setDescending(descending ? 0 : 1);
                onSort(descending);
              }}
            >
              Sort
            </button>
          </div>
          <div className="col-span-2">
            <select
              id="countries"
              className="dropdown"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option key="" value="" selected>
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
      </Container>
      <div className="grid grid-cols-4 gap-4">
        {reviews.map((review) => (
          <>
            {(!category || review.category === category) && (
              <>
                <div className="col-span-1">
                  <a className="hover:underline" href={review.link}>
                    {review.name}
                  </a>{" "}
                  {review.showCategory && "(" + review.category + ")"}
                </div>
                <div className="col-span-3">
                  <ProgressBar valuePercentage={review.rating} />
                </div>
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
}
