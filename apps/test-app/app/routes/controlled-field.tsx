import { DataFunctionArgs, json } from "react-router";
import { useActionData } from "react-router";
import { withZod } from "@rvf/zod";
import { useState } from "react";
import {
  useControlField,
  validationError,
  useField,
  useForm,
  FormProvider,
} from "../../../../packages/react-router/dist";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { SubmitButton } from "~/components/SubmitButton";

const validator = withZod(
  z.object({
    myField: z.literal("blue"),
    text: zfd.json(z.literal("bob")),
  }),
);

export const action = async ({ request }: DataFunctionArgs) => {
  const result = await validator.validate(await request.formData());
  if (result.error) return validationError(result.error);
  return json({ message: `Color chosen is ${result.data.myField}` });
};

const Controlled = () => {
  const { error, validate } = useField("myField");
  const [value, setValue] = useControlField<string>("myField");
  const update = (value: string) => {
    setValue(value);
    validate();
  };

  return (
    <div>
      <input type="hidden" value={value} name="myField" />
      <button type="button" onClick={() => update("blue")} data-testid="blue">
        Blue{value === "blue" && " (selected)"}
      </button>
      <button type="button" onClick={() => update("green")} data-testid="green">
        Green{value === "green" && " (selected)"}
      </button>
      <button
        type="button"
        onClick={() => update("yellow")}
        data-testid="yellow"
      >
        Yellow{value === "yellow" && " (selected)"}
      </button>
      {error() && (
        <p style={{ color: "red" }} data-testid="error">
          {error()}
        </p>
      )}
    </div>
  );
};

const ControlledInput = () => {
  const { error, validate } = useField("text");
  const [value, setValue] = useControlField<string>("text");
  const [count, setCount] = useState(0);

  const update = (value: string) => {
    setValue(value);
    validate();
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <input type="hidden" value={value} name="text" />
      <input
        value={value}
        onChange={(e) => update(e.target.value)}
        data-testid="text-input"
      />
      {error() && <p data-testid="text-error">{error()}</p>}
      <p data-testid="resolution-count">{count}</p>
    </div>
  );
};

function* range(min: number, max: number) {
  for (let i = min; i < max; i++) {
    yield i;
  }
}

export default function ControlledField() {
  const data = useActionData<typeof action>();
  const [count, setCount] = useState(1);
  const rvf = useForm({
    validator,
    method: "post",
    defaultValues: { myField: "green", text: "" },
    validationBehaviorConfig: {
      initial: "onChange",
      whenTouched: "onChange",
      whenSubmitted: "onChange",
    },
  });

  return (
    <FormProvider scope={rvf.scope()}>
      <form {...rvf.getFormProps()}>
        {data && "message" in data && <div>{data.message}</div>}
        <div style={{ margin: "1rem" }}>
          <button type="button" onClick={() => setCount((prev) => prev + 1)}>
            +
          </button>
          <button type="button" onClick={() => setCount((prev) => prev - 1)}>
            -
          </button>
        </div>
        {[...range(0, count)].map((_, i) => (
          <Controlled key={i} />
        ))}
        <ControlledInput />
        <button
          onClick={() => rvf.setValue("text", "Hello from update hook")}
          type="button"
        >
          Force Update
        </button>
        <button type="reset">Reset</button>
        <SubmitButton />
      </form>
    </FormProvider>
  );
}
