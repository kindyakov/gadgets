import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from '../../../ui/Button';
import { useBoxberryPoints } from '../../../hooks/useBoxberryPoints';
import { useDeliveryStore } from '../../../store/useDeliveryStore';
import { handleDetectLocation } from '../../../utils/handleDetectLocation';
import { useYandexMap } from '../../../contexts/YandexMapContext';
import PickupPointCard from '../../../components/PickupPointCard/PickupPointCard';

const DeliveryBoxberry = ({ onNextStep }) => {
  const [center, setCenter] = useState([37.57, 55.75])
  const [zoom, setZoom] = useState(13)
  const [bounds, setBounds] = useState({});
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const { data } = useBoxberryPoints(bounds);
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

  const handleClickPoint = (pointCode) => {
    const point = points.find(p => p.Code === pointCode);
    if (point) {
      setSelectedPoint(point);
      setCenter(point.GPS.split(',').reverse())
      setZoom(15)
    }
  };

  const onSelectPoint = useCallback((point) => {
    updateData('boxberry', {
      code: point.Code,
      cityCode: point.cityCode,
      city: point.CityName,
      country: point.Country,
      address: point.Address,
      addressReduce: point.AddressReduce,
      coords: point.GPS,
    });
    onNextStep()
  }, [updateData, onNextStep])

  const markers = useMemo(() => points.map((point) => {
    const coords = point.GPS.split(',').reverse()
    return (
      <YMapMarker
        key={point.Code}
        coordinates={coords}
      >
        <div className={`w-5 h-5 bg-white -translate-x-2/4 -translate-y-2/4 rounded-full cursor-pointer flex items-center justify-center text-center outline outline-2  transition-all hover:outline-[#ED1651] ${selectedPoint?.Code === point.Code ? 'scale-110 outline-[#ED1651]' : 'outline-white'}`}
          onClick={() => handleClickPoint(point.Code)}>
          <div className="bg-[#ED1651] w-4 h-4 rounded-full"></div>
        </div>
      </YMapMarker>
    )
  }), [points, selectedPoint]);

  useEffect(() => {
    if (data) {
      setPoints(data)
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateMapBounds();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex justify-between gap-3">
        <Button className='ml-auto' onClick={handleClickLocation}
          style={{ padding: '2px 8px' }}
        >
          <FaMapMarkerAlt />
          <span>Определить мое местоположение</span>
        </Button>
      </div>

      <div className="relative bg-gray/10">
        {!!selectedPoint && <PickupPointCard selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} onSelectPoint={onSelectPoint} />}

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
          {markers}
        </YMap>

      </div>
    </div>
  );
};

export default DeliveryBoxberry;