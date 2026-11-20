import Link from "next/link";

export default function Labs() {
  return (
      <div id="wd-labs">
      <h1>Labs</h1>

      <p>Name: Min-Hsun Hsieh</p>
      <p>Section: CS5610-02</p>
      <ul>
        <li>
          <Link href="/labs/lab1">Lab 1</Link>
        </li>

        <li>
          <Link href="/labs/lab2">Lab 2</Link>
        </li>

        <li>
          <Link href="/labs/lab3">Lab 3</Link>
        </li>

        <li>
          <Link href="/labs/lab4">Lab 4</Link>
        </li>

        <li>
          <Link href="/labs/lab5">Lab 5</Link>
        </li>
        
        <li>
          <Link href="/">Kambaz</Link>
        </li>

        <li>         
        <a
          href="https://github.com/jackson2000118-crypto/kambaz-next-js"
          id="wd-github">
          GitHub Repository
        </a>
      </li>
        <li>
          <a
            id="wd-server-github"
            href="https://github.com/jackson2000118-crypto/webdev-server/tree/a5"
            className="text-blue-600 underline"
          >
            Node Server GitHub Repository
          </a>
        </li>
        <li>
          <a
            id="wd-server-url"
            href={process.env.NEXT_PUBLIC_HTTP_SERVER}
            className="text-blue-600 underline"
          >
            Deployed Node Server (Render)
          </a>
        </li>
      </ul>
    </div>
  );
}
