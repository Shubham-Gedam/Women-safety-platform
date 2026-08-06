import { Loader2 } from "lucide-react";

export default function Loader({ text = "Loading...", fullScreen = false, size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size] || sizeClasses.md} text-red-500 animate-spin`} />
      {text && <p className="text-xs font-medium text-zinc-400 animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return <div className="py-8 flex justify-center items-center">{content}</div>;
}