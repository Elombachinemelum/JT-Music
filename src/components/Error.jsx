const Error = ({ message }) => (
  <div className="w-full flex justify-center items-center">
    <h1 className="font-bold text-2xl text-white mt-2 text-center px-3">
      {message || "Opps, something Went Wrong. Please Reload the page"}.
    </h1>
  </div>
);

export default Error;
