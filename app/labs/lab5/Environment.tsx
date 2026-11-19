export default function Environment() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  return (
    <section id="wd-lab5-environment" className="space-y-3 rounded border p-4">
      <h3 className="text-xl font-semibold">5.2.1 Environment</h3>
      <p>
        <code>NEXT_PUBLIC_HTTP_SERVER</code> ={" "}
        <code>{HTTP_SERVER || "Not configured"}</code>
      </p>
      {!HTTP_SERVER && (
        <p role="alert" className="text-red-700">
          Add NEXT_PUBLIC_HTTP_SERVER to .env.development and restart Next.js.
        </p>
      )}
      <a
        id="wd-welcome-link"
        className="text-blue-700 underline"
        href={`${HTTP_SERVER}/lab5/welcome`}
        target="_blank"
        rel="noreferrer"
      >
        Welcome
      </a>
    </section>
  );
}
