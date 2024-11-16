import { create } from "zustand";
import createInstructionsSlice, {
  InstructionsSlice,
} from "./createInstructionsSlice";

const useStore = create<InstructionsSlice>()((...a) => ({
  ...createInstructionsSlice(...a),
}));

export default useStore;
