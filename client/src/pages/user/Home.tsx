import { Col, Form, Row } from "antd";
import firstSectionImage from "../../assets/photo/first section - home page.png";
import style from "../../assets/style/user/home.module.scss";
import { Select } from "antd";
import eiffelTower from "../../assets/photo/eiffel-tower.jpg";
import switzerland from "../../assets/photo/switzerland.jpg";
import italy from "../../assets/photo/italy.jpg";
import turkey from "../../assets/photo/turkey.jpg";
import { EnvironmentFilled, HeartOutlined } from "@ant-design/icons";
import { Card, Typography, Button } from "antd";
import { Rate } from "antd";

const Home: React.FC = () => {
  return (
    <main className={style.home}>
      {/* first section */}
      <section className={style.hero}>
        <div className={style.container}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className={style.firstColumn}>
                <p className={style.travellingWithUs}>
                  Start Travelling with us
                </p>
                <h3 className={style.enjoyWithTourice}>
                  Let’s enjoy your desired trip with Tourice
                </h3>
                <p className={style.paragraph}>
                  The traveller where you can select your desired activity and
                  destinations of your choice for vacations.
                </p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className={style.imageBox}>
                <img
                  className={style.secondSectionImage}
                  src={firstSectionImage}
                  alt="first section image"
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* second section */}
      <section className={style.filters}>
        <div className={style.container}>
          <div className={style.box}>
            <Form layout="vertical">
              <Row gutter={[16, 0]}>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Destination</span>}
                    name="destination"
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={[{ value: "istanbul", label: "Istanbul" }]}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Duration</span>}
                    name="duration"
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={[{ value: "day", label: "4 days" }]}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Travel Type</span>}
                    name="travel-type"
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={[{ value: "adventure", label: "dventure" }]}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Travellers</span>}
                    name="travellers"
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={[{ value: "04", label: "04" }]}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Budget</span>}
                    name="budget"
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={[{ value: "04", label: "04" }]}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                  <div className={style.btnBox}>
                    <button className={style.findTour} type="button">
                      find availability
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </section>

      {/* third section */}
      <section className={style.popularDestination}>
        <div className={style.container}>
          <p className={style.paragraph}>popular destination</p>
          <div className={style.box}>
            <p className={style.sentence}>Search a best place in the world</p>
            <button className={style.btn}>explore all</button>
          </div>
          <div className={style.places}>
            <Row gutter={[16, 10]}>
              {[eiffelTower, switzerland, italy, turkey].map((img, index) => (
                <Col key={index} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className={style.imgBox}>
                    <img className={style.img} src={img} alt="travel place" />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>

      {/* fourth section */}
      <section className={style.resetvation}>
        <div className={style.container}>
          <p className={style.paragraph}>reservation</p>
          <p className={style.sentence}>
            Perfect Recommendation For Your Next Trip
          </p>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card
                hoverable
                className={style.card}
                bodyStyle={{ padding: "0 24px 24px" }}
                cover={
                  <div className={style.imageWrapper}>
                    <img
                      alt="Eiffel Tower"
                      src={eiffelTower}
                      className={style.cardImage}
                    />
                    <div className={style.popular}>
                      <Button
                        type="primary"
                        htmlType="button"
                        className={style.popularBtn}
                      >
                        Popular
                      </Button>
                      <HeartOutlined className={style.heartIcon} />
                    </div>
                  </div>
                }
              >
                <Typography.Text className={style.location}>
                  <EnvironmentFilled style={{ color: "#fa7335" }} /> Istanbul,
                  Turkey
                </Typography.Text>

                <Typography.Title level={5} className={style.title}>
                  Colombian Coffee Trails
                </Typography.Title>

                <div className={style.rate}>
                  <Rate
                    allowHalf
                    defaultValue={2.5}
                    style={{ fontSize: "14px" }}
                  />
                  <p>4(35)</p>
                </div>

                <div className={style.booking}>
                  <Typography.Text className={style.price}>
                    $150<span className={style.person}>/Person</span>
                  </Typography.Text>
                  <Button type="primary" className={style.bookBtn}>
                    Book Trip
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  );
};

export default Home;
