import { Dialog } from "@headlessui/react";
import { DataFunctionArgs, json } from "react-router";
import { useActionData } from "react-router";
import { withYup } from "@rvf/yup";
import { useState } from "react";
import { ValidatedForm } from "@rvf/remix";
import * as yup from "yup";
import { SubmitButton } from "~/components/SubmitButton";

const schema = yup.object({});
const validator = withYup(schema);

export const action = async (args: DataFunctionArgs) =>
  json({ message: "Submitted to in-route action." });

export default function FrontendValidation() {
  const data = useActionData<typeof action>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ValidatedForm
        validator={validator}
        method="post"
        action="/submission/action/target"
      >
        {data?.message && <p>{data.message}</p>}
        <SubmitButton name="whichForm" value="Not in a dialog" />
      </ValidatedForm>

      <button type="button" onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        style={{
          position: "fixed",
          top: "25%",
          left: "25%",
          right: 0,
          bottom: 0,
        }}
      >
        <Dialog.Overlay />

        <Dialog.Title>Modal Form</Dialog.Title>

        <ValidatedForm
          validator={validator}
          method="post"
          action="/submission/action/target"
        >
          {data?.message && <p>{data.message}</p>}
          <SubmitButton
            data-testid="dialog-submit"
            name="whichForm"
            value="In a dialog"
          />
        </ValidatedForm>
      </Dialog>
    </>
  );
}
