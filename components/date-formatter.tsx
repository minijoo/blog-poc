import { parseISO, format } from "date-fns";
import { Kaisei_Opti } from "next/font/google";

const kaisei = Kaisei_Opti({
  weight: "400",
  subsets: ["cyrillic"],
  variable: "--font-kaisei",
});

type Props = {
  dateString: string;
  useKanji?: boolean;
  useShortForm?: boolean;
};

const DateFormatter = ({ dateString, useKanji, useShortForm }: Props) => {
  const date = parseISO(dateString);
  const month = numberMap[date.getMonth() + 1];
  const day = numberMap[date.getDate()];
  if (useKanji) {
    // useShortForm doesn't apply
    return (
      <div className={`${kaisei.variable} jp-scroll flex flex-row gap-1`}>
        <div className="flex flex-col">
          {day.split("").map((c) => (
            <div>{c}</div>
          ))}
          <div>日</div>
        </div>
        <div className="flex flex-col">
          {month.split("").map((c) => (
            <div>{c}</div>
          ))}
          <div>月</div>
        </div>
        <div className="flex flex-col">
          <div>{format(date, "yy")}</div>
          <div>年</div>
        </div>
      </div>
    );
  }
  if (useShortForm) {
    return <span>{format(date, "M/d/yy")}</span>;
  }
  return <div>{format(date, "LLLL	d, yyyy")}</div>;
};

const numberMap = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
  10: "十",
  11: "十一",
  12: "十二",
  13: "十三",
  14: "十四",
  15: "十五",
  16: "十六",
  17: "十七",
  18: "十八",
  19: "十九",
  20: "二十",
  21: "二十一",
  22: "二十二",
  23: "二十三",
  24: "二十四",
  25: "二十五",
  26: "二十六",
  27: "二十七",
  28: "二十八",
  29: "二十九",
  30: "三十",
  31: "三十一",
};

export default DateFormatter;
