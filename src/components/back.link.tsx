import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackLinkProps {
  text: string;
  href: string;
}

const BackLink = ({ text, href }: BackLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-black hover:text-blue-800"
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="font-semibold">{text}</span>
    </Link>
  );
};

export default BackLink;
