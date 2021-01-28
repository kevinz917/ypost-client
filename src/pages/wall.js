import { useState, useEffect } from "react";
// import { useQuery } from "react-query";
import { fetchPublicPosts } from "../api/group";
import { fetchAllCards } from "../api/user";
import { useSelector } from "react-redux";
import MemoryLetter from "../components/memoryLetter";

// trying out useQuery
const Wall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const groupVal = useSelector((state) => state.groupReducer);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);
      await fetchPublicPosts(groupVal.groupId);
      await fetchAllCards();
      setIsLoading(false);
    };
    onMount();
  }, []);

  return (
    <div className="paperCardContainer fade-in">
      <br />
      <div className="header2">Wall of gratitude</div>
      <div style={{ width: "500px" }} />
      <br />
      {isLoading ? (
        <div>Loading ... </div>
      ) : (
        <div>
          {groupVal.cards.map((card) => (
            <MemoryLetter
              letterContent={card}
              key={card._id}
              status={"public"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wall;
