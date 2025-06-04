import { useEffect, useState, useRef } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import { FaMapMarkerAlt } from "react-icons/fa";
import BaseModal from "../BaseModal";
// import YMap from '../../YMaps/YMaps';
import { useModalStore } from "../../../store/useModalStore";
import { handleDetectLocation } from '../../../utils/handleDetectLocation';
import { getAddressByCoords } from '../../../utils/getAddressByCoords';
import FormAddress from './FormAddress';

const ModalMap = () => {
  const { closeModal, getModal } = useModalStore();
  const modal = getModal('modalMap');
  const [coords, setCoords] = useState([55.75, 37.57]); // Начальные координаты
  const [addressObj, setAddressObj] = useState({
    city: "",
    street: "",
    house: "",
    entrance: "",
    floor: "",
    apartment: ""
  });

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
      const center = mapRef.current.getCenter();
      setCoords(center);
      const addr = await getAddressByCoords(center);
      setAddressObj(addr);
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
        <YMaps query={{ apikey: '1da2559e-0f82-411d-8aec-3d542b2d01f7' }}>
          <div className='w-4/6 h-[500px]'>
            <Map
              defaultState={{ center: coords, zoom: 17 }}
              className='w-full h-full relative'
              width='100%'
              height='100%'
              instanceRef={mapRef}
              onBoundsChange={handleMapDrag}
            >
              {/* <Placemark geometry={coords} options={{ preset: 'islands#redIcon' }} /> */}
              <GeolocationControl options={{ float: "left" }} />
              <FaMapMarkerAlt className='z-10 absolute top-2/4 left-2/4 text-3xl -translate-x-2/4 -translate-y-full' style={{ fill: '#ff4d4d' }} />
            </Map>
          </div>
        </YMaps>
      </div>
    </BaseModal>
  );
};

export default ModalMap;
