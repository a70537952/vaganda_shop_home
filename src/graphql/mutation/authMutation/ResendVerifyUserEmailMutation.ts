import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

interface ResendVerifyUserEmailMutationVars {
  email: String;
}

export function useResendVerifyUserEmailMutation<TData = any>(
  options?: MutationHookOptions<
    { resendVerifyUserEmailMutation: TData },
    ResendVerifyUserEmailMutationVars
  >
) {
  return useMutation<
    { resendVerifyUserEmailMutation: TData },
    ResendVerifyUserEmailMutationVars
  >(ResendVerifyUserEmailMutation(), options);
}

export function ResendVerifyUserEmailMutation(): DocumentNode {
  return gql`
    mutation ResendVerifyUserEmailMutation($email: String) {
      resendVerifyUserEmailMutation(email: $email) {
        id
      }
    }
  `;
}
