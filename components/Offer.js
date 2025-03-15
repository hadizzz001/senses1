import { useEffect, useState } from "react";

export default function OfferHeadline() {
  const [offer, setOffer] = useState("");

  useEffect(() => {
    fetch("/api/offer")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setOffer(data[0].name);
      })
      .catch((err) => console.error("Error fetching offer:", err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        fontSize: "14px",
        textAlign: "center",
        padding: "5px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 99999999, 
      }}
    >
      {offer}
    </div>
  );
}
