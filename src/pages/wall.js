import { useQuery } from "react-query";
import { Base } from "../util/base";
import { fetchPublicPosts } from "../api/group";
import { useSelector } from "react-redux";
import MemoryLetter from "../components/memoryLetter";

// trying out useQuery
const Wall = () => {
  const groupVal = useSelector((state) => state.groupReducer);

  const { isLoading, isError, data, error } = useQuery(
    "publicPosts",
    fetchPublicPosts(groupVal.groupId)
  );

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.map((letter) => (
        <MemoryLetter letterContent={letter} />
      ))}
    </div>
  );
};

export default Wall;
