const SlowRes1 = async () => {
  const slowRes = await fetch("https://procodrr.vercel.app/?sleep=2000");
  const slowData = await slowRes.json();
  return <p>{JSON.stringify(slowData)}</p>;
};

export default SlowRes1;
