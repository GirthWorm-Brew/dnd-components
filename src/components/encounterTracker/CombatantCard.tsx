import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Combatant } from "../../modules/encounter-api";

type CombatantProps = {
  combatant: Combatant;
  isActive: boolean;
  isTargetable: boolean;
  onDelete: () => void;
};
export default function CombatantCard({
  combatant,
  isActive,
  isTargetable,
  onDelete,
}: CombatantProps) {
  return (
    <Card border={isTargetable ? "danger" : isActive ? "warning" : ""}>
      <Card.Body>
        <Card.Title>
          {combatant.displayName}{" "}
          {isActive && (
            <Badge bg="warning" text="dark">
              Turn
            </Badge>
          )}{" "}
          {isTargetable && <Badge bg="danger">Target</Badge>}
        </Card.Title>
        <Card.Subtitle>{combatant.kind}</Card.Subtitle>
        <Row>
          <Col>
            <Button variant="primary">
              HP{" "}
              <Badge bg="secondary">{`${combatant.currentHp} / ${combatant.maxHp}`}</Badge>
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-danger"
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
