import { useEffect, useState, useRef } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import BaseModal from "../BaseModal";
// import YMap from '../../YMaps/YMaps';
import { useModalStore } from "../../../store/useModalStore";
import { handleDetectLocation } from '../../../utils/handleDetectLocation';
import { getAddressByCoords } from '../../../utils/getAddressByCoords';
import { useYandexMap } from '../../../contexts/YandexMapContext';
import FormAddress from './FormAddress';

const ModalMap = () => {
  const { closeModal, getModal } = useModalStore();
  const modal = getModal('modalMap');
  const [coords, setCoords] = useState([55.75, 37.57]);
  const [zoom, setZoom] = useState(17)
  const [addressObj, setAddressObj] = useState({
    city: "",
    street: "",
    house: "",
    entrance: "",
    floor: "",
    apartment: ""
  });
  const { YMap, YMapDefaultSchemeLayer, YMapListener, YMapDefaultFeaturesLayer, YMapMarker } = useYandexMap()

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const userCoords = await handleDetectLocation();
        setCoords(userCoords);
        const userAddress = await getAddressByCoords(userCoords);
        setAddressObj(userAddress);
      } catch (error) {
        console.error('Ошибка при получении геолокации:', error);
      }
    };

    if (modal?.isOpen) {
      fetchLocation();
    }
  }, [modal?.isOpen]);

  const handleMapDrag = async () => {
    if (mapRef.current) {
      const center = mapRef.current.center
      const addr = await getAddressByCoords(center);

      setAddressObj(addr);
      setZoom(mapRef.current.zoom)
      setCoords(center);
    }
  };

  return (
    <BaseModal
      title='Карта'
      isOpen={modal?.isOpen}
      onRequestClose={() => closeModal('modalMap')}
      width='1000px'
    >
      <div className="flex gap-3">
        <FormAddress addressObj={addressObj} />

        <div className="w-4/6 h-[500px] relative">
          {!!YMap &&
            <YMap
              className="w-full h-full "
              location={{
                center: coords, zoom,
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
              <YMapListener onActionEnd={handleMapDrag} />
              <FaMapMarkerAlt className='z-10 text-3xl  absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-full' style={{ fill: '#ff4d4d' }} />
            </YMap>
          }
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalMap;
