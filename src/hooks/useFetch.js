const useFetch = async (fetchData) => {
  try {
    const response = await fetch(fetchData.url, {
      method: fetchData.method || "GET",
      header: fetchData.headers || "",
      body: JSON.stringify(fetchData.body),
    });

    if (!response.ok) return;

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export default useFetch;
