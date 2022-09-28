import React, { useState } from "react";
import { useAppSelector } from "../../redux/Hooks";

type DropDownProps = {
  activeDropDownVal: string;
  changeValHandler: Function;
  dropdownValues: string[];
  width: number;
  height: number | string;
  hasBorder: boolean;
  backGroundColor: string;
  literaldate:string;
};

export function DropDown({
  activeDropDownVal,
  changeValHandler,
  dropdownValues,
  width,
  height,
  hasBorder,
  backGroundColor,
}: DropDownProps) {
  const fontResizerState = useAppSelector((state) => state.globalFontResizer);
  const [showDropDown, setshowDropDown] = useState(false);

  console.log("activeDropDownVal", activeDropDownVal);
  let literaldate;
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  const [customdate,setcustomdate]=useState(false)
  // const [toogleok,setToogleok]=useState(false)
  const [dropdowndate, setDropdowndate] = useState("");

  const dropDownShowHandler = () => {
    setshowDropDown((prevVal) => !prevVal);
  };

  const setSelectedValueHandler = (dropdownVal: string) => {
   
    if(dropdownVal=="Custom")
  {
    changeValHandler(dropdowndate);
    setcustomdate(!customdate)

  }
  else{
    setshowDropDown((prevVal) => !prevVal);
    changeValHandler(dropdownVal);

  }
  };

  

  const checkdate = () => {
    if (fromdate == "") {
      alert("Please enter From date");
    } else if (todate == "") {
      alert("Please Enter the To date");
    }
    if (fromdate && todate !== "") {
      // setToogleok(!toogleok)
      // setDropdowndate(`${fromdate} to ${todate}`);
      literaldate=`${fromdate} to ${todate}`
      setcustomdate(false)
      setshowDropDown(false)
      changeValHandler(literaldate)
    }
  };


 const closecustomdate=(dropdownVal: string[])=>{
  setshowDropDown(false)
  changeValHandler(dropdownVal[0]);
  setcustomdate(false)



 }


  return (
    <div style={{ width: width }} className="position-relative">
      <div
        onClick={() => dropDownShowHandler()}
        style={{
          border: hasBorder ? "solid 1px #EEEEEE" : "",
          backgroundColor: backGroundColor && backGroundColor,
        }}
        className="cursor-pointer d-flex align-items-center justify-content-between drop-down-box"
      >
        <p
          className="no-margin font-change-animation"
          style={{ fontSize: fontResizerState["lowFont"] }}
        >
          { activeDropDownVal}
        </p>

        <img
          src="/images/gray-drop-down-image.png"
          className={showDropDown ? "drop-down-rotated" : "drop-down-icon"}
          alt="Drop Down..."
        />
      </div>
      {
        showDropDown &&  (
          <div
            className="drop-down-content-box"
            // onMouseLeave={() => dropDownShowHandler()}
            style={{ height: height, width: width }}
          >
            {   
           !customdate? 
              dropdownValues.map((dropdownVal, idx) => {
                return (
                  <>
                    <p
                      key={idx}
                      className="drop-down-content no-margin font-change-animation"
                      style={{ fontSize: fontResizerState["lowFont"] }}
                      onClick={() => setSelectedValueHandler(dropdownVal)}
                    >
                      {dropdownVal}
                    </p>
                  </>
                );
              })
              :
                <div
                  
                  // onMouseLeave={() => dropDownShowHandler()}
                  style={{ height: height, width: width }}
                >
                  {
                    <div>
                      <div>
                      <img src="/images/cross-image.png" style={{width:"10px",height:"10px",left:"10px",marginBottom:"10px"}}
                      onClick={()=>closecustomdate(dropdownValues)}
                      />

                      </div>
                      <input
                        className="mb-2"
                        type="date"
                        value={fromdate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <input
                        className="mb-2"
                        type="date"
                        value={todate}
                        onChange={(e) => {
                          setToDate(e.target.value);
                        }}
                      />
                      <button
                        className="w-25 bg-success"
                        style={{ border: "none", color: "white", left: "15px" }}
                        onClick={checkdate}
                      >
                        Ok
                      </button>
                    </div>
                  }
                </div>
              
              
             }

            </div>
            )
    
            //  (
            //   <div
            //     className="alert-box"
            //     // onMouseLeave={() => dropDownShowHandler()}
            //     style={{ height: height, width: width }}
            //   >
            //     {
            //       <div>
            //         <input
            //           className="mb-2"
            //           type="date"
            //           value={fromdate}
            //           onChange={(e) => setFromDate(e.target.value)}
            //         />
            //         <input
            //           className="mb-2"
            //           type="date"
            //           value={todate}
            //           onChange={(e) => {
            //             setToDate(e.target.value);
            //           }}
            //         />
            //         <button
            //           className="w-25 bg-success"
            //           style={{ border: "none", color: "white", left: "15px" }}
            //           onClick={checkdate}
            //         >
            //           Ok
            //         </button>
            //       </div>
            //     }
            //   </div>
            // )
            }

    </div>
  );
}
