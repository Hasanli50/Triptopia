import { useLocation } from "react-router";
import { useGetTourByValuesQuery } from "../../api/slice/tourApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SelectedTour: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const travelers = searchParams.get("travelers");
  const budget = searchParams.get("budget");
  const tourType = searchParams.get("tour-type");

  const {
    data: tours,
    error,
    isLoading,
  } = useGetTourByValuesQuery({
    destination: destination || "",
    startDate: startDate || "",
    endDate: endDate || "",
    travelers: travelers || "",
    budget: budget || "",
    tourType: tourType || "",
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch tours");
      console.error("Error fetching tours:", error);
    }
    if (isLoading) {
      toast.loading("Loading tours...", { id: "loading-tours" });
    }
  });

  console.log("Tours Data:", tours);
  console.log("Selected Tour Params:", {
    destination,
    startDate,
    endDate,
    travelers,
    budget,
    tourType,
  });

  return <div>SelectedTour</div>;
};

export default SelectedTour;
