import { useCallback, useState } from "react";
import { RiSettings3Fill, RiSettings4Fill } from "react-icons/ri";
import { useClickOutside } from "../hooks/useClickOutside";
import { cycleBgColors } from "../interfaces/Cycles";
import useStore from "../store/useStore";

interface SettingsMenuProps {
  children: React.ReactNode;
}

export const SettingsMenu = ({ children }: SettingsMenuProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const currentCycle = useStore((store) => store.COMPUTER.currentCycle);
  const timeout = useStore((store) => store.COMPUTER.timeout);
  const setTimeout = useStore((store) => store.setTimeout);

  const menuRef = useClickOutside(closeMenu);

  return (
    <div className="flex">
      {children}
      <div
        className={`${cycleBgColors[currentCycle]} mx-auto w-fit rounded-lg p-2 font-semibold`}
      >
        <p>
          Ciclo actual: <span className="font-semibold">{currentCycle}</span>
        </p>
      </div>
      <div className="relative flex flex-col justify-end">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`flex items-center border-r-2 border-stone-500 bg-[#2f2f2f] px-4 py-2 ${!showMenu ? "rounded-xl" : "rounded-t-xl"}`}
        >
          {showMenu ? (
            <RiSettings3Fill className="text-xl" />
          ) : (
            <RiSettings4Fill className="text-xl" />
          )}
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 top-full z-50 flex min-w-[360px] flex-col gap-2 rounded-b-xl rounded-tl-xl border-x-2 border-b-2 border-stone-500 bg-[#2f2f2f] p-2 shadow-lg"
          >
            <h1 className="text-2xl font-bold">Configuraciones</h1>
            <hr />
            <div className="flex gap-1">
              <strong>Velocidad de ejecución:</strong>
              <input
                className="w-[60px] rounded-md text-black"
                defaultValue={timeout}
                onChange={(e) => setTimeout(Number(e.target.value))}
                type="number"
                min={500}
                max={5000}
                step={500}
              />
              <span>milisegundos</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
