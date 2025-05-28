import { useState, useEffect, useCallback } from 'react';
import 'react-dadata/dist/react-dadata.css';

import DeliveryDoor from './DeliveryDoor';
import DeliveryCdek from './DeliveryCdek';
import DeliveryBoxberry from './DeliveryBoxberry'

const Delivery = ({ order, setDeliveryDataMap, deliveryDataMap }) => {
  const [deliveryType, setDeliveryType] = useState('door');

  const handleDeliveryData = useCallback(data => {
    if (JSON.stringify(deliveryDataMap[deliveryType]) !== JSON.stringify(data)) {
      setDeliveryDataMap(prev => ({ ...prev, [deliveryType]: data }))
    }
  }, [deliveryDataMap, deliveryType, setDeliveryDataMap]);

  const TabComponent = ({ type, text, }) => {
    return (
      <button className={`p-3 rounded-lg border transition-colors flex items-center gap-2 group hover:border-red-light cursor-pointer ${deliveryType === type ? 'border-red-light' : 'border-[#e0e0e0]'}`} onClick={() => setDeliveryType(type)}>
        <div className={`w-6 h-6 flex-shrink-0 rounded-full border transition-colors flex items-center justify-center p-[3px] ${deliveryType === type ? 'border-red-light' : 'border-[#e0e0e0]'}`}>
          <span className={`rounded-full w-full h-full bg-red-light transition-all ${deliveryType === type ? 'scale-100' : 'scale-0'}`}></span>
        </div>
        <p className='text-sm'>{text}</p>
      </button>
    )
  }

  const delivers = {
    door: (props) => <DeliveryDoor {...props} defaultValues={{ ...order.delivery.address, ...deliveryDataMap.door }} />,
    cdek: (props) => <DeliveryCdek {...props} />,
    boxberry: (props) => <DeliveryBoxberry {...props} />
  }

  const DeliveryComponent = delivers[deliveryType]

  useEffect(() => {
    console.log(deliveryDataMap);
  }, [deliveryDataMap])

  return (
    <>
      <div className="flex gap-4 mt-4">
        <TabComponent text='Доставка до двери' type='door' />
        <TabComponent text='Пункт выдачи (CDEK)' type='cdek' />
        <TabComponent text='Пункт выдачи (Boxberry)' type='boxberry' />
      </div>

      <DeliveryComponent setDeliveryData={handleDeliveryData} />
    </>
  );
};

export default Delivery;
