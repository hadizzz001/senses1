"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResponsiveVideo = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Fetch categories from API and filter only the first 3
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        setCategories(data.slice(0, 3)); // Take only first 3 categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to render either video or image
  const renderMedia = (category) => {
    if (category.img[0].endsWith(".mp4")) {
      return (
        <video className="pic-bubble" autoPlay loop muted playsInline>
          <source src={category.img[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return <img className="pic-bubble" src={category.img[0]} alt={category.name} />;
  };

  return (
    <>
      <h1 className="uppercase text-center myBB">Our Collections</h1>
      <div className="odd-container">
        {/* Left Side - First Category */}
        {categories.length > 0 && (
          <div id="vid-jump">
            {renderMedia(categories[0])}
            <h3 className="pic-tagline" style={{ bottom: "15%" }}>
              {categories[0].name}
            </h3>
            <button onClick={() => router.push("/search?cat="+categories[0].name)} className="pic-button-splash">Shop Now</button>
          </div>
        )}

        {/* Right Side - Remaining Two Categories */}
        <div id="pic-portal">
          {categories.slice(1).map((category, index) => (
            <div key={index} className="pic-dream">
              {renderMedia(category)}
              <h3 className="pic-tagline">{category.name}</h3>
              <button onClick={() => router.push("/search?cat="+category.name)} className="pic-button-splash">Shop Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResponsiveVideo;
