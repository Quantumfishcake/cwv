import { useState } from "react";

export default function Collapse({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-value="title"
      className={
        "flex-1 collapse border collapse-arrow border-base-300 bg-base-100 rounded-box " +
        (isOpen ? " collapse-open" : "collapse-close")
      }
    >
      <div
        className="collapse-title text-xl font-medium p-1 pr-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </div>
      <div className="collapse-content">{content}</div>
    </div>
  );
}
