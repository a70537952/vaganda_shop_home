import gql from 'graphql-tag';

export let changeUserAvatarMutationFragments: any = {
  DefaultFragment: gql`
    fragment fragment on UserInfo {
      id
    }
  `
};
