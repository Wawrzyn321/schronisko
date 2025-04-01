import { ChangeEvent, useEffect, useRef, useState } from 'react';

type SimpleInputProps = {
  value: string;
  setValue: (value: string) => void;
  triedSubmitCounter?: number;
};

type ValidatedInputProps = {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  triedSubmitCounter: number;
  validationMessage: string;
  [x: string]: any;
};

function ValidatedInput({
  value,
  onChange,
  label,
  triedSubmitCounter,
  validationMessage,
  ...inputProps
}: ValidatedInputProps) {
  const inputRef = useRef(null);

  const showValidationMessage =
    triedSubmitCounter > 0 && !inputRef.current.validity.valid;

  return (
    <label>
      {label}
      {inputProps.required ? ' *' : ''}
      <input
        value={value}
        onChange={onChange}
        ref={inputRef}
        {...inputProps}
      />
      <p className="validation-message">
        {showValidationMessage && validationMessage}
      </p>
    </label>
  );
}

export function FullName({
  value,
  setValue,
  triedSubmitCounter,
}: SimpleInputProps) {
  return (
    <ValidatedInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Imię i nazwisko"
      triedSubmitCounter={triedSubmitCounter}
      validationMessage="Niepoprawne imię i nazwisko"
      required
      placeholder="Nie przetwarzamy danych"
      maxLength={50}
    />
  );
}

export function Tel({ value, setValue, triedSubmitCounter }: SimpleInputProps) {
  return (
    <ValidatedInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Numer telefonu"
      type="tel"
      placeholder="Telefon kontaktowy"
      triedSubmitCounter={triedSubmitCounter}
      validationMessage="Niepoprawny numer telefonu"
      required
    />
  );
}

export function BirthDate({
  value,
  setValue,
  triedSubmitCounter,
}: SimpleInputProps) {
  return (
    <ValidatedInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Data urodzenia"
      type="date"
      triedSubmitCounter={triedSubmitCounter}
      validationMessage="Niepoprawna data"
      required
    />
  );
}

export function Email({
  value,
  setValue,
  triedSubmitCounter,
}: SimpleInputProps) {
  return (
    <ValidatedInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Email"
      type="email"
      placeholder="Email do kontaktu"
      triedSubmitCounter={triedSubmitCounter}
      validationMessage="Niepoprawny adres email"
      required
      maxLength={120}
    />
  );
}

export function VCaretakerName({
  value,
  setValue,
  triedSubmitCounter,
}: SimpleInputProps) {
  return (
    <ValidatedInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Moim wirtualnym opiekunem jest..."
      placeholder='Tu wpisz opis wyświetlany na stronie, na przykład "Hania z Gliwic", "klasa 3b z 17"'
      triedSubmitCounter={triedSubmitCounter}
      validationMessage="Brak nazwy opiekuna"
      required
      maxLength={120}
    />
  );
}

export function AdditionalMessage({ value, setValue }: SimpleInputProps) {
  return (
    <label>
      Uwagi
      <textarea
        rows={7}
        placeholder="Dodatkowe uwagi"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={160}
      />
    </label>
  );
}

export function About({
  value,
  setValue,
  triedSubmitCounter,
}: SimpleInputProps) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (triedSubmitCounter > 0) {
      setShowMessage(!value);
    }
  }, [triedSubmitCounter, value]);

  return (
    <label>
      Coś o sobie
      <textarea
        rows={7}
        required
        placeholder="Kilka słów o sobie, posiadane zwierzęta, poprzednie doświadczenie"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={160}
      />
      <p className="validation-message">{showMessage && 'Uzupełnij pole'}</p>
    </label>
  );
}
