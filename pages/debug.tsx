import { useState } from "react";
import { COUNT_API_KEY } from "../lib/constants";

const env = process.env.NODE_ENV;
const counterKey = env === "development" ? "dev_counter" : "visit_counter";

const fetchCount = async () => {
  const resp = await fetch(
    `https://api.api-ninjas.com/v1/counter?id=${counterKey}`,
    {
      headers: {
        "X-Api-Key": COUNT_API_KEY,
      },
    }
  );
  if (resp.status !== 200) return 0;
  return (await resp.json()).value;
};

export default function DebugPage() {
  const [currentCount, setCurrentCount] = useState(0);
  if (!currentCount)
    return (
      <>
        <div>Ready</div>
        <button
          onClick={async () => {
            setCurrentCount(await fetchCount());
          }}
        >
          Fetch
        </button>
      </>
    );
  return <div>Count is {currentCount}</div>;
}
