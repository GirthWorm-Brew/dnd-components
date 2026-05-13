import type { Character } from "./CharacterInterface";

interface GetterProps {
	characters: Character[];
	onSelectCharacter: (id: string) => void;
	onDeleteCharacter: (id: string) => void;
}

function CharacterGetter({
	characters,
	onSelectCharacter,
	onDeleteCharacter,
}: GetterProps) {
	return (
		<>
			{characters.map((char) => (
				<li
					className="character-card"
					key={char.charID}
					onClick={() => onSelectCharacter(char.charID)}>
					<span>{char.name}</span>
					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							onDeleteCharacter(char.charID);
						}}>
						Delete
					</button>
				</li>
			))}
		</>
	);
}

export default CharacterGetter;
