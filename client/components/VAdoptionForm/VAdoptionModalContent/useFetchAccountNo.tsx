import { AdoptionModalProps } from "./VAdoptionModalContent";
import { useQuery } from "@tanstack/react-query";
import { settingsQueryOptions } from "api/queryOptions";

export function useFetchAccountNo(): AdoptionModalProps {
  const settingsQuery = useQuery(settingsQueryOptions())

  const getData = () => {
    if (!settingsQuery.data) {
      return null;
    }

    const accountNoSetting = settingsQuery.data?.find(
      (s) => s.id === "V_ADOPTION_ACCOUNT_NUMBER",
    );

    return accountNoSetting?.value || "Nie podano numeru konta!";
  }


  return {
    accountNo: getData(),
    error: settingsQuery.error
  };
}
