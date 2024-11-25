import { CODOPS } from "../../interfaces/CODOP";
import useStore from "../../store/useStore";
import "./customScrollbar.css";

export const Buttons = () => {
  const createItem = useStore((store) => store.createItem);

  const buttonsItems = [
    {
      title: "Almacenamiento",
      items: [
        { codop: "MOV", color: "from-orange-400 to-orange-600" },
        // { codop: "STORE", color: "from-orange-400 to-orange-600" },
        // { codop: "LOAD", color: "from-orange-400 to-orange-600" },
      ],
    },
    {
      title: "Control",
      items: [
        { codop: "JMP", color: "from-purple-400 to-purple-600" },
        { codop: "JNZ", color: "from-teal-400 to-teal-600" },
        { codop: "JZ", color: "from-pink-400 to-pink-600" },
      ],
    },
    {
      title: "Procesamiento",
      items: [
        { codop: "ADD", color: "from-green-400 to-green-600" },
        { codop: "DEC", color: "from-yellow-400 to-yellow-600" },
        { codop: "MUL", color: "from-indigo-400 to-indigo-600" },
        { codop: "DIV", color: "from-red-400 to-red-600" },
        { codop: "CMP", color: "from-blue-400 to-blue-600" },
      ],
    },
  ];

  return (
    <div className="flex max-h-[90vh] flex-col">
      <div className="w-fit rounded-t-lg bg-stone-500 p-2">
        <h1 className="text-xl font-bold">Instrucciones</h1>
      </div>
      <div className="custom-scrollbar flex flex-col gap-5 overflow-y-auto rounded-b-lg rounded-tr-lg bg-stone-500 p-2">
        {buttonsItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{item.title}</h1>
            {item.items.map((sub, index) => (
              <button
                key={sub.codop + index}
                onClick={() => createItem(sub.codop as keyof typeof CODOPS)}
                className={`rounded-lg bg-gradient-to-r ${sub.color} px-5 py-2.5 font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              >
                {sub.codop}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
