import api from "../api/index";

const Test = () => {
  const testFetch = async () => {
    console.log("Fetching test ...");
    let res = await api.post("/user/validate");
    console.log(res.data);
  };

  return (
    <div>
      <button onClick={() => testFetch()}>Test</button>
    </div>
  );
};

export default Test;
