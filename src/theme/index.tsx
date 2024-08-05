import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    review: {
      background: "#FDF8E9",
      title: "#EFC24D",
      button: "#ff8858",
    },
    approved: {
      background: "#EEEEFD",
      title: "#4242DF",
      button: "#9be59b",
    },
    reproved: {
      background: "#FBEDF6",
      title: "#CE2893",
      button: "#ff919a",
    },
  },
};

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
