import Input from "./input";
import Label from "./label";

interface FormInputTypes {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: any) => void;
}

export default function FormInput(props: FormInputTypes) {
  const { label, name, type, placeholder, value, onChange } = props;
  return (
    <div>
      <Label label={label} name={name} />
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
