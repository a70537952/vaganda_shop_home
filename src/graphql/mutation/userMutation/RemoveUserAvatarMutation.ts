import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useRemoveUserAvatarMutation(
  fragment: DocumentNode,
  options?: MutationHookOptions
) {
  return useMutation(RemoveUserAvatarMutation(fragment), options);
}

export function RemoveUserAvatarMutation(fragment: DocumentNode): DocumentNode {
  return gql`
    mutation RemoveUserAvatarMutation {
      removeUserAvatarMutation {
        ...fragment
      }
    }
    ${fragment}
  `;
}
