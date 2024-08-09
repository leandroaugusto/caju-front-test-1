import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Header } from "./components/Header";
import { RegistrationsContextProvider } from "~/contexts/registrations.context";

import Router from "~/router";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RegistrationsContextProvider>
        <ThemeProvider theme={theme}>
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
        </ThemeProvider>
      </RegistrationsContextProvider>
    </QueryClientProvider>
  );
}

export default App;
