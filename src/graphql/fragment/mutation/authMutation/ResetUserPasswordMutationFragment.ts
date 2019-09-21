import gql from 'graphql-tag';

export let resetUserPasswordMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on PasswordReset {
      id
    }
  `
};
