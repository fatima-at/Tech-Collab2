import { useState, useEffect } from "react";
// useFetch is a custom hook
const useFetch = (fetchFunction, update) => {
  // data, loading, error are all local state variables

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState({})

  // fetchData is a function that runs when the component is mounted
  const fetchData = async (signal, newId, layerLevel) => {
    try {

      // fetchFunction is a function that returns a promise
      // it is passed as an argument to the useFetch hook
      const response = await fetchFunction(signal, newId, layerLevel);

      if (response?.name === 'AbortError') return;

      setData(response?.data);

      if (update) {
        update(response?.data)
      }
      if (!response?.status)
        setError(true);
      setErrorContent(response)
    } catch (error) {
      if (error?.name === 'AbortError') return;
      setError(true);
      console.log(error);
      setErrorContent(error)
    } finally {
      if (signal?.aborted) return;
      setLoading(false);
    }
  };
  const handleDataChange = (key, value) => {
    setData((oldState) => {
      return {
        ...oldState,
        [key]: value
      }
    })
  }

  const handleOnChangeState = (data) => {
    setData(data);
  }

  useEffect(() => {

    const abortController = new AbortController();

    fetchData(abortController.signal);

    return () => {
      abortController.abort?.();
    }
  }, []);

  // refetch is a function that can be called to run fetchData again
  const refetch = async (newId, layerLevel) => {
    await fetchData(undefined, newId, layerLevel);
  };

  // useFetch returns an object that contains the data, loading, and error variables
  return {
    data,
    loading,
    error,
    refetch,
    handleDataChange,
    setData,
    handleOnChangeState,
    errorContent
  };
};

export default useFetch;