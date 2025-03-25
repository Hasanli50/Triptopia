import style from "../assets/style/terms-conditions.module.scss";

const Terms_Conditions = () => {
  return (
    <>
      <section className={style.termsConditions}>
        <p className={style.heading}>terms & conditions</p>
        <p className={style.update}>
          Last Updated: <span style={{ fontStyle: "italic" }}>03/25/20025</span>
        </p>
        <p className={style.sentence}>
          By using the{" "}
          <span style={{ color: "#faa935", cursor: "pointer" }}>Triptopia</span>{" "}
          mobile application (the "App") or any of its services, you agree to
          comply with the following Terms & Conditions. If you do not agree with
          these terms, please do not use the App.
        </p>

        <ol className={style.orderList}>
          <li className={style.itemHead}>
            <span className={style.describe}>Use of the App</span> You must be
            at least [age] years old to use the App. By using the App, you
            represent and warrant that you meet the eligibility requirements.
            You agree to use the App only for lawful purposes and in accordance
            with the guidelines provided.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Account Creation</span> To access
            certain features of the App, you may be required to create an
            account. You agree to provide accurate, current, and complete
            information during registration and to update it as necessary. You
            are responsible for maintaining the confidentiality of your account
            credentials and for all activities under your account.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Booking and Payments</span> The App
            allows you to book trips, accommodations, and other services. All
            transactions are subject to availability and our terms for specific
            bookings. Payment for services is processed through secure
            third-party payment providers. You agree to pay all applicable fees
            associated with your bookings.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>User Content</span> You may have
            the ability to upload, submit, or share content within the App
            (e.g., reviews, photos, comments). By doing so, you grant [App Name]
            a non-exclusive, royalty-free, transferable license to use, display,
            and distribute such content. You agree not to upload or share
            content that is offensive, unlawful, or violates the rights of
            others.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Restrictions</span> You agree not
            to:
            <ul className={style.unorderList}>
              <li className={style.item}>
                Use the App in a way that could damage, disable, or impair its
                functionality.
              </li>
              <li className={style.item}>
                Attempt to gain unauthorized access to any portion of the App or
                its systems.
              </li>
              <li className={style.item}>
                Engage in any conduct that violates local, state, or
                international laws.
              </li>
              <li className={style.item}>
                Use the App for commercial purposes without prior written
                consent.
              </li>
            </ul>
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Termination</span> We may suspend
            or terminate your access to the App at any time if we believe you
            have violated these Terms & Conditions. You may also terminate your
            account by contacting us.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>Disclaimers</span> The App and all
            content, products, and services provided through it are offered on
            an "as is" and "as available" basis.{" "}
            <span style={{ color: "#faa935", cursor: "pointer" }}>
              Triptopia
            </span>{" "}
            makes no warranties, express or implied, regarding the
            functionality, reliability, or accuracy of the App. We are not
            responsible for any damages arising from your use of the App.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}>
              {" "}
              Limitation of Liability Limitation of Liability
            </span>{" "}
            To the maximum extent permitted by law, [App Name] will not be
            liable for any indirect, incidental, special, or consequential
            damages, including lost profits, arising out of your use or
            inability to use the App.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}> Indemnification</span> You agree
            to indemnify and hold harmless{" "}
            <span style={{ color: "#faa935", cursor: "pointer" }}>
              Triptopia
            </span>
            , its affiliates, and their respective employees, directors, and
            agents from any claims, losses, or damages, including legal fees,
            arising out of your use of the App or any breach of these Terms &
            Conditions.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}> Changes to Terms</span> We may
            update these Terms & Conditions at any time. Any changes will be
            posted on this page, with the updated date indicated at the top.
          </li>

          <li className={style.itemHead}>
            <span className={style.describe}> Contact Us</span> If you have any
            questions about these Terms & Conditions, please contact us at{" "}
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

export default Terms_Conditions;
