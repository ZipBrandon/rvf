import { DataFunctionArgs, json } from "react-router";
import { Link } from "react-router";
import { withZod } from "@rvf/zod";
import { ValidatedForm } from "../../../../packages/react-router/dist";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Input } from "~/components/Input";
import { SubmitButton } from "~/components/SubmitButton";

const validator = withZod(
  z.object({
    testing: zfd.text(),
  }),
);

export const action = async ({ request }: DataFunctionArgs) => {
  const result = await validator.validate(await request.formData());
  return json({ message: `Form has id: ${result.formId}` });
};

export default function FormId() {
  return (
    <ValidatedForm validator={validator} method="post" id="form-id-test-form">
      <Link to="/form-id-validation/other">Other</Link>
      <Input name="testing" label="Test input" />
      <SubmitButton />
    </ValidatedForm>
  );
}
