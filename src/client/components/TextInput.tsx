import { ChangeEventHandler, useState } from 'react';

interface TextInputProps {
  label?: string;
  onChange?: (input: string) => void;
}

export default function ({ label, onChange }: TextInputProps) {
  const [value, setValue] = useState<string>('');

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.currentTarget.value;
    setValue(inputValue);

    onChange(inputValue);
  };

  return (
    <>
      {label && <label>{label}</label>}
      <input type="text" value={value} onChange={onChangeHandler} />
    </>
  );
}
