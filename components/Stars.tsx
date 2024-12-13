import { Size } from "@/models/Size";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

type StarsProps = {
    stars: number;
    size?: Size;
}

export function Stars({ stars, size = 'xs' }: StarsProps) {
    return (
        <div className={`flex gap-[0.05rem] text-yellow-500 text-${size}`} title="Média das avaliações">
            {Array(5).fill(0).map((_, i) => {
            if (i + 1 <= stars)
                return <FaStar key={i} />
            if (!Number.isInteger(stars))
                return <FaStarHalfAlt key={i} />
            return <FaRegStar key={i} />
        })}
    </div>);
}