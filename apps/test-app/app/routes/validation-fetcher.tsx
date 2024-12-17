import { DataFunctionArgs, json } from "react-router";
import { useFetcher } from "react-router";
import { withYup } from "@rvf/yup";
import { validationError, useForm, FormProvider } from "@rvf/react-router";
import * as yup from "yup";
import { Input } from "~/components/Input";
import { SubmitButton } from "~/components/SubmitButton";

const schema = yup.object({
  firstName: yup.string().label("First Name").required(),
  lastName: yup.string().label("Last Name").required(),
  email: yup.string().label("Email").email().required(),
});

const validator = withYup(schema);

export const action = async ({ request }: DataFunctionArgs) => {
  const result = await validator.validate(await request.formData());
  if (result.error) return validationError(result.error);
  const { firstName, lastName } = result.data;

  return json({ message: `Submitted for ${firstName} ${lastName}!` });
};

export default function FrontendValidation() {
  const fetcher = useFetcher<typeof action>();
  const form = useForm({
    validator,
    method: "post",
    fetcher,
    id: "test-form",
  });
  return (
    <FormProvider scope={form.scope()}>
      {fetcher.data && "message" in fetcher.data && fetcher.data?.message && (
        <h1>{fetcher.data.message}</h1>
      )}
      <Input name="firstName" label="First Name" form="test-form" />
      <form {...form.getFormProps()}>
        <Input name="lastName" label="Last Name" />
        <Input name="email" label="Email" />
        <SubmitButton />
      </form>
    </FormProvider>
  );
}
