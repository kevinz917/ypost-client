import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchPublicPosts } from "../api/group";
import { useSelector } from "react-redux";
import MemoryLetter from "../components/memoryLetter";

// trying out useQuery
const Wall = () => {
  const [fetchedCards, setFetchedCards] = useState([]);
  const groupVal = useSelector((state) => state.groupReducer);

  useEffect(() => {
    const onMount = async () => {
      const fetchedCards = await fetchPublicPosts(groupVal.groupId);
      setFetchedCards(fetchedCards);
    };
    onMount();
  }, []);

  return (
    <div className="paperCardContainer fade-in">
      <br />
      <div className="header2">Wall of gratitude</div>
      <div style={{ width: "500px" }} />
      <br />
      {fetchedCards.map((card) => (
        <MemoryLetter letterContent={card} key={card._id} />
      ))}
    </div>
  );
};

export default Wall;
