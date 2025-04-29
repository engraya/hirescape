import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import {UserProvider} from "@/context/userContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Create a React Query Client instance
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noSidebarRoutes = ["/", "/login", "/register"];
  const isNoSidebar = noSidebarRoutes.includes(router.pathname);

  return (
    // Wrap the app with QueryClientProvider to provide React Query context
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        {isNoSidebar ? (
          <>
            <Navbar />
            <Component {...pageProps} />
          </>
        ) : (
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        )}
        <ToastContainer />
      </QueryClientProvider>
    </UserProvider>
    
  );
}
