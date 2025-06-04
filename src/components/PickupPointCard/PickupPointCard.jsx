import { useMemo } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

const PickupPointCard = ({ selectedPoint, setSelectedPoint }) => {
  const now = new Date();

  const schedule = useMemo(() => {
    const regex = /пн-вс:\s*(\d{2})\.(\d{2})-(\d{2})\.(\d{2})/;
    const match = selectedPoint.WorkShedule.match(regex);
    if (!match) return null;

    const [, startHour, startMin, endHour, endMin] = match.map(Number);
    const start = new Date(now);
    start.setHours(startHour, startMin, 0, 0);

    const end = new Date(now);
    end.setHours(endHour, endMin, 0, 0);

    const isOpen = now >= start && now <= end;
    return {
      isOpen,
      start,
      end,
      label: isOpen
        ? `Открыто до ${endHour}:${String(endMin).padStart(2, '0')}`
        : `Закрыто до ${startHour}:${String(startMin).padStart(2, '0')}`
    };
  }, [selectedPoint.WorkShedule]);

  const [latitude, longitude] = selectedPoint.GPS.split(',')

  return (
    <div className="absolute left-2 top-2 p-4 w-2/6 bg-white rounded-2xl z-10 border-2 border-[#ED1651] shadow-xl flex flex-col gap-1">
      <button className='absolute right-2 top-2 w-6 h-6 flex items-center justify-center group' onClick={() => setSelectedPoint(null)}>
        <IoCloseCircleOutline className='w-full h-full transition-all group-hover:stroke-red-light' />
      </button>

      <h2 className="text-2xl font-bold text-[#ED1651]">Boxberry</h2>

      <p className="text-gray-800 text-sm">
        <span className="font-semibold">Адрес:</span> <a className='transition-colors text-blue hover:text-red-light' href={`https://yandex.ru/maps/?rtext=~${latitude},${longitude}&rtt=mt`} target="_blank" rel="noopener noreferrer">{selectedPoint.Address}</a>
      </p>

      <p className="text-gray-800 text-sm">
        <span className="font-semibold">Город:</span> {selectedPoint.CityName}
      </p>

      <p className='text-gray-800 text-sm'>
        <span className="font-semibold">Телефон:</span> <a
          href={`tel:${selectedPoint.Phone.replace(/[^+\d]/g, '')}`}
          className="text-blue-600 text-blue hover:text-red-light transition duration-200 font-medium inline-block text-sm"
        >{selectedPoint.Phone}
        </a>
      </p>

      {
        schedule && (
          <p className={`text-sm font-medium ${schedule.isOpen ? 'text-green' : 'text-red-light'}`}>
            {schedule.label}
          </p>
        )
      }

      <p className="text-gray-800 text-sm">
        <span className="font-semibold">Тип офиса:</span> {selectedPoint.TypeOfOffice}
      </p>

      <p className="text-gray-800 text-sm">
        <span className="font-semibold">Срок доставки:</span> {selectedPoint.DeliveryPeriod} дня
      </p>

      <p className="text-gray-800 text-sm">
        <span className="font-semibold">Ограничение по весу:</span> до {selectedPoint.LoadLimit} кг
      </p>

      <details className="text-sm text-gray-700 mt-2">
        <summary className="cursor-pointer text-blue hover:underline">
          Как добраться
        </summary>
        <p className="mt-1 whitespace-pre-line">{selectedPoint.TripDescription}</p>
      </details>
    </div >
  );
}

export default PickupPointCard