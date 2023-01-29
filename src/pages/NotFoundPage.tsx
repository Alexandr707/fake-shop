import { Link } from "react-router-dom";
import { Header } from "../components";
import st from "./NotFoundPage.module.scss";

function NotFoundPage() {
  return (
    <>
      <Header />
      <div className={st.notFound}>
        <h1>Page not found</h1>
        <Link to="/">Back to main page</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
