import React from "react";

interface FloatingShapeProps {
    color: string;
    size: string;
    top: string;
    left: string;
    delay: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = React.memo(
    ({ color, size, top, left, delay }) => {
        return (
            <div
                className={`absolute ${color} ${size} rounded-full`}
                style={{
                    top: top,
                    left: left,
                    animation: `float 10s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                }}
            ></div>
        );
    }
);

export default FloatingShape;
