import React from "react";
import style from "../assets/style/privacy-policy.module.scss";

const Privacy_Policy: React.FC = () => {
  return (
    <>
      <section className={style.privacyPolicy}>
        <p className={style.heading}>privacy policy</p>
        <p className={style.update}>
          Last Updated: <span style={{ fontStyle: "italic" }}>03/25/20025</span>
        </p>
        <p className={style.sentence}>
          At{" "}
          <span style={{ color: "#faa935", cursor: "pointer" }}>Triptopia</span>
          , your privacy is important to us. This Privacy Policy outlines the
          types of personal information we collect, how we use it, and the steps
          we take to protect your information. By using our app, you agree to
          the terms outlined in this policy.
        </p>

        <ol className={style.orderList}>
          <li className={style.itemHead}>
            <span className={style.describe}>Information We Collect</span> We
            collect information when you use our app, create an account, make
            bookings, or interact with other services. This includes:
            <ul className={style.unorderList}>
              <li className={style.item}>
                <span className={style.describe}>Personal Information:</span>{" "}
                Name, email address, phone number, payment details, and other
                contact details.
              </li>
              <li className={style.item}>
                <span className={style.describe}>Location Data:</span> GPS data
                and travel-related data to enhance your experience and provide
                location-based services.
              </li>
              <li className={style.item}>
                <span className={style.describe}>Usage Information:</span>{" "}
                Information about how you use the app, your interactions with
                our services, and device information (e.g., device type,
                operating system).
              </li>
            </ul>
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>How We Use Your Information</span>{" "}
            We use your information for the following purposes:
            <ul className={style.unorderList}>
              <li className={style.item}>
                To provide and improve the app’s functionality and services.
              </li>
              <li className={style.item}>
                To communicate with you regarding your bookings, transactions,
                and account activity.
              </li>
              <li className={style.item}>
                To personalize content and offers based on your preferences and
                usage.
              </li>
              <li className={style.item}>
                To send marketing communications, promotions, and updates (with
                your consent).
              </li>
              <li className={style.item}>
                To process payments and facilitate transactions securely.
              </li>
              <li className={style.item}>
                To monitor and improve app performance and security.
              </li>
            </ul>
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Data Sharing</span> We may share
            your personal information with third parties for the following
            purposes:
            <ul className={style.unorderList}>
              <li className={style.item}>
                <span className={style.describe}>Service Providers:</span>{" "}
                Third-party companies that assist us in delivering services
                (e.g., payment processors, analytics providers).
              </li>
              <li className={style.item}>
                <span className={style.describe}>Legal Requirements:</span> When
                required by law or to protect the rights, safety, and security
                of{" "}
                <span style={{ color: "#faa935", cursor: "pointer" }}>
                  Triptopia
                </span>
                , our users, or others.
              </li>
              <li className={style.item}>
                <span className={style.describe}>Business Transfers:</span>In
                the event of a merger, acquisition, or sale of company assets,
                your information may be transferred. operating system).
              </li>
            </ul>
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Data Security</span> We implement
            industry-standard security measures to protect your personal
            information, including encryption and secure data storage. However,
            no method of data transmission or storage is 100% secure, and we
            cannot guarantee the absolute security of your data.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Your Rights</span> You have the
            right to:
            <ul className={style.unorderList}>
              <li className={style.item}>
                Access, update, or delete your personal information.
              </li>
              <li className={style.item}>
                Opt-out of marketing communications.
              </li>
              <li className={style.item}>
                Withdraw consent for data processing, subject to applicable
                laws. To exercise these rights, please contact us at{" "}
                <span style={{ color: "#faa935", cursor: "pointer" }}>
                  triptopia@gmail.com
                </span>
                .
              </li>
            </ul>
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Children's Privacy</span> Our app
            is not intended for children under the age of 13. We do not
            knowingly collect personal information from children. If we become
            aware that a child has provided us with personal information, we
            will take steps to delete such data.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>
              Changes to This Privacy Policy
            </span>{" "}
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, with the updated date indicated at the
            top.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Contact Us</span> If you have any
            questions or concerns about our Privacy Policy, please contact us at{" "}
            <span style={{ color: "#faa935", cursor: "pointer" }}>
              triptopia@gmail.com
            </span>
            .
          </li>
        </ol>
      </section>
    </>
  );
};

export default Privacy_Policy;
