import { PropsWithChildren } from "react";
import { RootState, setupStore, AppStore } from "../lib/store";
import { Provider } from "react-redux";
import { RenderOptions, render } from "@testing-library/react";
import { TextEncoder } from "util";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

global.TextEncoder = TextEncoder;

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  extendedRendeOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRendeOptions;

  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <CssVarsProvider>
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
