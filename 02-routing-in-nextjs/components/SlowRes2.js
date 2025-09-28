const SlowRes2 = async () => {
  const slowRes2 = await fetch("https://procodrr.vercel.app/?sleep=4000");
  const slowData2 = await slowRes2.json();
  return <p>{JSON.stringify(slowData2)}</p>;
};

export default SlowRes2;
