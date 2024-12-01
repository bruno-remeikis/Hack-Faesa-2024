import { Size } from "@/models/Size";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

type PriceFallingProps = {
    priceFalling: boolean;
    size?: Size;
}

export function PriceFalling({ priceFalling, size = 'sm' }: PriceFallingProps) {
    return priceFalling
        ? <FiArrowDown className={`text-green-600 text-${size}`} />
        : <FiArrowUp className={`text-red-500 text-${size}`} />
}