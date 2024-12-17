import { withYup } from "@rvf/yup";
import { useFormContext, ValidatedForm } from "@rvf/react-router";
import * as yup from "yup";
import { Input } from "~/components/Input";
import { SubmitButton } from "~/components/SubmitButton";

const schema = yup.object({
  firstName: yup.string().label("First Name").required(),
});

const validator = withYup(schema);

const IsSubmitted = () => {
  const {
    formState: { hasBeenSubmitted },
  } = useFormContext();
  return hasBeenSubmitted ? <h1>Submitted!</h1> : null;
};

export default function FrontendValidation() {
  return (
    <ValidatedForm validator={validator}>
      <Input name="firstName" label="First Name" />
      <SubmitButton />
      <IsSubmitted />
      <button type="reset">Reset</button>
    </ValidatedForm>
  );
}
