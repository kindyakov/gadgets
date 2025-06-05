import { IoIosArrowForward } from "react-icons/io";
import { useOrderFlowStore } from '../../store/useOrderFlowStore';

import FormContactInformation from './FormContactInformation';
import Delivery from './Delivery/Delivery';
import Payment from './Payment/Payment'
import { useDeliveryStore } from "../../store/useDeliveryStore";

const OrderContent = ({ order }) => {
  const { getAddress, client } = useDeliveryStore()
  const { step, setStep } = useOrderFlowStore()
  const sections = [
    { id: 1, title: 'Контактные данные', subTitle: `${client.name} ${client.surname} ${client.phone}`, Component: FormContactInformation },
    { id: 2, title: 'Доставка', subTitle: getAddress(), Component: Delivery },
    { id: 3, title: 'Оплата', Component: Payment },
  ];

  return (
    <div className="w-4/6 flex flex-col gap-5">
      {sections.map(({ id, title, subTitle, Component }) => (
        <div key={id} className={`p-3 rounded-lg ${step !== id ? 'bg-blue/10' : ''}`}>
          <div
            className={`flex items-center justify-between gap-3 ${step >= id ? '' : 'opacity-70 pointer-events-none'}`}
          >
            <h3 className="text-2xl font-bold">{title}</h3>
            {subTitle && <p className="mr-auto mt-1 text-[#6d6d6d] text-xs text">"{subTitle}"</p>}
            {
              step > id
                ? <button
                  className="text-sm text-blue px-3 py-[2px] bg-blue/15 rounded-md border border-blue transition-colors hover:bg-blue hover:text-white"
                  onClick={() => step >= id && setStep(id)}>
                  Изменить
                </button>
                : <IoIosArrowForward className={`w-6 h-6 transition-transform ${step >= id ? 'rotate-90' : ''}`} />
            }
          </div>

          <div className={`accordion-content relative ${step === id ? 'open' : ''}`}>
            <Component order={order} onNextStep={() => setStep(id + 1)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderContent