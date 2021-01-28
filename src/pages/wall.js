import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchPublicPosts } from "../api/group";
import { useSelector } from "react-redux";
import MemoryLetter from "../components/memoryLetter";

// trying out useQuery
const Wall = () => {
  const [fetchedCards, setFetchedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const groupVal = useSelector((state) => state.groupReducer);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);
      const fetchedCards = await fetchPublicPosts(groupVal.groupId);
      setFetchedCards(fetchedCards);
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
          {fetchedCards.map((card) => (
            <MemoryLetter letterContent={card} key={card._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wall;
