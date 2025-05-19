import { DebateWidget } from "@/widgets/debate/ui/DebateWidget";
import { Loader } from "./shared/ui/Loader/Loader";
import { useDebateContext } from "./contexts/DebateContext";

function App() {
  const { isLoading } = useDebateContext();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16">
      {isLoading && <Loader />}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <DebateWidget />
      </div>
    </div>
  );
}

export default App;
