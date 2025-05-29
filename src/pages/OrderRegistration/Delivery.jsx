import DeliveryDoor from './DeliveryDoor';
import DeliveryCdek from './DeliveryCdek';
import DeliveryBoxberry from './DeliveryBoxberry'
import { useDeliveryStore } from '../../store/useDeliveryStore';

const Delivery = ({ order, }) => {
  const deliveryType = useDeliveryStore(state => state.type);
  const setDeliveryType = useDeliveryStore(state => state.setType);

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
    door: (props) => <DeliveryDoor {...props} order={order} />,
    cdek: (props) => <DeliveryCdek {...props} />,
    boxberry: (props) => <DeliveryBoxberry {...props} />
  }

  const DeliveryComponent = delivers[deliveryType]

  return (
    <>
      <div className="flex gap-4 mt-5">
        <TabComponent text='Доставка до двери' type='door' />
        <TabComponent text='Пункт выдачи (CDEK)' type='cdek' />
        <TabComponent text='Пункт выдачи (Boxberry)' type='boxberry' />
      </div>

      <DeliveryComponent />
    </>
  );
};

export default Delivery;
