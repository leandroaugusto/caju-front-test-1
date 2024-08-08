import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "./components/Header";
import { RegistrationsContextProvider } from "~/contexts/registrationsContext";

import Router from "~/router";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RegistrationsContextProvider>
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
        </RegistrationsContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
