import React from "react";

const SelectAllComponents = (props) => {
  const {
    selectallarticleinpage,
    deselectallarticleinpage,
    tooglestate,
    setdispatch,
  } = props;
  return (
    <div>
      <div style={{ marginRight: "10px" }} className="cursor-pointer">
        {setdispatch() ? (
          <img
            className="w-20"
            src="/images/circle-selected-image.png"
            onClick={() => deselectallarticleinpage()}
            alt="Selectable..."
          />
        ) : (
          <img
            className="w-20"
            src="/images/selectable-image.png"
            onClick={() => selectallarticleinpage("selectall")}
            alt="Selectable..."
          />
        )}
      </div>
    </div>
  );
};

export default SelectAllComponents;
