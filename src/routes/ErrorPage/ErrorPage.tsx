import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="mb-8">Oops!</h1>
        <p className="mb-4">Sorry, an unexpected error has occurred.</p>
        <h2 className="mb-8">{error.status}</h2>
        <p className="mb-4">{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
        <Link to="/">Home</Link>
      </div>
    );
  } else {
    return <div>Oops</div>;
  }
}
