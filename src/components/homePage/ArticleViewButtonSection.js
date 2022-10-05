import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/Hooks";
import { MoveToFolderModal } from "./MoveToFolderModal";
import { DropDown } from "../common/DropDown";
import { Button } from "../common/Button";
import { addallarticlesinpage } from "../../redux/reducers/ArticleSlice";
import SelectAllComponents from "../common/SelectAllComponents";
import { adddatalist } from "../../redux/reducers/ArticleSlice";
import { addselectedalltoogle } from "../../redux/reducers/ArticleSlice";
import {
  FectallArticles,
  Fetchbykeywords,
} from "../../redux/actions/ArticlesActions";

export function ArticleViewButtonSection({
  newArticle,
  articlesExpandHandler,
  fullTextShow,
  metaDataClickHandler,
  singleArticleView,
}) {
  const [refidlistdata, setrefidlistdata] = useState([]);
  const [tooglestate, setTooglestate] = useState(false);
  const [checkdata, setCheckdata] = useState([]);

  const fontResizerState = useAppSelector((state) => state.globalFontResizer);
  const { currentpage, searchkeyword, datalist } = useAppSelector(
    (state) => state.articleSlice
  );

  const articledata = useAppSelector((state) => state.articleSlice.data);
  const datalistselectallarticleinpage = useAppSelector(
    (state) => state.articleSlice.selectallarticleinpage
  );
  const selectedalltoogle = useAppSelector(
    (state) => state.articleSlice.selectedallslice
  );

  console.log("data from datalist", datalist);

  const dispatch = useAppDispatch();

  const refidset = () => {
    if (articledata !== null) {
      let refidlist = [];

      console.log("articledata", articledata);

      articledata["data"].forEach((d) => {
        refidlist.push(d["refId"]);
      });

      console.log("refidlist", refidlist);
      setrefidlistdata(refidlist);
    }
  };

  useEffect(() => {
    refidset();
  }, [articledata]);

  const selectallarticleinpage = () => {
    console.log("in select fun");
    console.log(
      "datalistselectallarticleinpage.concat(refidlistdata)",
      datalistselectallarticleinpage.concat(refidlistdata)
    );
    setCheckdata(datalistselectallarticleinpage.concat(refidlistdata));
    dispatch(
      addallarticlesinpage({
        selectallarticleinpage:
          datalistselectallarticleinpage.concat(refidlistdata),
      })
    );
  };

  const setdispatch = () => {
    let count = 0;
    console.log("in setdispatch fun");
    console.log(
      "datalistselectallarticleinpage.length",
      datalistselectallarticleinpage.length
    );
    console.log("checkdata", checkdata);
    if (datalistselectallarticleinpage.length == 0) {
      return false;
    } else {
      datalistselectallarticleinpage.forEach((d) => {
        if (refidlistdata.includes(d)) {
          count = count + 1;
        }
      });
      console.log("count", count);

      if (count == 10) {
        console.log("yes data is 10");
        setTooglestate(true);
        return true;
      } else {
        setTooglestate(false);
        return false;
      }
    }
  };
  const deselectallarticleinpage = () => {
    console.log("in deselect");

    let datalistselectallarticleinpagefordeselect =
      datalistselectallarticleinpage.filter(function (val) {
        return refidlistdata.indexOf(val) == -1;
      });
    console.log(
      "datalistselectallarticleinpagefordeselect",
      datalistselectallarticleinpagefordeselect
    );
    setTooglestate(false);
    dispatch(
      addallarticlesinpage({
        selectallarticleinpage: datalistselectallarticleinpagefordeselect,
      })
    );
  };

  console.log("deselected page", datalistselectallarticleinpage);

  console.log("selectedallslice data from redux", selectedalltoogle);

  console.log("data from redux", datalistselectallarticleinpage);
  console.log("data from usestate", refidlistdata);

  const dropDownValues = ["Published Date", "Recently Added"];
  const [articleViewButtonSectionState, setarticleViewButtonSectionState] =
    useState({
      activeDropDownVal: dropDownValues[0],
      moveToFolderModalShow: false,
    });

  const moveToFolderModalShowHandler = () => {
    setarticleViewButtonSectionState((prevVal) => ({
      ...prevVal,
      moveToFolderModalShow: !prevVal["moveToFolderModalShow"],
    }));
  };

  const dropDownValueHandler = (val) => {
    setarticleViewButtonSectionState({
      ...articleViewButtonSectionState,
      activeDropDownVal: val,
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-between has-green-border-bottom pad-b-5 article-view-head-height">
      <div className="d-flex align-items-center position-relative">
        <div style={{ marginRight: "10px" }} className="cursor-pointer">
          <SelectAllComponents
            selectallarticleinpage={selectallarticleinpage}
            deselectallarticleinpage={deselectallarticleinpage}
            tooglestate={tooglestate}
            setdispatch={() => setdispatch()}
          />
        </div>

        <Button
          hasExtraPad={false}
          text={"Move To Folder"}
          upperCaseText={false}
          btnHasRadius={true}
          btnHasImg={true}
          btnClickHandler={moveToFolderModalShowHandler}
          fontSize={fontResizerState["lowFont"]}
          imgUrl={"./images/folder-image.png"}
          loadingCase={false}
          hasMarginLeft={false}
          textCenter={false}
        />
        {articleViewButtonSectionState["moveToFolderModalShow"] && (
          <MoveToFolderModal closeModalHandler={moveToFolderModalShowHandler} />
        )}
        {!singleArticleView && (
          <Button
            hasExtraPad={false}
            text={"Expand All"}
            upperCaseText={false}
            btnHasRadius={true}
            btnHasImg={true}
            btnClickHandler={articlesExpandHandler}
            fontSize={fontResizerState["lowFont"]}
            imgUrl={"./images/expand-image.png"}
            loadingCase={false}
            hasMarginLeft={true}
            textCenter={false}
          />
        )}
        <Button
          hasExtraPad={false}
          text={"Export"}
          upperCaseText={false}
          btnHasRadius={true}
          btnHasImg={true}
          fontSize={fontResizerState["lowFont"]}
          imgUrl={"./images/export-image.png"}
          loadingCase={false}
          hasMarginLeft={true}
          textCenter={false}
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span
          className="font-change-animation"
          style={{ fontSize: fontResizerState["lowFont"] }}
        >
          Sort By : &nbsp;
        </span>
        <DropDown
          activeDropDownVal={articleViewButtonSectionState["activeDropDownVal"]}
          changeValHandler={dropDownValueHandler}
          dropdownValues={dropDownValues}
          width={175}
          height={"auto"}
          hasBorder={true}
        />
      </div>
      {singleArticleView && (
        <ul
          className="meta-data-selector cursor-pointer d-flex has-font-weight font-change-animation"
          style={{ fontSize: fontResizerState["lowFont"] }}
          onClick={() => metaDataClickHandler()}
        >
          <li className={!fullTextShow ? "active" : ""}>Meta Data</li>
          <li className={fullTextShow ? "active" : ""}>Full Text</li>
        </ul>
      )}
    </div>
  );
}
