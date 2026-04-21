import "../../styles/Nick.css";
import { Button } from "react-bootstrap";

type TopbarProps = {
  libraryOpen: boolean;
  onToggleLibrary: () => void;
};

export default function Topbar({ libraryOpen, onToggleLibrary }: TopbarProps) {
  return (
    <header className="main-header">
      <div className="header-left">
        <Button
          variant="dark"
          size="sm"
          className="library-toggle"
          onClick={onToggleLibrary}
          aria-expanded={libraryOpen}
          aria-controls="sidebar-left"
        >
          ☰ Library
        </Button>
        <div className="logo">Logo</div>
      </div>
      <nav className="nav-tabs">
        <a href="Landing.html" className="tab">
          Home
        </a>
        <label htmlFor="nav-combat" className="tab t-combat">
          Combat Tracker
        </label>
        <label htmlFor="nav-chars" className="tab t-chars">
          Player Characters
        </label>
        <label htmlFor="nav-monsters" className="tab t-monsters">
          Monster Compendium
        </label>
        <label htmlFor="nav-board" className="tab t-board">
          Encounter Board
        </label>
      </nav>
      <div className="user">👤</div>
    </header>
  );
}
