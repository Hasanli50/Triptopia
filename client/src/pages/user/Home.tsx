/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Col, DatePicker, Form, Row, Skeleton } from "antd";
import firstSectionImage from "../../assets/photo/firstSectionImage.webp";
import style from "../../assets/style/user/home.module.scss";
import { Select } from "antd";
import { Card, Typography } from "antd";
import { Rate } from "antd";
import Accordion from "../../components/user/Accordion";
import { useGetAllToursQuery } from "../../services/tourApi";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import moment from "moment";
import TourCard from "../../components/user/TourCard";

const Home: React.FC = () => {
  const { data: tour, error, isLoading } = useGetAllToursQuery();

  const infoAboutTour = tour?.data;

  // Handle form submission
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    if (values.date) {
      const [start, end] = values.date;
      values.startDate = start.format("YYYY-MM-DD");
      values.endDate = end.format("YYYY-MM-DD");
      delete values.date;
    }

    const queryString = new URLSearchParams(values).toString();
    navigate(`/tours?${queryString}`);
  };

  useEffect(() => {
    if (error) {
      console.error("Error fetching tours:", error);
    }
    if (isLoading) {
      console.log("Loading tours...");
    }
  }, [error, isLoading]);

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
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Row gutter={[16, 0]}>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Destination</span>}
                    name="destination"
                    rules={[
                      {
                        required: true,
                        message: "Please select a destination",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={infoAboutTour?.map((tour) => ({
                        value: tour.location,
                        label: tour.location,
                      }))}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Tour Type</span>}
                    name="tour-type"
                    rules={[
                      {
                        required: true,
                        message: "Please select a travel type",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={infoAboutTour?.map((tour) => ({
                        value: tour?.categoryId?.name,
                        label: tour?.categoryId?.name,
                      }))}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Travelers</span>}
                    name="travelers"
                    rules={[
                      {
                        required: true,
                        message: "Please select number of travellers",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4+", label: "4+" },
                      ]}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Budget</span>}
                    name="budget"
                    rules={[
                      { required: true, message: "Please select a budget" },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={[
                        { value: "under-500", label: "Under $500" },
                        { value: "100", label: "100" },
                        { value: "500-1000", label: "$500 - $1000" },
                        { value: "1000+", label: "$1000+" },
                      ]}
                      placeholder="Select it"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Date</span>}
                    name="date"
                    rules={[
                      { required: true, message: "Please select a date" },
                    ]}
                  >
                    <DatePicker.RangePicker
                      disabledDate={(current) =>
                        current < moment().startOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                  <div className={style.btnBox}>
                    <button className={style.findTour} type="submit">
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
            <Link to={"/tours"}>
              <button className={style.btn}>explore all</button>
            </Link>
          </div>
          <div className={style.places}>
            <Row gutter={[16, 10]}>
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} key={index}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Skeleton.Avatar active shape="circle" size={80} />
                      </div>
                    </Col>
                  ))
                : infoAboutTour
                    ?.slice()
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 4)
                    .map((tour, index) => (
                      <Col key={index} xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Link to={`/tours/${tour.id}`}>
                          <div className={style.imgBox}>
                            <img
                              className={style.img}
                              src={tour.images[0]}
                              alt="travel place"
                            />
                          </div>
                        </Link>
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
            {infoAboutTour?.map((tour, index) => (
              <TourCard key={index} tour={tour} />
            ))}
          </Row>
        </div>
      </section>

      {/* fifth section */}
      <section className={style.opinionOurClient}>
        <div className={style.container}>
          <p className={style.paragraph}>testimonial</p>
          <p className={style.heading}>what our client said about us</p>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card>
                <div className={style.cardTop}>
                  <Avatar
                    className={style.avatar}
                    src="https://images-bonnier.imgix.net/files/wom/production/2023/10/17190747/avatar-2-lead-f7N0YLhfwqdMd1Np56txVg.jpg?auto=format,compress&crop=focalpoint&fp-x=0.5&fp-y=0.5&ar=1.4414414414414414:1&w=922&q=80&fit=crop"
                  />

                  <div>
                    <Typography.Title level={5} className={style.userName}>
                      Vallentina Putri
                    </Typography.Title>
                    <Typography className={style.specialist}>
                      Customer
                    </Typography>
                  </div>
                </div>
                <Rate
                  allowHalf
                  defaultValue={2.5}
                  style={{ fontSize: "14px" }}
                />
                <Typography className={style.sentence}>
                  As a seasoned traveler, I can confidently say that Tourice is
                  one of the best travel agencies I've had the pleasure of
                  working.
                </Typography>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card>
                <div className={style.cardTop}>
                  <Avatar
                    className={style.avatar}
                    src="https://images-bonnier.imgix.net/files/wom/production/2023/10/17190747/avatar-2-lead-f7N0YLhfwqdMd1Np56txVg.jpg?auto=format,compress&crop=focalpoint&fp-x=0.5&fp-y=0.5&ar=1.4414414414414414:1&w=922&q=80&fit=crop"
                  />

                  <div>
                    <Typography.Title level={5} className={style.userName}>
                      Vallentina Putri
                    </Typography.Title>
                    <Typography className={style.specialist}>
                      Customer
                    </Typography>
                  </div>
                </div>
                <Rate
                  allowHalf
                  defaultValue={2.5}
                  style={{ fontSize: "14px" }}
                />
                <Typography className={style.sentence}>
                  As a seasoned traveler, I can confidently say that Tourice is
                  one of the best travel agencies I've had the pleasure of
                  working.
                </Typography>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card>
                <div className={style.cardTop}>
                  <Avatar
                    className={style.avatar}
                    src="https://images-bonnier.imgix.net/files/wom/production/2023/10/17190747/avatar-2-lead-f7N0YLhfwqdMd1Np56txVg.jpg?auto=format,compress&crop=focalpoint&fp-x=0.5&fp-y=0.5&ar=1.4414414414414414:1&w=922&q=80&fit=crop"
                  />

                  <div>
                    <Typography.Title level={5} className={style.userName}>
                      Vallentina Putri
                    </Typography.Title>
                    <Typography className={style.specialist}>
                      Customer
                    </Typography>
                  </div>
                </div>
                <Rate
                  allowHalf
                  defaultValue={2.5}
                  style={{ fontSize: "14px" }}
                />
                <Typography className={style.sentence}>
                  As a seasoned traveler, I can confidently say that Tourice is
                  one of the best travel agencies I've had the pleasure of
                  working.
                </Typography>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* sixth section */}
      <section className={style.featuredDestination}>
        <div className={style.container}>
          <p className={style.paragraph}>faq</p>
          <p className={style.heading}>Unpacking Your Travel Questions</p>

          <Accordion />
        </div>
      </section>
    </main>
  );
};

export default Home;
