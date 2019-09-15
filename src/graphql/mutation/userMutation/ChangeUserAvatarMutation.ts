import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useChangeUserAvatarMutation(
  fragment: DocumentNode,
  options?: MutationHookOptions
) {
  return useMutation(ChangeUserAvatarMutation(fragment), options);
}

export function ChangeUserAvatarMutation(fragment: DocumentNode): DocumentNode {
  return gql`
    mutation ChangeUserAvatarMutation($userAvatar: Upload) {
      changeUserAvatarMutation(userAvatar: $userAvatar) {
        ...fragment
      }
    }
    ${fragment}
  `;
}
