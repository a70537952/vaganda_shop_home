import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useSignUpUserMutation(options?: MutationHookOptions) {
  return useMutation(SignUpUserMutation(), options);
}

export function SignUpUserMutation(): DocumentNode {
  return gql`
    mutation SignUpUserMutation(
      $username: String!
      $email: String!
      $password: String!
    ) {
      signUpUserMutation(
        username: $username
        email: $email
        password: $password
      ) {
        id
      }
    }
  `;
}
