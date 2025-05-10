import ilu_pies from "public/site/ilu pies.png";
import { useSimpleModal } from "./useModal";

export function useSuccessModal() {
    return useSimpleModal({
        title: "Udało się!",
        image: ilu_pies,
        text: (
            <>
                Gratulujemy.
                <br />
                Pies cieszy się razem z Tobą.
            </>
        ),
    });
}
