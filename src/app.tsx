import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/themes/theme-provider";
import { Weather } from "./components/weather";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="weather-theme">
        <Weather />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
