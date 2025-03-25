import style from "../assets/style/footer.module.scss";
import logo from "../assets/photo/logo-light.png";
import galleryImg1 from "../assets/photo/gallery-img-1.png";
import galleryImg2 from "../assets/photo/gallery-img-2.png";
import galleryImg3 from "../assets/photo/gallery-img-3.png";
import galleryImg4 from "../assets/photo/gallery-img-4.png";
import galleryImg5 from "../assets/photo/gallery-img-5.png";
import galleryImg6 from "../assets/photo/gallery-img-6.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <section className={style.footer}>
        <div className={style.footer__box}>
          <div className={style.footer__box__first}>
            <div className={style.imgBox}>
              <img src={logo} alt="logo" className={style.image} />
            </div>
            <p className={style.sentence}>
              Hello, we are Lift Media. Our goal is to translate the positive
              effects from revolutionizing
            </p>
            <div className={style.iconsBox}>
              <div className={style.iconsBox__iconBox}>
                <FacebookOutlinedIcon
                  style={{ fontSize: "16px" }}
                  className={style.iconsBox__iconBox__icon}
                />
              </div>
              <div className={style.iconsBox__iconBox}>
                <PinterestIcon
                  style={{ fontSize: "16px" }}
                  className={style.iconsBox__iconBox__icon}
                />
              </div>
              <div className={style.iconsBox__iconBox}>
                <InstagramIcon
                  style={{ fontSize: "16px" }}
                  className={style.iconsBox__iconBox__icon}
                />
              </div>
              <div className={style.iconsBox__iconBox}>
                <TwitterIcon
                  style={{ fontSize: "16px" }}
                  className={style.iconsBox__iconBox__icon}
                />
              </div>
            </div>
          </div>

          <ul className={style.list}>
            <li className={style.heading}>About</li>
            <Link to={"/about-us"} className={style.link}>
              <li className={style.item}>About Us</li>
            </Link>
            <Link to={"/our-services"} className={style.link}>
              <li className={style.item}>Our Services</li>
            </Link>
            <Link to={"/privacy-policy"} className={style.link}>
              <li className={style.item}>Privasy Policy</li>
            </Link>
            <Link to={"/terms-conditions"} className={style.link}>
              <li className={style.item}>Terms & Conditions</li>
            </Link>
          </ul>

          <ul className={style.list}>
            <li className={style.heading}>Contact</li>
            <li className={style.item}>
              <CallIcon style={{ fontSize: "18px" }} /> +994 70 530 59 39
            </li>
            <li className={style.item}>
              {" "}
              <EmailIcon style={{ fontSize: "18px" }} /> triptopia@gmail.com
            </li>
            <li className={style.item}>
              {" "}
              <LocationOnIcon style={{ fontSize: "18px" }} /> Hacilar street,
              Lenkoran, Azerbaijan
            </li>
          </ul>

          <ul className={style.list}>
            <li className={style.heading}>Gallery</li>
            <li className={style.item}>
              <img src={galleryImg1} alt="gallery image" />
              <img src={galleryImg2} alt="gallery image" />
              <img src={galleryImg3} alt="gallery image" />
            </li>
            <li className={style.item}>
              <img src={galleryImg4} alt="gallery image" />
              <img src={galleryImg5} alt="gallery image" />
              <img src={galleryImg6} alt="gallery image" />
            </li>
          </ul>
        </div>
        <hr className={style.hr} />
        <p className={style.footerSentence}>
          &#169; 2024 <span style={{ color: "#faa935" }}>Triptopia</span>. All
          rights reserved
        </p>
      </section>
    </>
  );
};

export default Footer;
