import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import HomeHelmet from '../components/home/HomeHelmet';
import FormEditUserAccount from '../components/home/Form/FormEditUserAccount';
import FormEditUserAddress from '../components/home/Form/FormEditUserAddress';
import FormEditUserContact from '../components/home/Form/FormEditUserContact';
import FormEditUserPassword from '../components/home/Form/FormEditUserPassword';
import { AppContext } from '../contexts/Context';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { homePath } from '../utils/RouteUtil';

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

function AccountEdit(props: IProps & RouteComponentProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { location, history } = props;

  let tabs = [
    homePath('accountEdit'),
    homePath('accountEditAddress'),
    homePath('accountEditContact')
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
      <HomeHelmet
        title={t('edit profile')}
        description={context.user.description}
        ogImage={context.user.user_info.avatar_large}
      />
      <div className={classes.root} id={'accountEdit'}>
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
                to: homePath('accountEdit')
              } as any)}
              label={t('info')}
              icon={<InfoIcon />}
            />
            <Tab
              {...({
                component: NavLink,
                to: homePath('accountEditAddress')
              } as any)}
              label={t('address')}
              icon={<HomeIcon />}
            />
            <Tab
              {...({
                component: NavLink,
                to: homePath('accountEditContact')
              } as any)}
              label={t('contact')}
              icon={<PhoneIcon />}
            />
            {context.user.is_sign_up_user && (
              <Tab
                {...({
                  component: NavLink,
                  to: homePath('accountEditPassword')
                } as any)}
                label={t('password')}
                icon={<LockIcon />}
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
              item
              xs={12}
              sm={8}
              md={6}
              lg={4}
              xl={3}
              style={{ display: value === 0 ? 'inherit' : 'none' }}
            >
              {value === 0 && (
                <Route
                  path={homePath('accountEdit')}
                  render={() => <FormEditUserAccount />}
                />
              )}
            </Grid>
          </Fade>
          <Fade in={value === 1}>
            <Grid
              item
              xs={8}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              style={{ display: value === 1 ? 'inherit' : 'none' }}
            >
              {value === 1 && (
                <Route
                  path={homePath('accountEditAddress')}
                  render={() => <FormEditUserAddress />}
                />
              )}
            </Grid>
          </Fade>
          <Fade in={value === 2}>
            <Grid
              item
              xs={8}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              style={{ display: value === 2 ? 'inherit' : 'none' }}
            >
              {value === 2 && (
                <Route
                  path={homePath('accountEditContact')}
                  render={() => <FormEditUserContact />}
                />
              )}
            </Grid>
          </Fade>
          {Boolean(context.user.is_sign_up_user) && (
            <Fade in={value === 3}>
              <Grid
                item
                xs={8}
                sm={6}
                md={4}
                lg={4}
                xl={4}
                style={{ display: value === 3 ? 'inherit' : 'none' }}
              >
                {value === 3 && (
                  <Route
                    path={homePath('accountEditPassword')}
                    render={() => (
                      <FormEditUserPassword userId={context.user.id} />
                    )}
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

export default withRouter(AccountEdit);
