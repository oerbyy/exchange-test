import React, {ComponentType} from 'react';

interface WithErrorProps {
  error: string | null;
}

function withErrorHandling<TProps>(
  WrappedComponent: ComponentType,
  ErrorMessageComponent: ComponentType<WithErrorProps>
) {
  return function WithError(props: TProps & WithErrorProps) {
    const {error, ...restProps} = props;

    if (error) {
      return <ErrorMessageComponent error={error} />;
    }

    return <WrappedComponent {...restProps} />;
  };
}

export default withErrorHandling;
