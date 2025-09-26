export default async function Likes({ likes }) {
  await new Promise((resolve) => setTimeout(resolve, 7000));
  return <div className="font-mono p-12">Likes: {likes}</div>;
}
