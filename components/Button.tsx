'use client';
type ButtonProps = {
    text?: string;
    backgroundColor?: string;
    fontSize?: number;
    onClick?: () => void;
}
export default function Button({ text, backgroundColor, fontSize, onClick }: ButtonProps) {
  return (
    <button className={`bg-${backgroundColor}-400 text-white rounded px-4 py-2`}
    onClick={onClick}>
        {text}
    </button>
  )
}