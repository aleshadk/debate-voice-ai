import { DebateWidget } from "@/widgets/debate/ui/DebateWidget";

function App() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <DebateWidget />
      </div>
    </div>
  );
}

export default App;
