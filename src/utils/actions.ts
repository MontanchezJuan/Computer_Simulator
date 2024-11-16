import useStore from "../store/useStore";

export const functionTime = (thisfunction: () => void) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      thisfunction();
      resolve(true);
    }, useStore.getState().currentinstruction.timeout);
  });
};
