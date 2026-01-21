import { Equal } from "lucide-react";

interface MenuButtonProps {
  open: boolean;
  onToggle: (open: boolean) => void;
}

export default function MenuButton({ open, onToggle }: MenuButtonProps) {
  return (
    <button
      onClick={() => onToggle(!open)}
      className="lg:hidden p-3 text-xl font-bold"
    >
      <Equal className="w-5 text-accentPrimary" />
    </button>
  );
}
