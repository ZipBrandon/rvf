/**
 * This route doesn't have an integration test because it's tricky
 * to actually write a test for this with cypress.
 * It's left here form manual testing.
 */
import { json } from "react-router";
import type { DataFunctionArgs } from "react-router";
import { useActionData } from "react-router";
import { withYup } from "@rvf/yup";
import { useEffect, useState } from "react";
import { ValidatedForm } from "@rvf/react-router";
import * as yup from "yup";
import { Input } from "~/components/Input";
import { SubmitButton } from "~/components/SubmitButton";

const noReplaceValidator = withYup(
  yup.object({
    noReplaceNameValidation: yup
      .string()
      .label("noReplaceNameValidation")
      .required(),
  }),
);

export const action = async ({ request }: DataFunctionArgs) =>
  json({ message: "Submitted!" });

export default function MyForm() {
  const data = useActionData<typeof action>();
  const [historyLength, setHistoryLength] = useState<number>(0);

  // We want this to run on every render to get the current history length
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHistoryLength(window.history.length);
  });

  return (
    <ValidatedForm
      validator={noReplaceValidator}
      method="post"
      defaultValues={{
        noReplaceNameValidation: "Jake",
      }}
      replace
    >
      {data?.message && <p>{data.message}</p>}
      <p>
        History Length: <span data-testid="historyLength">{historyLength}</span>
      </p>
      <Input name="noReplaceNameValidation" label="noReplaceNameValidation" />
      <SubmitButton />
    </ValidatedForm>
  );
}
