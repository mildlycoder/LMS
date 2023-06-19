import Cookies from "js-cookie";
import Router from "next/router";

export const handleLogin = async (t, routeNext) => {
  try {
    const expirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    ); // set the expiration to 7 days from now
    const response = Cookies.set("edmy_users_token", t, {
      path: "/",
      sameSite: "None",
      secure: true,
      expires: expirationDate,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }

  if (routeNext.query && routeNext.query.next) {
    Router.push(routeNext.query.next);
  } else {
    Router.push("/");
  }
};

export const handleLogout = () => {
  Cookies.remove("edmy_users_token");
  Router.push("/");
};

export const destroyCookie = () => {
  Cookies.remove("edmy_users_token");
  Router.reload("/");
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push({ pathname: location, query: { next: ctx.pathname } });
  }
};

export const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
