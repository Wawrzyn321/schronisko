import ilu_kot from "public/site/ilu kot.png";
import { useSimpleModal } from "./useModal";

export function useErrorModal() {
  return useSimpleModal({
    title: "Upsss...",
    image: ilu_kot,
    text: (
      <>
        Coś poszło nie tak.
        <br />
        Spróbuj ponownie.
      </>
    ),
  });
}
