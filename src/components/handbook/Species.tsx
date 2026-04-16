import { Container } from "react-bootstrap";
import { useHandbookData } from "./useHandbookData";
import { Species } from "../../modules/open5e/types.gen";
import { speciesRetrieve } from "../../modules/open5e/sdk.gen";

export default function Race({ id }: { id: string }) {
  const { data: species, loading } = useHandbookData(
    id,
    speciesRetrieve,
    (data): data is Species => (data as Species)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!species) {
    return (
      <div>
        <p>Species not found</p>
      </div>
    );
  }

  return (
    <Container>
      <main className="page tocDepthH3" id="p1" data-index="0"></main>
    </Container>
  );
}
