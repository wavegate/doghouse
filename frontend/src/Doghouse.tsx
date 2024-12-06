import { SlCheckbox } from "@shoelace-style/shoelace/dist/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Carousel from "./components/Carousel/Carousel";

const fetchDoghouseDetails = async (id: string) => {
  const response = await fetch(
    `http://localhost:8080/doghouses/${encodeURIComponent(id)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch doghouse details");
  }
  return response.json();
};

const Doghouse = () => {
  const { id } = useParams();
  const doghouseId = id!;

  const { data } = useQuery({
    queryKey: ["doghouse", doghouseId],
    queryFn: () => fetchDoghouseDetails(doghouseId),
  });

  return (
    <div className={`flex flex-col items-center`}>
      <div
        className={`flex flex-col max-w-[1176px] max-sm:max-w-[100dvw] max-sm:px-[16px] gap-[84px]`}
      >
        <div>{data?.Name}'s Doghouse</div>
        <Carousel />
        <div>
          <div>Food & Poop</div>
          <div>
            <img
              className={`aspect-square h-[64px]`}
              src="https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/DALL%C2%B7E%202024-12-06%2006.52.41%20-%20A%20fun%20and%20lighthearted%20cartoon-style%20poop%20emoji%20icon%20with%20a%20soft%2C%20swirled%20design%2C%20glossy%20brown%20texture%2C%20big%20expressive%20eyes%2C%20a%20cheerful%20smile%2C%20and%20ros.webp"
            />
            <SlCheckbox>Morning pooped</SlCheckbox>
            <SlCheckbox>Evening pooped</SlCheckbox>
            <img
              className={`aspect-square h-[64px]`}
              src="https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/DALL%C2%B7E%202024-12-06%2006.52.54%20-%20A%20fun%20and%20lighthearted%20cartoon-style%20fried%20chicken%20drumstick%20emoji%20icon%20with%20a%20crispy%20golden-brown%20texture%2C%20smooth%20lines%2C%20and%20a%20clean%20design.%20The%20drum.webp"
            />
            <SlCheckbox>Morning fed</SlCheckbox>
            <SlCheckbox>Evening fed</SlCheckbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doghouse;
