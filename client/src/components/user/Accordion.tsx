import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import "../../assets/style/user/accordion.scss";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p style={{ color: "#012e41" }}>{text}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p style={{ color: "#012e41" }}>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p style={{ color: "#012e41" }}>{text}</p>,
  },
];

const Accordion: React.FC = () => {
  return <Collapse items={items} defaultActiveKey={["1"]} />;
};

export default Accordion;
