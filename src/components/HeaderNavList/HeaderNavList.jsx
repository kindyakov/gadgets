import { Link } from "react-router-dom";
import { TriangleSvg } from "../../ui/svg/TriangleSvg";

const HeaderNavList = ({ title, items, activeId = null, onMouseEnter, baseUrl, isSvg = true }) => {
  return (
    <nav className="header__catalog_nav flex flex-col gap-4">
      <h3 className="header__catalog_title font-bold text-2xl">{title}</h3>
      <ul className="header__catalog_list flex flex-col max-h-[441px] overflow-y-auto">
        {items.map(item => (
          <li className="header__catalog_item" key={item.id}>
            <Link
              to={`${baseUrl}/${item.slug}/`}
              className={`header__catalog_link flex items-center justify-between gap-2 ${isSvg ? 'dropdown' : ''} ${activeId === item.id ? 'active' : ''}`}
              onMouseEnter={() => onMouseEnter && onMouseEnter(item)}
            >
              <span>{item.title}</span>
              {isSvg && <TriangleSvg />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HeaderNavList