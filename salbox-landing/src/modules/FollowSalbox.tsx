import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { PoiMarkers } from "../components/PoiMarkers";

const FollowSalbox = () => {
  const pos = {
    key: "Salbox",
    location: { lat: 20.606959617438918, lng: -100.38787695165183 },
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is missing!");
    return <p>Error: Google Maps API key is not defined.</p>;
  }

  return (
    <section className="pt-6 md:py-14 md:pb-10">
      <h1 className="text-center text-[28px] md:text-[40px] font-bold px-6">
        Sigue a Salbox
      </h1>
      <p className="text-center mt-5 md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base leading-8 md:leading-[35px] mb-8 px-6">
        ¡No pierdas de vista el carrito de Salbox! Sigue la ubicación en tiempo
        real de nuestro vehículo de entregas para saber cuándo llegará tu pedido
        instantáneo a tu puerta.
      </p>
      <div className="mx-auto w-[90%] lg:w-[80%] h-[300px] lg:h-[75vh] mb-8 lg:mb-0 bg-slate-300 rounded-xl">
        <APIProvider apiKey={apiKey}>
          <Map
            mapId="b02d85ede98fd2bc"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
            }}
            defaultCenter={{
              lat: 20.606959617438918,
              lng: -100.38787695165183,
            }}
            defaultZoom={14}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <PoiMarkers pos={pos} />
          </Map>

          <AdvancedMarker key={pos.key} position={pos.location}>
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        </APIProvider>
      </div>
    </section>
  );
};

export default FollowSalbox;
