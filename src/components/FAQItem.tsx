import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FAQItem({ question, answer, isOpen = false, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 px-6 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors duration-300 group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-vexto-dark text-lg flex-1 group-hover:text-vexto-primary transition-colors duration-300">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-vexto-primary transition-transform duration-300 mt-1 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
