import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import CourseSkeletonLoader from "@/utils/CourseSkeletonLoader";
import baseUrl from "@/utils/baseUrl";
import CourseCard from "./CourseCard";

const CoursesList = ({ courses, user }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (courseCart) => {
    let courseObj = {};
    courseObj["id"] = courseCart.id;
    courseObj["title"] = courseCart.title;
    courseObj["slug"] = courseCart.slug;
    courseObj["price"] = courseCart.latest_price;
    courseObj["regular_price"] = courseCart.before_price;
    courseObj["image"] = courseCart.image;
    courseObj["lessons"] = courseCart.lessons;
    courseObj["duration"] = courseCart.duration;
    courseObj["access_time"] = courseCart.access_time;
    courseObj["quantity"] = 1;
    courseObj[
      "instructor"
    ] = `${courseCart.user.first_name} ${courseCart.user.last_name}`;
    dispatch({
      type: "ADD_TO_CART",
      data: courseObj,
    });
  };

  const handleFav = async (courseId, fav) => {
    if (!user) {
      toast.error("Need to login first.", {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    try {
      const payload = {
        userId: user.id,
        courseId: courseId,
        fav: fav,
      };
      const url = `${baseUrl}/api/favourites/new`;
      const response = await axios.post(url, payload);

      toast.success(response.data.message, {
        style: {
          border: "1px solid #42ba96",
          padding: "16px",
          color: "#42ba96",
        },
        iconTheme: {
          primary: "#42ba96",
          secondary: "#ffffff",
        },
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="row justify-content-center">
      {loading ? (
        <CourseSkeletonLoader />
      ) : (
        <>
          {courses?.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onFav={() => handleFav(course.id, true)}
                onUnFav={() => handleFav(course.id, false)}
                userId={user && user.id}
                onAddCart={() => addToCart(course)}
              />
            ))
          ) : (
            <h3>Empty</h3>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesList;
