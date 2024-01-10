import "../styles/globals.css";
import "../styles/normalize.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
