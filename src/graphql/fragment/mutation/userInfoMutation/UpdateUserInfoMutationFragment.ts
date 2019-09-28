import gql from 'graphql-tag';

export let updateUserInfoMutationFragments: any = {
  FormEditUserAccount: gql`
    fragment fragment on UserInfo {
      id
      gender
      avatar_original
      avatar_small
      avatar_medium
      avatar_large
    }
  `
};
