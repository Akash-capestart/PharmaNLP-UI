import React from 'react'

const SelectAllComponents = (props) => {
  const  {selectallarticleinpage,deselectallarticleinpage,tooglestate,dispatchreturn,setdispatch}=props
  return (
    <div>
        <div style={{ marginRight: "10px" }} className="cursor-pointer"> 
          {
            console.log("setdispa",setdispatch(),tooglestate)
          }
          {  setdispatch()  ? (
            <img
              className="w-20"
              src="/images/circle-selected-image.png"
              // onClick={() => allarticleinpageSelectHandler(newArticle)}
              onClick={() => deselectallarticleinpage()}
              alt="Selectable..."
            />
          ) : (
            <img
              className="w-20"
              src="/images/selectable-image.png"
              // onClick={() => allarticleinpageSelectHandler(newArticle)}
              onClick={() => selectallarticleinpage()}
              alt="Selectable..."
            />
          )}
        </div>
    </div>
  )
}

export default SelectAllComponents