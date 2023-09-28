function Para({ children }) {
  return (
    <div>
      <b>START HIJACK</b>
      <p className="text-gray-700 my-4 text-base">{children}</p>
      <b>END HIJACK</b>
    </div>
  );
}
export default Para;
