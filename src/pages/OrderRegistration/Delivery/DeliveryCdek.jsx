import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDeliveryStore } from '../../../store/useDeliveryStore';
import { handleDetectLocation } from '../../../utils/handleDetectLocation';
import { useYandexMap } from '../../../contexts/YandexMapContext';
import Button from '../../../ui/Button';

const DeliveryCdek = ({ onNextStep }) => {
  const [center, setCenter] = useState([37.57, 55.75])
  const [zoom, setZoom] = useState(13)
  const [bounds, setBounds] = useState({});
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const updateData = useDeliveryStore(state => state.updateData);
  const mapRef = useRef(null);
  const { YMap, YMapDefaultSchemeLayer, YMapListener, YMapDefaultFeaturesLayer, YMapMarker } = useYandexMap()

  const updateMapBounds = (e) => {
    if (e?.location) {
      setCenter(e.location.center)
      setZoom(e.location.zoom)
    }

    if (mapRef.current) {
      const mapBounds = mapRef.current.bounds;

      if (mapBounds) {
        const [[south, east], [north, west]] = mapBounds;
        setBounds({ south, west, north, east });
      }
    }
  }

  const handleClickLocation = async () => {
    try {
      const center = await handleDetectLocation();
      if (center) {
        setCenter(center)
        setZoom(15)
        setTimeout(() => updateMapBounds(), 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateMapBounds();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-2">
      <Button className='ml-auto' onClick={handleClickLocation}
        style={{ padding: '2px 8px' }}
      >
        <FaMapMarkerAlt />
        <span>Определить мое местоположение</span>
      </Button>

      <div className="relative bg-gray/10">
        <YMap
          className="w-full h-[550px]"
          location={{
            center, zoom,
            duration: 300,
            easing: 'ease-in-out'
          }}
          showScaleInCopyrights={true}
          ref={mapRef}
          mode="vector"
          behaviors={['drag', 'scrollZoom']}
        >
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <YMapListener onActionEnd={updateMapBounds} />
        </YMap>
      </div>
    </div>
  )
}

export default DeliveryCdek