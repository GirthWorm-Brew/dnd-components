import { Card, CardBody } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Character.css";
import CharacterGetter from "./CharacterListGetter";
import CharacterCreator from "./CharacterCreator";
import CharacterViewer from "./CharacterViewer";
import type { Character } from "./CharacterInterface";
import { deleteCharacter, listCharacters } from "../../modules/character-api";
import type { Encounter } from "../../modules/encounter-api";

type CharacterPageProps = {
	encounterList: Encounter[];
	refreshEncounters: () => Promise<void>;
};

function CharacterPage({ encounterList, refreshEncounters }: CharacterPageProps) {
	const [selectedCharID, setSelectedCharID] = useState<string | null>(null);
	const [characters, setCharacters] = useState<Character[]>([]);

	const loadCharacters = async () => {
		// const stored = localStorage.getItem("characters");
		// if (stored) {
		// 	setCharacters(JSON.parse(stored));
		// }
		setCharacters(await listCharacters());
	}

		useEffect(() => {
			loadCharacters();
		}, []);

		const handleDeleteCharacter = async (charID: string) => {
			const result = await deleteCharacter(charID);

			if (result === 204) {
				if (selectedCharID === charID) {
					setSelectedCharID(null);
				}

				await loadCharacters();
			}
		};

	return (
		<Card className="mb-4">
			<Card.Body>
				<main className="character-page">
					<div className="character-selector">
						<ul>
								<CharacterGetter
									characters={characters}
									onSelectCharacter={setSelectedCharID}
									onDeleteCharacter={handleDeleteCharacter}
								/>
							<button
								id="createCharacterTab"
								onClick={() => setSelectedCharID(null)}
							>
								Create Character
							</button>
						</ul>
					</div>
					<div className="character-viewer">
							{selectedCharID ? (
								<CharacterViewer
									requestedCharacterID={selectedCharID}
									encounterList={encounterList}
									refreshEncounters={refreshEncounters}
								/>
							) : (
									<CharacterCreator onCreateCharacter={loadCharacters} />
								)}
					</div>
				</main>
			</Card.Body>
		</Card>
	);
}

export default CharacterPage;
