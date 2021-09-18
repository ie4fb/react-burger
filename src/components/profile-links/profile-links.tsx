import Link from '../link/link';
import linksStyles from './profile-links.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/user';

export default function ProfileLinks() {
  const dispatch = useDispatch();
  const onLogout =() => 
  {
    dispatch(logout())
  }
  return (
    <div className={linksStyles.container}>
      <Link
        destination={'/profile'}
        spy={true}
        type={'profile'}
        styleAdditional={'mr-15'}
        styleInactive={'text_color_inactive'}
        textSize="medium"
      >
        Профиль
      </Link>
      <Link
        destination={'/profile/orders'}
        spy={true}
        type={'profile'}
        styleAdditional={'mr-15 mt-5'}
        styleInactive={'text_color_inactive'}
        textSize="medium"
      >
        История заказов
      </Link>
      <button onClick={onLogout} className={`${linksStyles.button} mr-15 mt-5 text text_type_main-medium text_color_inactive`}>
          Выход
      </button>
    </div>
  );
}
