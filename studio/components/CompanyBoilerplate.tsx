import { Card, Text } from "@sanity/ui";
import { ObjectInputProps, useFormValue } from "sanity";

export function CompanyBoilerplateInput(props: ObjectInputProps) {
  const companyRef = useFormValue(["company"]);

  return (
    <Card padding={3} radius={2} shadow={1} tone="primary">
      {props.renderDefault(props)}
      <Text muted size={1} style={{ marginTop: "0.5rem" }}>
        The boilerplate from the selected company will be inserted here
      </Text>
    </Card>
  );
}
