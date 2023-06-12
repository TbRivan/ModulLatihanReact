interface InputPropTypes {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange?: (event: any) => void;
}

export default function Input(props: InputPropTypes) {
  const { type, name, placeholder, value, onChange } = props;
  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
      <input
        type={type}
        name={name}
        id={name}
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
