interface ResultsProps {
  image: FormData;
}

const Results: React.FC<ResultsProps> = ({ image }) => {
  return (
    <div className="bg-gradient-to-b to-zinc-800 from-slate-600 h-screen text-white flex items-center justify-center">
      <div className="flex flex-col w-2/5 items-start m-auto ml-12">
        <div className="text-4xl mb-4">Likely disease</div>
        <div className="flex flex-col items-start">
          <div className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <button className="mt-10 items-center bg-indigo-800 p-3 rounded-lg ring-1 ring-indigo-600 hover:ring-indigo-500 outline-none">
          Find derms in my area!
        </button>
      </div>
      <div className="w-3/5 flex justify-center">
        <img
          src={
            image.get("image")
              ? URL.createObjectURL(image.get("image") as Blob)
              : ""
          }
          alt="Uploaded"
          className="w-2/5 h-auto max-w-full max-h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default Results;
