import "../../styles/Nick.css";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "react-bootstrap";
import {
  armorList,
  backgroundsList,
  classesList,
  conditionsList,
  creaturesList,
  documentsList,
  featsList,
  itemsList,
  magicitemsList,
  speciesList,
  spellsList,
  weaponsList,
} from "../../modules/open5e/sdk.gen";
import { Link } from "react-router";
import {
  categories,
  getCategory,
  warmAll,
  type Category,
} from "../../modules/open5e-cache";
import { categoryConfig } from "../../modules/open5e-cache/config";

interface ListableItem {
  key: string;
  name: string;
}

export default function Sidebar() {
  const [category, setCategory] = useState<Category>("creatures");
  const [items, setItems] = useState<ListableItem[] | null>(null);
  let isSubClass = false;

  if (category === "classes") {
    isSubClass = false;
  } else if (category === "subclasses") {
    isSubClass = true;
  }

  const handleSelect = async (category: Category) => {
    let result = await getCategory(category);
    if (!result) {
      await warmAll();
      result = await getCategory(category);
    }
    setItems((result?.entries ?? []) as ListableItem[]);
  };

  useEffect(() => {
    handleSelect(category);
  }, [category]);

  if (!items) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  } else {
    return (
      <>
        <Col>
          <input type="checkbox" id="toggle-left" className="toggle-hidden" />
          <label htmlFor="toggle-left" className="side-tab left-tab">
            Library ◀
          </label>
          <aside className="sidebar sidebar-left">
            <input
              type="radio"
              name="lib-tab"
              id="lib-mon"
              className="lib-state"
              checked
            />
            <input
              type="radio"
              name="lib-tab"
              id="lib-spell"
              className="lib-state"
            />
            <input
              type="radio"
              name="lib-tab"
              id="lib-item"
              className="lib-state"
            />
            <input
              type="radio"
              name="lib-tab"
              id="lib-char"
              className="lib-state"
            />
            <DropdownButton
              id="sidebar-dropdown-selection"
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              onSelect={(key) => {
                if (key) {
                  setCategory(key as Category);
                  handleSelect(key as Category);
                }
              }}
            >
              <DropdownMenu>
                {categories.map(({ key, label }) => (
                  <DropdownItem eventKey={key}>{label}</DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownButton>
            <div className="library-content">
              <div className="content-pane pane-monsters">
                <ul className="list">
                  {items.map((item) => (
                    <li key={item.key}>
                      <Link to={`/encounter/${category}/${item.key}`}>
                        <Button variant="outline-info" size="sm">
                          {item.name}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="library-nav"> */}
            {/*   <label htmlFor="lib-mon">Monsters</label> */}
            {/*   <label htmlFor="lib-spell">Spells</label> */}
            {/*   <label htmlFor="lib-item">Items</label> */}
            {/*   <label htmlFor="lib-char">Chars</label> */}
            {/* </div> */}
          </aside>
        </Col>
      </>
    );
  }
}
