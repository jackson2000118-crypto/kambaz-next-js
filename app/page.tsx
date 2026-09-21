import Link from "next/link";
import User from "./components/User";

export default function Home() {
    return (
        <div>
            <h1>Welcome to Web Dev</h1>
            <Link href="/labs/lab1">Lab 1 - HTML</Link>
            <User />
        </div>
    );
}