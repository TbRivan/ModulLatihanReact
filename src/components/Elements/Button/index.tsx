interface ButtonPropsTypes {
  text: string;
  color: string;
  type: "button" | "submit";
}

export default function Button(props: Partial<ButtonPropsTypes>) {
  const { text, color = "indigo", type } = props;
  return (
    <button
      type={type}
      className={`flex w-full h-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1`}
    >
      {text}
    </button>
  );
}
