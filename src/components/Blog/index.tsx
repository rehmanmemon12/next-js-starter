"use client";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

const Blog = () => {
  const [allBlogData, setAllBlogData] = useState([]);
  const [visibleBlogData, setVisibleBlogData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://dummyapi.online/api/blogposts');
        const data = await response.json();
        setAllBlogData(data);
        setVisibleBlogData(data.slice(0, 6)); // Show initial 6 blogs
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newVisibleCount = visibleCount + 6;
      setVisibleCount(newVisibleCount);
      setVisibleBlogData(allBlogData.slice(0, newVisibleCount));
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {visibleBlogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>

        {visibleCount < allBlogData.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMore}
              className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
