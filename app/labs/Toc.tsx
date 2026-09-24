import Link from "next/link";

export default function TOC() {
  return (
    <ul>
    <li>
        <a
            id="wd-toc-book-link"
            href="https://webdev-client.vercel.app/book/ch1"
        >
            Chapter 1
        </a>
    </li>

    <li>
        <Link href="/labs">Labs</Link>
      </li>
      <li>
        <Link href="/labs/lab1" id="wd-lab1-link">
          Lab 1
        </Link>
      </li>
      <li>
        <Link href="/labs/lab2" id="wd-lab2-link">
          Lab 2
        </Link>
      </li>
      <li>
        <Link href="/labs/lab3" id="wd-lab3-link">
          Lab 3
        </Link>
      </li>

    <li>My Web Development learning journal</li>
      <li>
        <Link href="/labs/lab4" id="wd-lab4-link"> 
          Lab 4
        </Link>
      </li>

        <li>
        <Link href="/labs/lab5">Lab 5</Link>
        </li>
        
        <li>
        <Link href="/" id="wd-kambaz-link">
            Kambaz
        </Link>
        </li>
    </ul>
  );
}