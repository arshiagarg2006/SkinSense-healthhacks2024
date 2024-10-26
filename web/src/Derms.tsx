// interface ReccProps {
//   name: string;
//   location: string;
// }

const Recc = () => {
  return (
    <div>
      <iframe
        width="350"
        height="300"
        loading="lazy"
        allowFullScreen
        className="rounded-2xl"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }&q=Space+Needle,Seattle+WA`}
      ></iframe>
    </div>
  );
};

const Derms = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-white">
      <h1>Derms</h1>
      <div>
        <Recc />
      </div>
    </div>
  );
};

export default Derms;
