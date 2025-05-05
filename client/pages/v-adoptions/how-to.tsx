import { Page as PageModel } from "@prisma-app/client";
import { Page } from "components/Page/Page";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { fetchPage } from "api/api";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";

const ID = "jak-adoptowac-wirtualnie";

export default function VirtualHowTo({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <LayoutWrapper>
      <Breadcrumbs items={["Adopcje wirtualne", "Jak adoptować wirtualnie"]} />
      <Page id={ID} ssrPage={ssrPage} />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
