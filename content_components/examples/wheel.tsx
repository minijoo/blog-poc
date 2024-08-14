import { useState } from "react";

export default function WheelDemo({ change }) {
  const [travel, setTravel] = useState(0);

  const onScrollChange = (event) => {
    const n = event.target.scrollTop % 360;
    setTravel(n < 0 ? 360 + n : n);
  };

  const convertX = (theta: number, radius: number) =>
    radius + radius * Math.cos((theta * Math.PI) / 180);
  const convertY = (theta: number, radius: number) =>
    radius + radius * Math.sin((theta * Math.PI) / 180);

  const thetas = [30, 90, 150, 210, 270, 330];
  const radius = Math.min(350 / 2);
  return (
    <div className="App">
      <style jsx>
        {`
          .circle {
            border: black 1px solid;
            border-radius: 9999px;
          }

          .scroller {
            width: 90vw;
            height: 40vw;
            max-width: 500px;
            max-height: 20vh;
            overflow: scroll;
            border: #000000 1px solid;
          }

          .overflower {
            width: 100%;
            height: 2000px;
          }

          .wheel-container {
            position: relative;
            max-width: 500px;
            max-height: 500px;
          }

          .point {
            position: absolute;
            border: black 1px solid;
          }

          .scroller::-webkit-scrollbar {
            background-color: #aaa;
            width: 5px;
            height: 8px;
            display: block !important;
          }

          .scroller::-webkit-scrollbar-thumb {
            background: #000;
          }
        `}
      </style>
      <div className="wheel-container">
        {thetas.map((theta, index) => (
          <div
            key={index}
            className="point"
            style={{
              left: convertX(theta + travel, radius),
              top: convertY(theta + travel, radius),
            }}
          >
            {thetas[index]}
          </div>
        ))}
        <div
          className="circle"
          style={{ width: radius * 2, height: radius * 2 }}
        />
      </div>
      <h4>Scrollpad</h4>
      <div className="scroller" onScroll={onScrollChange}>
        <div className="overflower" />
      </div>
    </div>
  );
}
