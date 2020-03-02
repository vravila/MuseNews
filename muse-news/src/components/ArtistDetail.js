import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ArtistsPage() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [item, setItem] = useState([]);

  const fetchItems = async () => {};

  return (
    <div>
      <h4>Item</h4>
    </div>
    // <div>
    //   <h1>Artists Page!!!</h1>
    //   <h4>Drake</h4>
    //   <h4>The Weeknd</h4>
    //   <h4>Coldplay</h4>
    // </div>
  );
}

export default ArtistsPage;
