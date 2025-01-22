import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex gap-2">
        <Link href={"/"}>Home</Link>
        <Link href={"/sida2"}>Sida 2</Link>
        <Link href={"/ai-questions"}>AI Questions</Link>
        <Link href={"/ai-history"}>AI History</Link>
      </nav>
    </header>
  );
}
