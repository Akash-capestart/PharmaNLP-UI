import React, { useState } from "react";
import { ArticleViewButtonSection } from "./ArticleViewButtonSection";
import { ArticlesListsSection } from "./ArticlesListsSection";
import { FullTextViewSection } from "./FullTextViewSection";
import { NewArticles } from "../common/NewArticles";
import { useAppSelector, useAppDispatch } from "../../redux/Hooks";
import { addselectedarticles } from "../../redux/reducers/ArticleSlice";
import { addallarticlesinpage } from "../../redux/reducers/ArticleSlice";

export function ArticleViewComponent({
  articleViewHeight,
  toCollapse,
  advanceSearchAndFilterShowHandler,
}) {
  const newArticles = NewArticles;
  const dispatch = useAppDispatch();
  const { data, datalist } = useAppSelector((state) => state.articleSlice);

  const [articleViewContainerState, setarticleViewContainerState] = useState({
    fullTextShow: true,
    // selectedArticles: [],
    selectallArticles: [],
    articlesExpand: false,
    activeArticleId: null,
    activeArticle: null,
  });

  const selectedArticles = useAppSelector(
    (state) => state.articleSlice.selectedarticleslist
  );

  const allSelectedArticlesinpage = useAppSelector(
    (state) => state.articleSlice.selectallarticleinpage
  );

  console.log("selectedArticles data from redux", selectedArticles);

  const metaDataClickHandler = () => {
    setarticleViewContainerState((prevVal) => ({
      ...prevVal,
      fullTextShow: !prevVal["fullTextShow"],
    }));
  };

  const articleSelectHandler = (val) => {
    if (selectedArticles.includes(val)) {
      const notValArr = selectedArticles.filter((each) => each !== val);
      console.log("selected articles ", selectedArticles);
      console.log("notVal", notValArr);
      dispatch(addselectedarticles({ selectedarticleslist: notValArr }));
    } else {
      dispatch(
        addselectedarticles({
          selectedarticleslist: selectedArticles.concat(val),
        })
      );
    }
  };

  const allarticleinpageSelectHandler = (val) => {
    console.log("insise allarticleinpageSelectHandler");
    if (allSelectedArticlesinpage.includes(val)) {
      const notValArr = allSelectedArticlesinpage.filter(
        (each) => each !== val
      );
      dispatch(
        addallarticlesinpage({ allSelectedArticlesinpage: [notValArr] })
      );
    } else {
      dispatch(
        addallarticlesinpage({
          allSelectedArticlesinpage: [...allSelectedArticlesinpage, val],
        })
      );
    }
  };

  const articlesExpandHandler = () => {
    setarticleViewContainerState((prevVal) => ({
      ...prevVal,
      articlesExpand: !prevVal["articlesExpand"],
    }));
  };

  const singleArticleClickHandler = (id) => {
    advanceSearchAndFilterShowHandler(toCollapse, 150, "smooth");
    setarticleViewContainerState({
      ...articleViewContainerState,
      selectedArticles: [],
      articlesExpand: false,
      activeArticleId: id ? id : null,
      activeArticle: id
        ? newArticles["data"].filter((each) => each.refId === id)
        : null,
      moveToFolderModalShow: false,
    });
  };

  const articleFullTextViewHandler = (id) => {
    advanceSearchAndFilterShowHandler(toCollapse, 150, "smooth");
    setarticleViewContainerState({
      ...articleViewContainerState,
      activeArticleId: id,
      activeArticle: newArticles["data"].filter((each) => each.refId === id),
    });
  };

  return (
    <>
      {data != null ? (
        <>
          <ArticleViewButtonSection
            articlesExpandHandler={articlesExpandHandler}
            singleArticleView={
              articleViewContainerState["activeArticleId"] ? true : false
            }
            fullTextShow={articleViewContainerState["fullTextShow"]}
            metaDataClickHandler={metaDataClickHandler}
            selectedallArticles={articleViewContainerState["selectallArticles"]}
            allarticleinpageSelectHandler={allarticleinpageSelectHandler}
            allSelectedArticlesinpage={allSelectedArticlesinpage}
            selectallArticles={articleViewContainerState["selectallArticles"]}
          />
          {!articleViewContainerState["activeArticleId"] ? (
            <ArticlesListsSection
              newArticles={newArticles}
              articlesExpand={articleViewContainerState["articlesExpand"]}
              selectedArticles={selectedArticles}
              articleSelectHandler={articleSelectHandler}
              singleArticleClickHandler={singleArticleClickHandler}
              selectallArticles={articleViewContainerState["selectallArticles"]}
            />
          ) : (
            <FullTextViewSection
              articleViewHeight={articleViewHeight}
              newArticles={newArticles}
              activeArticleId={articleViewContainerState["activeArticleId"]}
              activeArticle={articleViewContainerState["activeArticle"][0]}
              selectedArticles={selectedArticles}
              fullTextShow={articleViewContainerState["fullTextShow"]}
              articleSelectHandler={articleSelectHandler}
              articleFullTextViewHandler={articleFullTextViewHandler}
              singleArticleClickHandler={singleArticleClickHandler}
            />
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
