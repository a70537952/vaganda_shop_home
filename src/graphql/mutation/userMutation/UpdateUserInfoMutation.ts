import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useUpdateUserInfoMutation(
  fragment: DocumentNode,
  options?: MutationHookOptions
) {
  return useMutation(UpdateUserInfoMutation(fragment), options);
}

export function UpdateUserInfoMutation(fragment: DocumentNode): DocumentNode {
  return gql`
    mutation UpdateUserInfoMutation($name: String, $gender: Int) {
      updateUserInfoMutation(name: $name, gender: $gender) {
        ...fragment
      }
    }
    ${fragment}
  `;
}
