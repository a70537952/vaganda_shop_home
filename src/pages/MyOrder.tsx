import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HomeIcon from '@material-ui/icons/Home';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import HomeHelmet from '../components/home/HomeHelmet';
import { AppContext } from '../contexts/Context';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { homePath } from '../utils/RouteUtil';
import UserOrderDetailList from '../components/home/UserOrder/UserOrderDetailList';
import USER_ORDER_DETAIL from '../constant/USER_ORDER_DETAIL';

interface IProps {}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  tabContent: {
    marginTop: '35px'
  }
});

function MyOrder(props: IProps & RouteComponentProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { location, history } = props;

  let tabs = [
    homePath('myOrderShip'),
    homePath('myOrderReceive'),
    homePath('myOrderComplete'),
    homePath('myOrderCancel')
  ];

  let tabIndex = tabs.indexOf(location.pathname);
  const [value, setValue] = useState<number>(tabIndex !== -1 ? tabIndex : 0);

  useEffect(() => {
    let tabIndex = tabs.indexOf(location.pathname);
    if (tabIndex === -1) {
      history.push(tabs[0]);
    }

    setValue(tabIndex !== -1 ? tabIndex : 0);
  }, [location.pathname]);

  return (
    <>
      <HomeHelmet title={t('my order')} description={t('my order')} />
      <div className={classes.root}>
        <Paper square>
          <Tabs
            value={value}
            onChange={(event, value) => {
              setValue(value);
            }}
            indicatorColor="primary"
            textColor="primary"
            centered
            scrollButtons="auto"
            variant="fullWidth"
          >
            <Tab
              {...({
                component: NavLink,
                to: homePath('myOrderShip')
              } as any)}
              label={t('to ship')}
              icon={<LocalShippingIcon />}
            />
            <Tab
              {...({
                component: NavLink,
                to: homePath('myOrderReceive')
              } as any)}
              label={t('to receive')}
              icon={<HomeIcon />}
            />
            <Tab
              {...({
                component: NavLink,
                to: homePath('myOrderComplete')
              } as any)}
              label={t('completed')}
              icon={<DoneIcon />}
            />
            {context.user.is_sign_up_user && (
              <Tab
                {...({
                  component: NavLink,
                  to: homePath('myOrderCancel')
                } as any)}
                label={t('cancelled')}
                icon={<CancelIcon />}
              />
            )}
          </Tabs>
        </Paper>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.tabContent}
        >
          <Fade in={value === 0}>
            <Grid
              container
              item
              xs={12}
              md={10}
              justify="center"
              style={{ display: value === 0 ? 'inherit' : 'none' }}
            >
              <Route
                path={homePath('myOrderShip')}
                render={() => (
                  <UserOrderDetailList
                    variables={{
                      user_id: context.user.id,
                      order_detail_status:
                        USER_ORDER_DETAIL.ORDER_DETAIL_STATUS.PAID
                    }}
                  />
                )}
              />
            </Grid>
          </Fade>
          <Fade in={value === 1}>
            <Grid
              container
              item
              xs={12}
              md={10}
              justify="center"
              style={{ display: value === 1 ? 'inherit' : 'none' }}
            >
              {value === 1 && (
                <UserOrderDetailList
                  variables={{
                    user_id: context.user.id,
                    order_detail_status:
                      USER_ORDER_DETAIL.ORDER_DETAIL_STATUS.SHIPPED
                  }}
                />
              )}
            </Grid>
          </Fade>
          <Fade in={value === 2}>
            <Grid
              container
              item
              xs={12}
              md={10}
              justify="center"
              style={{ display: value === 2 ? 'inherit' : 'none' }}
            >
              {value === 2 && (
                <UserOrderDetailList
                  variables={{
                    user_id: context.user.id,
                    order_detail_status:
                      USER_ORDER_DETAIL.ORDER_DETAIL_STATUS.RECEIVED
                  }}
                />
              )}
            </Grid>
          </Fade>
          {Boolean(context.user.is_sign_up_user) && (
            <Fade in={value === 3}>
              <Grid
                container
                item
                xs={12}
                md={10}
                justify="center"
                style={{ display: value === 3 ? 'inherit' : 'none' }}
              >
                {value === 3 && (
                  <UserOrderDetailList
                    variables={{
                      user_id: context.user.id,
                      order_detail_status:
                        USER_ORDER_DETAIL.ORDER_DETAIL_STATUS.CANCELLED
                    }}
                  />
                )}
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </>
  );
}

export default withRouter(MyOrder);
