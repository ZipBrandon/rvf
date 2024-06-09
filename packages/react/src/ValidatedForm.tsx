import { FieldValues, AllProps } from "@rvf/core";
import { RvfOpts, useRvf } from "./useRvf";
import { RvfReact } from "./base";
import { RvfProvider } from "./context";

export type ValidatedFormProps<
  FormInputData extends FieldValues,
  FormOutputData,
> = Omit<RvfOpts<FormInputData, FormOutputData>, "formId"> &
  Omit<React.ComponentProps<"form">, "children"> & {
    id?: string;

    /**
     * A ref to the form element.
     */
    formRef?: React.RefObject<HTMLFormElement>;

    children:
      | React.ReactNode
      | ((form: RvfReact<FormInputData>) => React.ReactNode);
  };

export const ValidatedForm = <
  FormInputData extends FieldValues,
  FormOutputData,
>({
  validator,
  formRef,
  defaultValues,
  serverValidationErrors,
  action,
  id,
  disableFocusOnError,
  handleSubmit,
  submitSource,
  validationBehaviorConfig,
  children,
  onSubmit,
  onReset,
  onSubmitSuccess,
  onSubmitFailure,
  resetAfterSubmit,
  otherFormProps,
  reloadDocument,
  ...rest
}: ValidatedFormProps<FormInputData, FormOutputData>) => {
  const rvf = useRvf({
    defaultValues: defaultValues,
    serverValidationErrors,
    action,
    formId: id,
    disableFocusOnError,
    validator,
    handleSubmit: handleSubmit as never,
    submitSource,
    onSubmitSuccess,
    onSubmitFailure,
    validationBehaviorConfig,
    resetAfterSubmit,
    otherFormProps,
    reloadDocument,
  } satisfies AllProps<RvfOpts<FormInputData, FormOutputData, void>>);

  return (
    <RvfProvider scope={rvf.scope()}>
      <form
        {...rvf.getFormProps({
          onSubmit,
          onReset,
          ref: formRef,
        })}
        {...rest}
      >
        {typeof children === "function" ? children(rvf) : children}
      </form>
    </RvfProvider>
  );
};