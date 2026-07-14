"use client"

import { StarIcon } from "lucide-react";
import { useState } from "react";

interface Props {
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export const StarPicker = ({ value = 0, onChange }: Props) => {

    const [hoverValue, setHoverValue] = useState(0);

    return (
        <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className="p-1"
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(0)}
                >
                    <StarIcon
                        className={`h-6 w-6 ${star <= (hoverValue || value) ? "fill-gray-900 text-gray-900" : "text-gray-300"
                            }`}
                    />
                </button>
            ))}
        </div>
    )
}