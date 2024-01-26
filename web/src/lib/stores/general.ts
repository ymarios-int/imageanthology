import { getContext, setContext } from "svelte";
import { type Writable, writable } from "svelte/store";

interface IGeneralState {
  deleteId: string | null
  refetchImages: boolean
  isLoading: boolean
}

export const initialGeneralState: IGeneralState = {
  deleteId: null,
  refetchImages: false,
  isLoading: false
};

let general: Writable<IGeneralState> | null = null;

export const getGeneralState = () => {
  return getContext<Writable<IGeneralState>>('general');
};

export const setGeneralState = (state: Partial<IGeneralState> = initialGeneralState) => {
  if (!getGeneralState()) {
    general = writable(initialGeneralState);
    setContext('general', general);
  }

  general?.update((prev) => {
    return { ...prev, ...state };
  });
};

export default {
  getGeneralState,
  setGeneralState
};