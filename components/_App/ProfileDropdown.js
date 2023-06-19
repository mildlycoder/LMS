import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "@/utils/ActiveLink";
import { handleLogout } from "@/utils/auth";

const ProfileDropdown = ({
  userId,
  first_name,
  email,
  role,
  profile_photo,
}) => {
  const [isMouse, toggleMouse] = useState(false);
  const toggleMouseMenu = () => {
    toggleMouse(!isMouse);
  };

  const isAdmin = role === "admin";
  const isInstructor = role === "instructor";

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3,
        // delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  console.log(profile_photo);
  return (
    <motion.div
      className="dropdown profile-dropdown"
      onMouseEnter={toggleMouseMenu}
      onMouseLeave={toggleMouseMenu}
    >
      <div className="img ptb-15">
        {profile_photo ? (
          <img src={profile_photo} alt={first_name} />
        ) : (
          <img src="/images/admin/admin-9.jpg" alt={first_name} />
        )}
      </div>
      <motion.ul
        className="dropdown-menu"
        initial="exit"
        animate={isMouse ? "enter" : "exit"}
        variants={subMenuAnimate}
      >
        <li>
          <Link href="/profile/basic-information/">
            <a className="dropdown-item author-dropdown-item">
              <div className="d-flex align-items-center">
                <div className="img">
                  {profile_photo ? (
                    <img src={profile_photo} alt={first_name} />
                  ) : (
                    <img src="/images/admin/admin-9.jpg" alt={first_name} />
                  )}
                </div>

                <span className="ps-3">
                  <span className="fw-semibold fs-16 mb-1 d-block">
                    {first_name}
                  </span>
                  <span className="d-block fs-13 mt-minus-2">{email}</span>
                </span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        {isInstructor && (
          <>
            <li>
              <Link href="/instructor/courses">
                <a className="dropdown-item">
                  <i className="bx bx-book"></i>
                  My Courses
                </a>
              </Link>
            </li>
            <li>
              <Link href="/instructor/course/create">
                <a className="dropdown-item">
                  <i className="bx bx-folder-plus"></i> Create New Course
                </a>
              </Link>
            </li>
          </>
        )}
        {isAdmin && (
          <li>
            <Link href="/admin">
              <a className="dropdown-item">
                <i className="bx bxs-dashboard"></i> My Dashboard
              </a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/learning/my-courses/">
            <a className="dropdown-item">
              <i className="bx bx-book"></i>
              My learning
            </a>
          </Link>
        </li>
        <li>
          <Link href="/learning/my-purchase-history/">
            <a className="dropdown-item">
              <i className="bx bx-credit-card-front"></i>
              My Purchases
            </a>
          </Link>
        </li>
        <li>
          <Link href="/learning/wishlist/">
            <a className="dropdown-item">
              <i className="bx bxs-heart"></i>
              Wishlist
            </a>
          </Link>
        </li>

        <li>
          <Link href="/profile/basic-information/">
            <a className="dropdown-item">
              <i className="bx bxs-user-account"></i> Account settings
            </a>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            type="submit"
            onClick={handleLogout}
            className="dropdown-item"
          >
            <i className="bx bx-log-out"></i> Log out
          </button>
        </li>
      </motion.ul>
    </motion.div>
  );
};

export default ProfileDropdown;
