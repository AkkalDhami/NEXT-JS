import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-scree">
      <nav className=" shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                TodoApp
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="">
                Login
              </Link>
              <Link
                href="/register"
                className="">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
