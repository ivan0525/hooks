import React, { useEffect, useCallback, useState } from "react";
import Axios from "axios";

function FetchArticle({ keyWord = "redux" }) {
  const [data, setData] = useState({ hits: [] });
  const FetchArticle = useCallback(() => {
    const fetchData = async () => {
      try {
        const result = await Axios(
          `https://hn.algolia.com/api/v1/search?query=${keyWord}`
        );
        setData(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [keyWord]);
  return <ArticalDetail fetchArticle={FetchArticle} articalList={data} />;
}

function ArticalDetail({ fetchArticle, articalList }) {
  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);
  console.log(articalList);
  return (
    <ul>
      {articalList.hits.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default FetchArticle;
