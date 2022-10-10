import React, { useRef, useState, useEffect } from "react";
import { useAppSelector } from "../../redux/Hooks";
import { FectallArticles } from "../../redux/actions/ArticlesActions";
import Pagination from "../common/Pagination";

export function ArticlesListsSection({
  newArticles,
  selectedArticles,
  articlesExpand,
  articleSelectHandler,
  singleArticleClickHandler,
  scrollHeight,
  selectallArticles,
}) {
  // let data=FectallArticles
  const fontResizerState = useAppSelector((state) => state.globalFontResizer);
  const articledata = useAppSelector((state) => state.articleSlice.data);
  const toogleallselect = useAppSelector(
    (state) => state.articleSlice.selectedallslice
  );
  const selectedallarticles = useAppSelector(
    (state) => state.articleSlice.selectallarticleinpage
  );
  const [tagtoogle, setTagtoogle] = useState(false);
  const [activetag, setActivetag] = useState(null);
  const [taginput, setTaginput] = useState("");

  const [tags, settags] = useState([
    "Adverse Events",
    "D1,A1,P1,R1",
    "Relevant",
    "Irrelevant",
    "No Match",
    "Adverse Events",
    "D1,A1,P1,R1",
    "Relevant",
    "Irrelevant",
    "No Match",
  ]);

  useEffect(() => {
    const objReModHandler = () => {
      let initObj = [];
      newArticles["data"].forEach((element) => {
        let newObj = { ...element };
        newObj["tags"] = tags;
        initObj.push(newObj);
      });
      setnewObj(initObj);
    };
    objReModHandler();
  }, [tags, newArticles]);

  const [newObj, setnewObj] = useState(null);
  console.log("fajdshfkajh", articledata);
  const articleContentHeightRef = useRef(null);
  // console.log("data from the listsec",data)
  console.log("newObj", newObj);
  console.log("taginput", taginput);
  const tagtooglefunction = (active) => {
    setTagtoogle(!tagtoogle);
    setActivetag(active);
  };

  const savetag = (refId) => {
    if (taginput !== "") {
      const newArr = [...newObj];
      newArr.forEach((each, id) => {
        if (each.refId === refId) {
          const newTags = [taginput, ...each.tags];
          newArr[id].tags = newTags;
        }
      });
      setnewObj(newArr);
      console.log("setnewObj", newObj);
      setTaginput("");
    } else {
      alert("Please enter the input tag");
    }
    setActivetag(null);
  };

  console.log("active tag is", activetag);

  return (
    <>
      {/* {newArticles && articledata["data"].map((newArticle, idx) => { */}
      {/* {articledata["data"].map((newArticle, idx) => { */}
      {newObj &&
        newObj.map((newArticle, idx) => {
          return (
            <div
              key={idx}
              className="row no-margin has-green-border-bottom pad-15"
            >
              <div className="col-md-10 no-padding">
                <div className="d-flex align-items-center">
                  <div className="cursor-pointer">
                    {/* {selectedArticles.includes(newArticle.refId) || selectallArticles ? ( */}
                    {selectedallarticles.includes(newArticle.refId) ||
                    selectedArticles.includes(newArticle.refId) ? (
                      <img
                        className="w-20"
                        src="/images/circle-selected-image.png"
                        onClick={() => articleSelectHandler(newArticle.refId)}
                        alt="Selectable..."
                      />
                    ) : (
                      <img
                        className="w-20"
                        src="/images/selectable-image.png"
                        onClick={() => articleSelectHandler(newArticle.refId)}
                        alt="Selectable..."
                      />
                    )}
                  </div>
                  <p
                    className="no-margin has-font-weight cursor-pointer pad-horizontal-15 font-change-animation"
                    style={{ fontSize: fontResizerState["midFont"] }}
                    onClick={() =>
                      singleArticleClickHandler(newArticle.refId, scrollHeight)
                    }
                  >
                    {newArticle.title}
                  </p>
                </div>
                <div
                  className="article-content-box accordian-height-animation"
                  ref={articleContentHeightRef}
                  style={{
                    maxHeight: articlesExpand
                      ? articleContentHeightRef.current.scrollHeight
                      : 60,
                  }}
                >
                  <p
                    className="no-margin text-dark-gray article-content-view font-change-animation"
                    style={{ fontSize: fontResizerState["lowFont"] }}
                  >
                    <span className="has-font-weight text-black">
                      Introduction :{" "}
                    </span>
                    {newArticle.abstractData}
                  </p>
                </div>
                <a
                  href={newArticle.fullTextUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <span
                    className="text-green has-font-weight cursor-pointer font-change-animation"
                    style={{
                      fontSize: fontResizerState["lowFont"],
                      paddingLeft: 50,
                    }}
                  >
                    View Source...
                  </span>
                </a>
              </div>
              <div className="col-md-2 no-padding">
                <div className="d-flex align-items-center justify-content-evenly mar-b-15">
                  <span
                    className="text-dark-gray font-change-animation"
                    style={{ fontSize: fontResizerState["midFont"] }}
                  >
                    {newArticle["publicationYear"]}
                  </span>
                  <img
                    className="w-20"
                    src="/images/cloud-download-image.png"
                    alt="Cloud..."
                  />
                  <img
                    className="h-15"
                    src="/images/label-image.png"
                    alt="label..."
                  />
                </div>
                {activetag === newArticle.refId ? (
                  <div>
                    <input
                      placeholder="Add Tag"
                      style={{ width: "70%", marginRight: "5px" }}
                      onChange={(e) => setTaginput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && savetag(newArticle.refId)
                      }
                    />
                    <img
                      style={{ width: "15%" }}
                      src="images/create-folder-image.png"
                      onClick={() => savetag(newArticle.refId, taginput)}
                    />
                  </div>
                ) : (
                  <p
                    className="w-75 text-center m-auto text-dark-gray adverse-article-status has-font-weight font-change-animation"
                    style={{ fontSize: fontResizerState["lowFont"] }}
                    onClick={() => tagtooglefunction(newArticle.refId)}
                  >
                    Add Tag
                  </p>
                )}

                <div
                  className="overflow-auto accordian-height-animation"
                  style={{
                    maxHeight: articlesExpand ? 300 : 85,
                    marginTop: "10px",
                  }}
                >
                  {newArticle.tags.map((each, idx) => {
                    return (
                      <div key={idx}>
                        <p className="w-75 text-center m-auto text-dark-gray adverse-article-status has-font-weight font-change-animation">
                          {each}
                        </p>
                        <div className="h-15"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      <div style={{ textAlign: "center" }}>
        <Pagination />
      </div>
    </>
  );
}
