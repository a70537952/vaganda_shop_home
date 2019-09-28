import gql from 'graphql-tag';

export let updateUserContactMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on UserInfo {
      id
    }
  `
};
