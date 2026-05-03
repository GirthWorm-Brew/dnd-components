import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CharacterPage from "./CharacterPage";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<CharacterPage></CharacterPage>
	</StrictMode>,
);
