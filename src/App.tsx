import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Listing from "./components/Listing.tsx";
import { ObserverProvider } from './context/ObserverContext.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ObserverProvider>
        <Listing />
      </ObserverProvider>
    </QueryClientProvider>
  )
}

export default App
