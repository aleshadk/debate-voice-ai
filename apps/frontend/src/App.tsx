import { RouterProvider } from "./app/providers/RouterProvider";
import { QueryProvider } from "./app/providers/QueryProvider";
import { DebateProvider } from "./contexts/DebateContext";

function App() {
  return (
    <QueryProvider>
      <DebateProvider>
        <RouterProvider />
      </DebateProvider>
    </QueryProvider>
  );
}

export default App;
