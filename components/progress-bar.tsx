type ProgressBarProps = {
  valuePercentage: number;
};

export default function ProgressBarFlexible(props: ProgressBarProps) {
  const { valuePercentage: value } = props;
  const fillerRelativePercentage = (100 / value) * 100;
  const fillerFlex = value > 0 ? value / 100 : 0;
  const textVal = `${value / 10.0}` + (value % 10 === 0 ? ".0" : "");

  return (
    <div
      className="pb-wrapper"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div className="barContainer" style={{ flex: fillerFlex }}>
        <div
          className="fillerBackground"
          style={{ width: `${fillerRelativePercentage}%` }}
        />
      </div>
      <div className="textValue">{textVal}</div>
    </div>
  );
}
