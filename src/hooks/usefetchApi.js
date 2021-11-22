import { useState, useEffect } from 'react';

export default function useFetchApi(url) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const [loadmore, setLoadmore] = useState(false);

  useEffect(() => {
    setLoadmore(true);

    if (!url) return;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setIsFetching(false);
        setLoadmore(false);
        setData(result);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
        setIsError(true);
      });
  }, [url]);
  return { data, isFetching, isError, loadmore };
}
