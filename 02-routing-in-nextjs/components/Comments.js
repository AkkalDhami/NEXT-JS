export default async function Comments({ comments }) {
  await new Promise((resolve) => setTimeout(resolve, 9000));
  return <div className="font-mono p-12">Comments: {comments}</div>;
}
