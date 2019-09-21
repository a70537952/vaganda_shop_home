import gql from 'graphql-tag';

export let currencyExchangeRateFragments: any = {
  UserCart: gql`
    fragment fragment on CurrencyExchangeRate {
      id
      base
      target
      rate
    }
  `
};
