import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/Hooks";
import { MoveToFolderModal } from "./MoveToFolderModal";
import { DropDown } from "../common/DropDown";
import { Button } from "../common/Button";
import SelectAllComponents from "../common/SelectAllComponents";
import { addselectedarticles } from "../../redux/reducers/ArticleSlice";

export function ArticleViewButtonSection({
  articlesExpandHandler,
  fullTextShow,
  metaDataClickHandler,
  singleArticleView,
}) {
  const [refidlistdata, setrefidlistdata] = useState([]);
  const [tooglestate, setTooglestate] = useState(false);
  const fontResizerState = useAppSelector((state) => state.globalFontResizer);
  const articledata = useAppSelector((state) => state.articleSlice.data);
  const selectedArticles = useAppSelector(
    (state) => state.articleSlice.selectedarticleslist
  );

  const dispatch = useAppDispatch();

  const refidset = () => {
    if (articledata !== null) {
      let refidlist = [];
      articledata["data"].forEach((d) => {
        refidlist.push(d["refId"]);
      });
      setrefidlistdata(refidlist);
    }
  };

  useEffect(() => {
    refidset();
  }, [articledata, selectedArticles]);

  const refIdArrMakeHandler = () => {
    let removerefid = [];
    selectedArticles.forEach((refId) => {
      let checkindex = refidlistdata.indexOf(refId);
      if (checkindex === -1) {
        removerefid.push(refId);
      }
    });
    return removerefid;
  };

  const selectallarticleinpage = (mode) => {
    const removerefid = refIdArrMakeHandler();
    dispatch(
      addselectedarticles({
        selectedarticleslist: removerefid.concat(refidlistdata),
      })
    );
  };

  const setdispatch = () => {
    let count = 0;
    selectedArticles.forEach((refId) => {
      let checkindex = refidlistdata.indexOf(refId);
      if (checkindex > -1) {
        count++;
      }
    });
    if (count === refidlistdata.length) {
      return true;
    } else {
      return false;
    }
  };

  const deselectallarticleinpage = () => {
    let datalistselectallarticleinpagefordeselect = selectedArticles.filter(
      function (val) {
        return refidlistdata.indexOf(val) == -1;
      }
    );

    setTooglestate(false);
    dispatch(
      addselectedarticles({
        selectedarticleslist: datalistselectallarticleinpagefordeselect,
      })
    );
  };

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
