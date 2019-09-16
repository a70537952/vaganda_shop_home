import Error404 from '../components/home/Error404';
import AccountEdit from '../pages/AccountEdit';
import CreateShop from '../pages/CreateShop';
import Home from '../pages/Home';
import ResetPassword from '../pages/ResetPassword';
import ShopHome from '../pages/shop/ShopHome';
import Search from '../pages/Search';
import Product from '../pages/Product';
import UserCart from '../pages/UserCart';
import MyOrder from '../pages/MyOrder';

export default <any>{
  home: {
    path: '/',
    exact: true,
    component: Home
  },
  account: {
    path: '/account',
    exact: false,
    component: AccountEdit,
    auth: true
  },
  accountEdit: {
    path: '/account/edit'
  },
  accountEditAddress: {
    path: '/account/edit/address'
  },
  accountEditContact: {
    path: '/account/edit/contact'
  },
  accountEditPassword: {
    path: '/account/edit/password'
  },
  createShop: {
    path: '/create/shop',
    exact: true,
    component: CreateShop,
    auth: true
  },
  resetPassword: {
    path: '/reset/password',
    exact: true,
    component: ResetPassword
  },
  shopHome: {
    path: '/shop/:account',
    exact: true,
    component: ShopHome
  },
  search: {
    path: '/search/:searchType/:searchValue',
    exact: true,
    component: Search
  },
  product: {
    path: '/product/:productId',
    exact: true,
    component: Product
  },
  userCart: {
    path: '/cart',
    exact: true,
    component: UserCart,
    auth: true
  },
  myOrder: {
    path: '/order',
    exact: false,
    component: MyOrder,
    auth: true
  },
  myOrderShip: {
    path: '/order/ship'
  },
  myOrderReceive: {
    path: '/order/receive'
  },
  myOrderComplete: {
    path: '/order/complete'
  },
  myOrderCancel: {
    path: '/order/cancel'
  },
  error404: {
    path: '',
    exact: true,
    component: Error404
  }
};
