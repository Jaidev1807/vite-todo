import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />

          {children}
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
