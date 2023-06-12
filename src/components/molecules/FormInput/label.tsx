interface labelProps {
  label: string;
  name: string;
}

export default function Label(props: labelProps) {
  const { label, name } = props;
  return (
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900 mt-5"
    >
      {label}
    </label>
  );
}
