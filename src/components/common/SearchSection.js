import React, { useState } from "react";
import { PublishNewsLetterModal } from "../homePage/PublishNewsLetterModal";
import { DropDown } from "./DropDown";
import { QuickAlertModal } from "../homePage/QuickAlertModal";
import { SaveSearchModal } from "../homePage/SaveSearchModal";
// import { addsearchkeyword } from '../../redux/reducers/ArticlesSlice';
import {  useAppDispatch } from "../../redux/Hooks";
import { Fetchbykeywords,FectallArticles } from "../../redux/actions/ArticlesActions";
import { addsearchkeyword } from "../../redux/reducers/ArticleSlice";


export function SearchSection() {

  const dispatch = useAppDispatch();
  const [searchkeyword,setSearchkeyword]=useState("");

  // const [fromdate,setFromDate]=useState();
  // const [todate,setToDate]=useState();
  // const [toogleok,setToogleok]=useState(false)
  // const [dropdowndate,setDropdowndate]=useState("")

  console.log("searchword",searchkeyword)
  const dropDownValues = ["Last 1 Year", "Last 2 Year", "Last 3 Year","Custom"];
  const [searchSectionState, setsearchSectionState] = useState({
    showModal: [],
    activeDropDownVal: dropDownValues[0],
  });

  


  // const checkfrom=(e)=>{
  //   if(e ==null)
  //   {
  //     alert("Please select the from date")
  //   }
  // }

  // const checkdate=(e)=>{
  //   if(fromdate ==null)
  //   {
  //     alert("Please enter From date")
  //   }
  //   else if(todate ==null)
  //   {
  //     alert("Please Enter the To date")
  //   }
  //   if(fromdate && todate !==null)
  //   {
  //     setToogleok(!toogleok)
  //     setDropdowndate(`${fromdate} to ${todate}`)
  //   }
  // }



  const enterKeyhandle = (e) => {
    if (e.key === "Enter") {
        if (searchkeyword !== "") {
          console.log("Entered in the enter if")
            SearchHandler();
        } else {
          console.log("entered in else")
          fetchfullarticles()
        }
    }
}


const SearchHandler = async () => {
  dispatch(addsearchkeyword({ searchkeyword: searchkeyword }))
  dispatch(Fetchbykeywords({ endUrl: `/article/getArticlesByVal?value=${searchkeyword}&page=0` }))
}

const fetchfullarticles=async()=>{
  dispatch(addsearchkeyword({searchkeyword:null}))
  dispatch(FectallArticles({ endUrl: "/article/getAllArticles?page=0" }))
}

 
  const dropDownValueHandler = (val) => {
    setsearchSectionState({
      ...searchSectionState,
      activeDropDownVal: val,
    });
    // console.log("dropdown values",val)
  };

  const showModalHandler = (key) => {
    if (searchSectionState["showModal"].includes(key)) {
      setsearchSectionState({
        ...searchSectionState,
        showModal: [],
      });
    } else {
      setsearchSectionState({
        ...searchSectionState,
        showModal: [key],
      });
    }
  };

  return (
    <div className="row search-box align-items-center">
      <div className="col-md-7 no-padding">
        <div className="position-relative">
          <input placeholder="Basic Search" className="w-100 search-field" onChange={(e)=>setSearchkeyword(e.target.value)} onKeyDown={(e)=>{enterKeyhandle(e)}}/>
          <img
            src="/images/search-image.png"
            className="position-absolute icon-std"
            style={{ right: 10, top: 8 }}
            alt="Search..."
          />
        </div>
      </div>
      <div className="col-md-5 no-padding position-relative">
        <div className="d-flex align-items-center justify-content-around">
          <div className="d-flex flex-column">
          <DropDown
            activeDropDownVal={searchSectionState["activeDropDownVal"]}
            changeValHandler={dropDownValueHandler}
            dropdownValues={dropDownValues}
            // dropdownValues={fromdate && todate  ?dropdowndate:dropDownValues}
            width={175}
            height={"auto"}
          />
          {/* {
            searchSectionState.activeDropDownVal=="Custom" ?
            <div  className="alert-box w-100 mt-15 postion-absolute d-flex flex-column">
              <input className="mb-2" type="date" value={fromdate} onChange={(e)=>setFromDate(e.target.value)}/>
              <input className="mb-2" type="date" value={todate} onChange={(e)=>{setToDate(e.target.value)}}/>
              <button className="w-25 bg-success" style={{border:"none",color:"white",left:"15px"}}  
              onClick={checkdate}
              >Ok</button>
            </div>:""
          } */}
          </div>
          <img
            src="/images/quick-alert-image.png"
            className="icon-std position-relative"
            alt="Alert..."
            onClick={() => showModalHandler("quickAlertModal")}
          />
          {searchSectionState["showModal"].includes("quickAlertModal") && (
            <QuickAlertModal closeModalHandler={showModalHandler} />
          )}
          <img
            src="/images/save-search-image.png"
            className="icon-std position-relative"
            alt="Save Search..."
            onClick={() => showModalHandler("saveSearchModal")}
          />
          {searchSectionState["showModal"].includes("saveSearchModal") && (
            <SaveSearchModal closeModalHandler={showModalHandler} />
          )}
          <img
            src="/images/publish-news-letter-image.png"
            className="icon-std position-relative"
            alt="Publish..."
            onClick={() => showModalHandler("newsLetterModal")}
          />
          {searchSectionState["showModal"].includes("newsLetterModal") && (
            <PublishNewsLetterModal closeModalHandler={showModalHandler} />
          )}
        </div>
      </div>
    </div>
  );
}
