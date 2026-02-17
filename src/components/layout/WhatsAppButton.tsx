import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971508033776"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-card rounded-lg text-sm font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-border/50">
        Chat with us
      </span>
    </a>
  );
}
