import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const CourseCard = ({ course, onFav, onUnFav, userId, onAddCart }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();
  const {
    id,
    title,
    slug,
    short_desc,
    latest_price,
    before_price,
    lessons,
    image,
    user,
    enrollments = [],
  } = course;
  const [fav, setfavs] = useState(false);
  const [add, setAdd] = useState(false);
  const [buy, setBuy] = useState(false);

  useEffect(() => {
    setAdd(cartItems.some((cart) => cart.id === id));
    if (userId && course && id) {
      const payload = {
        params: { userId: userId, courseId: id },
      };
      const url = `${baseUrl}/api/courses/course/exist`;
      axios.get(url, payload).then((result) => {
        if (result && result.data.enroll === true) setBuy(result.data.enroll);
      });
    }
  }, [course, cartItems]);

  useEffect(() => {
    if (userId) {
      const payload = {
        params: {
          userId: userId,
          courseId: id,
        },
      };

      const url = `${baseUrl}/api/favourites/new`;
      axios.get(url, payload).then((result) => {
        setfavs(result.data);
      });
    } else {
      setfavs(false);
    }
  }, [fav]);

  return (
    <div className="col-lg-3 col-md-6">
      <div className="single-courses">
        <div className="courses-main-img">
          <img
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${image}`}
            alt="Course"
          />
        </div>
        <div className="courses-content">
          <h3>{title}</h3>
          <ul className="admin">
            <li>
              <img
                src={
                  user.profile_photo
                    ? user.profile_photo
                    : "/images/admin-1.jpg"
                }
                className="rounded-circle"
                alt={user.first_name}
                style={{ height: "25px", width: "25px" }}
              />
            </li>
            <li>
              <span>By</span>
            </li>
            <li>{`${user.first_name} ${user.last_name}`}</li>
          </ul>
          <h4>
            {before_price > 0 && <del>${before_price}</del>} ${latest_price}
          </h4>
        </div>

        <div className="courses-hover-content">
          <div className="sk">
            <div>
              <h3>
                <Link href={`/course/${slug}`}>
                  <a>{title}</a>
                </Link>
              </h3>
              {short_desc ? <p>{short_desc.slice(0, 108)}</p> : ""}

              <div className="courses-btn d-flex justify-content-between align-items-center">
                {buy ? (
                  <button
                    className="default-btn"
                    onClick={() => router.push(`/learning/course/${slug}`)}
                  >
                    View My Course
                  </button>
                ) : (
                  <>
                    {add ? (
                      <button
                        className="default-btn"
                        onClick={() => router.push("/checkout")}
                      >
                        View Cart
                      </button>
                    ) : (
                      <button
                        className="default-btn"
                        onClick={() => onAddCart(course)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </>
                )}
                {fav ? (
                  <motion.button
                    whileTap={{ scale: 3 }}
                    transition={{ duration: 0.5 }}
                    className="default-btn wish"
                    onClick={() => {
                      onUnFav(id);
                      setfavs(!fav);
                    }}
                  >
                    <i className="ri-heart-fill"></i>
                    <i className="ri-heart-fill hover"></i>
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 3 }}
                    transition={{ duration: 0.5 }}
                    className="default-btn wish"
                    onClick={() => {
                      onFav(id);
                      setfavs(!fav);
                    }}
                  >
                    <i className="ri-heart-line"></i>
                    <i className="ri-heart-fill hover"></i>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
