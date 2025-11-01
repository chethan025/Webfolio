import Header from "./sections/header";
import About from "./sections/about";
import Projects from "./sections/projects";
import Certificates from "./sections/certificates";
import Contact from "./sections/contact";
import Footer from "./sections/footer";
import './styles/main.scss';
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div className="App mainappcontainer">
      <Analytics/>
      <Navbar />
      <Header />
      <About />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}


