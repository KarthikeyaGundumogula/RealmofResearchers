import axios from "axios";

export const getGraphData = async (query) => {
  try {
    const url =
      "https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/realmofresearchers";
    const res = await axios.post(url, { query: query });
    return res;
  } catch (err) {
    console.log(err);
  }
};
