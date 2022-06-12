import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
// import { useDebounce } from 'react-use';

interface TextInputProps {
  label?: string;
  onChange?: (input: string) => void;
  onPressEnter?: (input: string) => void;
}

export default function ({ label, onChange, onPressEnter }: TextInputProps) {
  const [value, setValue] = useState('');

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.currentTarget.value;
    setValue(inputValue);

    onChange && onChange(inputValue);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onPressEnter && onPressEnter(event.currentTarget.value);
    }
  };

  return (
    <>
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChangeHandler}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}
