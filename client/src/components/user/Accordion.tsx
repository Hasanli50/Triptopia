import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import "../../assets/style/user/accordion.scss";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "What is Triptopia?",
    children: (
      <p style={{ color: "#012e41" }}>
        Triptopia is a trip planning app that helps you organize your travel
        itinerary, discover new places, and manage all your travel plans in one
        place. From accommodation to attractions and maps, everything you need
        is right at your fingertips.
      </p>
    ),
  },
  {
    key: "2",
    label: " Is Triptopia free to use?",
    children: (
      <p style={{ color: "#012e41" }}>
        Yes! Triptopia offers a free version with core trip planning features.
        We may offer premium features for advanced users, but planning and
        saving trips is free for everyone.
      </p>
    ),
  },
  {
    key: "3",
    label: "Can I use the app offline?",
    children: (
      <p style={{ color: "#012e41" }}>
        Yes, you can access saved trips and certain features offline. Make sure
        to download your trip details or offline maps before you go.
      </p>
    ),
  },
  {
    key: "4",
    label: "Can I share my trip with others?",
    children: (
      <p style={{ color: "#012e41" }}>
        Absolutely! You can invite friends or family to view or collaborate on
        your trip. Just go to your trip settings and choose “Share Trip” to send
        an invite. 6. Can I book flights, hotels, or tours dire
      </p>
    ),
  },
  {
    key: "5",
    label: "How do I delete a trip?",
    children: (
      <p style={{ color: "#012e41" }}>
        Go to the trip details screen, tap the menu icon (⋮), and choose “Delete
        Trip.” Please note that this action is permanent.
      </p>
    ),
  },
];

const Accordion: React.FC = () => {
  return <Collapse items={items} defaultActiveKey={["1"]} />;
};

export default Accordion;
