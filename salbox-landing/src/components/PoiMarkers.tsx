import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export const PoiMarkers = (props: { pos: any }) => {
  return (
    <>
      <AdvancedMarker key={props.pos.key} position={props.pos.location}>
        <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>
    </>
  );
};
