import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RouteHandler from "./routes/RouteHandler";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-washedwhite dark:bg-gray-900 text-deepblue dark:text-washedwhite">
        <NavBar />
        <main className="flex-grow pt-16">
          <RouteHandler />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
