import { Link } from "react-router";
import notFound from "../../assets/photo/404-not-found.gif";
import style from "../../assets/style/not-found.module.scss";

const NotFound: React.FC = () => {
  return (
    <>
      <section className={style.notFound}>
        <div className={style.imgBox}>
          <img className={style.img} src={notFound} alt="not-found" />
        </div>
        <Link to={"/"}>
          <button className={style.backHome}>back home</button>
        </Link>
      </section>
    </>
  );
};

export default NotFound;
