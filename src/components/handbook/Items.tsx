import { Container } from "react-bootstrap";
import { useHandbookData } from "./useHandbookData";
import { Item } from "../../modules/open5e/types.gen";
import { itemsRetrieve } from "../../modules/open5e/sdk.gen";
import { useParams } from "react-router";

export default function Race() {
  let { stub } = useParams<{ stub: string }>();
  const { data: species, loading } = useHandbookData(
    stub,
    itemsRetrieve,
    (data): data is Item => (data as Item)?.name !== undefined,
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
