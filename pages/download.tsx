const url0 = "https://public--asia.s3.ap-northeast-2.amazonaws.com/JYK+Scan+Images.zip";

export default function DownloadPage() {
  return <div className="p-5">
    <a href={url0} target="_blank" 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Download Medical Scans
    </a>
  </div>;
}
