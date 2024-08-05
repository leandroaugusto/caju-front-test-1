import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "~/router";
import { Header } from "./components/Header";
import ThemeProvider from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
