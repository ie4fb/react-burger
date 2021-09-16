import ProfileForm from '../components/profile-form/profile-form';
import profileStyles from './profile.module.css';
import ProfileLinks from '../components/profile-links/profile-links';
import {
  Router,
  Route,
  useHistory,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import ProfileOrders from '../components/profile-orders/profile-orders';
import OrderInfo from '../components/order-info/order-info';

export default function ProfilePage() {
  let { path, url } = useRouteMatch();
  return (
    <section className={profileStyles.container}>

        <Route exact path={path}>
          <ProfileLinks />
          <ProfileForm />
        </Route>
        <Route exact path={`${path}/orders`}>
          <ProfileLinks />
          <ProfileOrders />
        </Route>
        <Route exact path={`${path}/orders/:id`}>
          <OrderInfo />
        </Route>
    </section>
  );
}
