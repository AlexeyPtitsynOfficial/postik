import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { AppDispatch, AppStore, RootState } from "../store";

//export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
//export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
