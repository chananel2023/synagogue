import React, { useMemo } from "react";
import FloatingShape from "./FloatingShape";

const FloatingShapes: React.FC = () => {
    // Using useMemo to ensure shape data is computed once
    const shapes = useMemo(
        () => [
            { color: "bg-yellow-400", size: "w-64 h-64", top: "-5%", left: "10%", delay: 0 },
            { color: "bg-yellow-400", size: "w-48 h-48", top: "70%", left: "80%", delay: 0.5 },
            { color: "bg-yellow-400", size: "w-32 h-32", top: "40%", left: "10%", delay: 1 },
        ],
        []
    );

    return (
        <>
            {shapes.map((shape, index) => (
                <FloatingShape
                    key={index}
                    color={shape.color}
                    size={shape.size}
                    top={shape.top}
                    left={shape.left}
                    delay={shape.delay}
                />
            ))}
        </>
    );
};

export default FloatingShapes;
