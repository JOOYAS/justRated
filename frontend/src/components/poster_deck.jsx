import { useEffect, useState } from "react";
import LazyImage from "./lazy_image";

const posters = [
    { _id: 1, publicId: "iu_a9cjfv" },
    { _id: 2, publicId: "iu_iqclwv" },
    { _id: 3, publicId: "iu_vbchlf" },
];

const PosterDeck = () => {
    const [order, setOrder] = useState(posters);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder(prev => {
                const [first, ...rest] = prev;
                return [...rest, first]; // rotate array
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden md:flex relative mr-10 h-80 justify-end items-center">
            {order.map((poster, index) => {
                // map index → position styles
                const pos = [
                    "translate-x-0 rotate-0 scale-100 z-30",
                    "translate-x-6 rotate-[8deg] scale-95 z-20",
                    "translate-x-12 rotate-[16deg] scale-90 z-10",
                ];
                return (
                    <div
                        key={poster._id}
                        className={`absolute w-60 h-90 rounded-2xl shadow-lg overflow-hidden bg-indigo-950/25 transition-all duration-700 ease-in-out ${pos[index]}`}
                    >
                        <LazyImage
                            publicId={poster.publicId}
                            alt="movie poster"
                            className="w-full h-full object-cover"
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default PosterDeck