import {
  Link,
  Outlet,
  UIMatch,
  useLocation,
  useMatches,
} from "react-router-dom";
import { ReactNode } from "react";

interface Crumbs extends UIMatch {
  handle: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crumb: (data: any) => ReactNode;
  };
}

function Breadcrumbs() {
  const matches: Crumbs[] = useMatches() as Crumbs[];
  const crumbs = matches
    .filter((match: Crumbs) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  const links = crumbs.map((_crumb, index) => {
    const url = matches
      .slice(0, index + 1)
      .map((match) => match.pathname)
      .join("")
      .replace("//", "/");
    return url;
  });

  if (crumbs.length === 1) {
    return null;
  }

  return (
    <div>
      <ol className="breadcrumbs">
        {crumbs.map((crumb, index) => {
          const isMoreThanOne = crumbs.length > 1;
          const isFirst = index === 0;
          const isLast = index === crumbs.length - 1;

          const to = links[index];
          const decor = !isLast ? " / " : "";
          const link =
            (isMoreThanOne && !isLast) || (!isMoreThanOne && isFirst) ? (
              <Link to={to}>{crumb}</Link>
            ) : (
              <>{crumb}</>
            );

          return (
            <li key={index}>
              <span>
                {link}
                {decor}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isPostsPage = location.pathname.startsWith("/posts");

  return (
    <>
      <header>
        <h1>Svimanet's Weblog</h1>
        <nav>
          <ul>
            <li>
              <Link className={isHomePage ? "active" : ""} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={isPostsPage ? "active" : ""} to="/posts">
                Posts
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Breadcrumbs />
      <main>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
