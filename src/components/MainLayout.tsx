import { Container } from "react-bootstrap";
import { ReactNode, useState } from "react";
import Sidebar from "./ui/Sidebar";
import Topbar from "./ui/Topbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [libraryOpen, setLibraryOpen] = useState(false);

  return (
    <>
      <Topbar
        libraryOpen={libraryOpen}
        onToggleLibrary={() => setLibraryOpen((o) => !o)}
      />
      <Sidebar
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
      />
      <Container
        fluid
        className={`main-content${libraryOpen ? " library-open" : ""}`}
      >
        {children}
      </Container>
    </>
  );
}
