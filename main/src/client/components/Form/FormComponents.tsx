type SimpleInputProps = {
  value: string;
  setValue: (value: string) => any;
};

export function FullName({
  value: fullName,
  setValue: setFullName,
}: SimpleInputProps) {
  return (
    <label>
      Imię i nazwisko *
      <input
        required
        placeholder="Nie przetwarzamy danych"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        maxLength={50}
      />
    </label>
  );
}

export function Tel({
  value: telNumber,
  setValue: setTelNumber,
}: SimpleInputProps) {
  return (
    <label>
      Numer telefonu
      <input
        type="tel"
        required
        placeholder="Telefon kontaktowy"
        value={telNumber}
        onChange={(e) => setTelNumber(e.target.value)}
      />
    </label>
  );
}

export function BirthDate({
  value: birthDate,
  setValue: setBirthDate,
}: SimpleInputProps) {
  return (
    <label>
      Data urodzenia
      <input
        type="date"
        required
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
    </label>
  );
}

export function Email({ value: email, setValue: setEmail }: SimpleInputProps) {
  return (
    <label>
      Email *
      <input
        required
        type="email"
        placeholder="Email do kontaktu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={50}
      />
    </label>
  );
}

export function VCaretaker({
  value: vCaretakerName,
  setValue: setVCaretakerName,
}: SimpleInputProps) {
  return (
    <label>
      Moim wirtualnym opiekunem jest... *
      <input
        required
        placeholder='Tu wpisz opis wyświetlany na stronie, na przykład "Hania z Gliwic", "klasa 3b z 17"'
        value={vCaretakerName}
        onChange={(e) => setVCaretakerName(e.target.value)}
        maxLength={80}
      />
    </label>
  );
}

export function AdditionalMessage({
  value: additionalMessage,
  setValue: setAdditionalMessage,
}: SimpleInputProps) {
  return (
    <label>
      Uwagi
      <textarea
        rows={7}
        placeholder="Dodatkowe uwagi"
        value={additionalMessage}
        onChange={(e) => setAdditionalMessage(e.target.value)}
        maxLength={160}
      />
    </label>
  );
}

export function About({ value: about, setValue: setAbout }: SimpleInputProps) {
  return (
    <label>
      Coś o sobie
      <textarea
        rows={7}
        required
        placeholder="Kilka słów o sobie, posiadane zwierzęta, poprzednie doświadczenie"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        maxLength={160}
      />
    </label>
  );
}
