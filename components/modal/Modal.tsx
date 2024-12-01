import { FiX } from "react-icons/fi";

export type VisibilityModalProps = {
  visible?: boolean;
  setVisible?: (_: boolean) => void;
}

export type ModalProps = VisibilityModalProps & {
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  hideCloseButton?: boolean;
  preventHideOnClickOut?: boolean;
}

export function Modal({ children, visible = true, setVisible, className = '', overlayClassName = '', hideCloseButton = false, preventHideOnClickOut = false }: ModalProps) {
  return (
    <div
      className={`${visible ? 'block' : 'hidden'} absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 ${className}`}
      onClick={() => setVisible && !preventHideOnClickOut && setVisible(false)}
    >
      <div
        className={`relative bg-white p-3 rounded-sm ${overlayClassName}`}
        onClick={e => e.stopPropagation()}
      >
        {setVisible && !hideCloseButton &&
          <button
            className="absolute right-0 top-0 p-2"
            onClick={() => setVisible(false)}
          >
            <FiX />
          </button>}

        { children }
      </div>
    </div>
  )
}