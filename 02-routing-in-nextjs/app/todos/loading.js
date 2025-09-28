const loading = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className="w-full h-16 mb-5 animate-pulse rounded-lg bg-zinc-950 flex items-center gap-5">
          <div className="w-6 h-6 rounded-full bg-zinc-900 animate-pulse"></div>
          <div className="w-1/2 h-5 rounded-lg bg-zinc-900 animate-pulse"></div>
          <div className="w-1/4 h-5 rounded-lg bg-zinc-900 animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

export default loading;
