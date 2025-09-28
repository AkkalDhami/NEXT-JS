const Loading = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className="w-full h-16 mb-5 p-2 animate-pulse rounded-lg bg-zinc-900 flex items-center gap-5">
          <div className="w-6 h-6 rounded-full bg-zinc-800 animate-pulse"></div>
          <div className="w-1/2 h-8 rounded-lg bg-zinc-800 animate-pulse"></div>
          <div className="w-1/4 h-8 rounded-lg bg-zinc-800 animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

export default Loading;
