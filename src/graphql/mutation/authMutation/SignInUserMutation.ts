import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import {
  MutationHookOptions,
  QueryHookOptions,
  useMutation
} from '@apollo/react-hooks';

export function useSignInUserMutation(options?: MutationHookOptions) {
  return useMutation(SignInUserMutation(), options);
}

export function SignInUserMutation(): DocumentNode {
  return gql`
    mutation SignInUserMutation($email: String!, $password: String!) {
      signInUserMutation(email: $email, password: $password) {
        id
        api_token
      }
    }
  `;
}
