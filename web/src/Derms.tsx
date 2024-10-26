import { IoLocationSharp as LocationIcon } from "react-icons/io5";
import { FaPhoneAlt as PhoneIcon } from "react-icons/fa";
import { FaStar as StarIcon } from "react-icons/fa";

interface ReccProps {
  name: string;
  q: string;
  color: string;
  address: string;
  phone: string;
  rating: number;
}

const Recc: React.FC<ReccProps> = ({
  name,
  q,
  color,
  address,
  phone,
  rating,
}) => {
  return (
    <div className={`bg-${color}-500 rounded-xl font-semibold text-2xl m-5`}>
      <div className="mx-12 mt-5">{name}</div>
      <div className="flex justify-center">
        <iframe
          width="350"
          height="300"
          loading="lazy"
          allowFullScreen
          className={`rounded-2xl outline-none drop-shadow-xl m-10 mt-5`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          }&q=${q}`}
        ></iframe>
      </div>
      <div className="mx-10 flex">
        <LocationIcon />
        <div className="mb-5">
          {address.length > 30 ? `${address.substring(0, 30)}...` : address}
        </div>
      </div>
      <div className="mx-10 flex">
        <PhoneIcon />
        <div className="mx-10 mb-5">{phone}</div>
      </div>
      <div className="mx-10 flex">
        <StarIcon />
        <div className="mx-10 mb-5">{rating}</div>
      </div>
    </div>
  );
};

const Derms = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-white">
      <div className="text-4xl text-bold">
        Reccomended dermatologists near you
      </div>
      <div className="flex">
        <Recc
          name={"Brian Katz, MD"}
          q={"Brian+Katz,+MD"}
          color="cyan"
          address="85 Raritan Ave, Highland Park, NJ 08904"
          phone="+17322461028"
          rating={2.8}
        />
        <Recc
          name={"Certified Dermatology"}
          q={"Certified+Dermatology"}
          color="orange"
          address="85 Raritan Ave, Highland Park, NJ 08904"
          phone="+17324567777"
          rating={3.7}
        />
        <Recc
          name={"Bahar Dasgeb, MD"}
          q={"Bahar+Dasgeb,+MD"}
          color="lime"
          address="195 Little Albany St, New Brunswick, NJ 08901"
          phone="+17322352465"
          rating={2.3}
        />
      </div>
    </div>
  );
};

export default Derms;
