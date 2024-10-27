import { Card } from '../lib/types';

type CardDisplayProps = {
    card: Card;
    question: string;
    onAnswer: (ease: number) => void;
};

export default function CardDisplay({ card, question, onAnswer }: CardDisplayProps) {
    // Mapeamento dos rótulos e dos valores de facilidade correspondentes
    const easeLabels = [
        { label: 'Again', ease: 1 },
        { label: 'Hard', ease: 2 },
        { label: 'Good', ease: 3 },
        { label: 'Easy', ease: 4 },
    ];

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold">Flashcard</h1>
            <p className="text-lg font-semibold">{question}</p>
            <div className="space-x-4">
                {easeLabels.map(({ label, ease }) => (
                    <button
                        key={ease}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => onAnswer(ease)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}