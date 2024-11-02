import { useCallback, useEffect, useMemo, useState } from 'react';
import { ref, onValue, query, orderByKey, limitToLast } from 'firebase/database';
import { database } from '../config/firebase-config'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { PoiMarkers } from "../components/PoiMarkers";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type PositionType = {
  lat: number,
  lng: number
}

const FollowSalbox = () => {
  const [location, setLocation] = useState<PositionType>({
    lat: 20.606959617438918,
    lng: -100.38787695165183
  });

  const pos = useMemo(() => ({
    key: "Salbox",
    location,
  }), [location]);

  useEffect(() => {
    const dataRef = ref(database, 'location/')
    const lastEntryQuery = query(dataRef, orderByKey(), limitToLast(1));

    const unsubscribe = onValue(lastEntryQuery, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const lastKey = Object.keys(data)[0]

        const newPos: PositionType = {
          lat: data[lastKey].latitude,
          lng: data[lastKey].longitude
        }

        if (newPos.lat !== location.lat || newPos.lng !== location.lng) {
          setLocation(newPos);
        }
      }
    });

    return () => unsubscribe();
  }, [])

  // Memoize the map component to avoid reloading
  const MemoizedMap = useCallback(() => (
    <Map
      mapId="b02d85ede98fd2bc"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
      }}
      center={location}
      defaultZoom={14}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      <PoiMarkers pos={pos} />
      <AdvancedMarker key={pos.key} position={pos.location}>
        <Pin
          background={"#FBBC04"}
          glyphColor={"#000"}
          borderColor={"#000"}
        />
      </AdvancedMarker>
    </Map>
  ), [location, pos]);

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
        <APIProvider
          apiKey={GOOGLE_MAPS_API_KEY}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          {MemoizedMap()}
        </APIProvider>
      </div>
    </section>
  );
};

export default FollowSalbox;
