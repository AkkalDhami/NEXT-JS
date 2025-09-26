export default async function Views({ views }) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <div className="font-mono p-12">Views: {views}</div>;
}
