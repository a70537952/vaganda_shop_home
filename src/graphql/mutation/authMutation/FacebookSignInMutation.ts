import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

interface FacebookSignInMutationVars {
  facebookID: String;
  email: String;
  name: String;
}

export function useFacebookSignInMutation<TData = any>(
  options?: MutationHookOptions<
    { facebookSignInMutation: TData },
    FacebookSignInMutationVars
  >
) {
  return useMutation<
    { facebookSignInMutation: TData },
    FacebookSignInMutationVars
  >(FacebookSignInMutation(), options);
}

export function FacebookSignInMutation(): DocumentNode {
  return gql`
    mutation FacebookSignInMutation(
      $facebookID: String!
      $email: String
      $name: String
    ) {
      facebookSignInMutation(
        facebookID: $facebookID
        email: $email
        name: $name
      ) {
        id
        api_token
      }
    }
  `;
}
