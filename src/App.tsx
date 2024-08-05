import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "~/router";
import { Header } from "./components/Header";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
