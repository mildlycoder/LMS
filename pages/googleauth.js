import React, { useEffect } from "react";
import { useRouter } from "next/router";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { handleLogin } from "@/utils/auth";
import toast from "react-hot-toast";

const Googleauth = () => {
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${baseUrl}/api/users/googleauth?code=${code}`;
      axios
        .post(url)
        .then((response) => {
          handleLogin(response.data.edmy_users_token, router).then(() => {
            toast.success(response.data.message, {
              style: {
                border: "1px solid #4BB543",
                padding: "16px",
                color: "#4BB543",
              },
              iconTheme: {
                primary: "#4BB543",
                secondary: "#FFFAEE",
              },
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [code]);

  return <div>googleauth</div>;
};

export default Googleauth;
