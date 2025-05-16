/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Rate, Typography } from "antd";
import {
  EnvironmentFilled,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useGetTourRatingQuery } from "../../services/tourApi";
import style from "../../assets/style/user/home.module.scss";
import {
  useAddToWishlistMutation,
  useGetByTokenQuery,
  useRemoveFromWishlistMutation,
} from "../../services/userApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Skeleton } from "antd";

interface ITourCardProps {
  tour: any;
}

const TourCard = ({ tour }: ITourCardProps) => {
  const { data: ratingData, error, isLoading } = useGetTourRatingQuery(tour.id);
  const { data: user } = useGetByTokenQuery();
  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isDeleting }] =
    useRemoveFromWishlistMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading tour rating...", { id: "loading-tour-rating" });
    } else {
      toast.dismiss("loading-tour-rating");
    }

    if (error) {
      toast.error("Failed to fetch tour rating");
    }
  }, [isLoading, error]);

  // Handle adding and removing from wishlist
  const handleAddToWishlist = async (tourId: string) => {
    try {
      await addToWishlist({ id: tourId }).unwrap();
      toast.success("Added to wishlist!");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      console.error("Occurred error: ", err.data?.message);
      toast.error(err?.data?.message || "Failed to add to wishlist");
    }
  };

  const handleRemoveFromWishlist = async (tourId: string) => {
    try {
      await removeFromWishlist({ id: tourId }).unwrap();
      toast.success("Removed from wishlist!");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      console.error("Occurred error: ", err.data?.message);
      toast.error(err?.data?.message || "Failed to remove from wishlist");
    }
  };

  return (
    <>
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index}>
            <Card className={style.card}>
              <div style={{ width: "100%" }}>
                <Skeleton.Image
                  className={style.skeletonImage}
                  style={{
                    height: "180px",
                    display: "inline",
                    marginBottom: "16px",
                    borderRadius: "8px",
                  }}
                  active
                />
              </div>
              <Skeleton
                active
                paragraph={{ rows: 4 }}
                title={false}
                className={style.skeleton}
              />
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            hoverable
            className={style.card}
            styles={{ body: { padding: "0 24px 24px" } }}
            cover={
              <div className={style.imageWrapper}>
                <img
                  alt="Tour image"
                  src={tour.images[0]}
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

                  <Button
                    type="text"
                    icon={
                      user?.data?.favorites?.some((fav) => fav === tour.id) ? (
                        <HeartFilled
                          className={style.heartIcon}
                          style={{ color: "red" }}
                        />
                      ) : (
                        <HeartOutlined className={style.heartIcon} />
                      )
                    }
                    onClick={() => {
                      if (
                        user?.data?.favorites?.some((fav) => fav === tour.id)
                      ) {
                        handleRemoveFromWishlist(tour.id); // Remove from wishlist
                      } else {
                        handleAddToWishlist(tour.id); // Add to wishlist
                      }
                    }}
                    disabled={isAdding || isDeleting}
                  />
                </div>
              </div>
            }
          >
            <Typography.Text className={style.location}>
              <EnvironmentFilled style={{ color: "#fa7335" }} /> {tour.location}
            </Typography.Text>

            <Typography.Title level={5} className={style.title}>
              {tour.title}
            </Typography.Title>

            <div className={style.rate}>
              <Rate
                allowHalf
                disabled
                value={ratingData?.data?.averageRating ?? 0}
                style={{ fontSize: "14px" }}
              />
              <p>
                {ratingData?.data?.rating ?? "0.0"}
                <span>({ratingData?.data?.reviews})</span>
              </p>
            </div>

            <div className={style.booking}>
              <Typography.Text className={style.price}>
                ${tour.price}
                <span className={style.person}>/Person</span>
              </Typography.Text>
              <Button type="primary" className={style.bookBtn}>
                Book Trip
              </Button>
            </div>
          </Card>
        </Col>
      )}
    </>
  );
};

export default TourCard;
