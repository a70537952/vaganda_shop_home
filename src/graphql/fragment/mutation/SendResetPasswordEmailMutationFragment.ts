import gql from 'graphql-tag';

export let sendResetPasswordEmailMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on User {
      id
    }
  `
};
