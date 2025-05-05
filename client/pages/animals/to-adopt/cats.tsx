import {
  AnimalCategory,
  AnimalType,
  Page as PageModel,
} from "@prisma-app/client";
import { fetchPage } from "api/api";
import { AnimalList } from "components/AnimalList/AnimalList";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { LayoutWrapper } from "components/LayoutWrapper/LayoutWrapper";
import { Page } from "components/Page/Page";

const ID = "koty-do-adopcji";

export default function CatsToAdopt({ ssrPage }: { ssrPage: PageModel }) {
  return (
    <>
      <LayoutWrapper>
        <Breadcrumbs items={["Zwierzęta", "Koty do adopcji"]} />
        <Page id={ID} ssrPage={ssrPage} />
      </LayoutWrapper>
      <AnimalList
        categories={[
          AnimalCategory.DoAdopcji,
          AnimalCategory.PilniePotrzebuja,
          AnimalCategory.Weterani,
        ]}
        type={AnimalType.CAT}
        withCategoryOverlay
      />
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { ssrPage: PageModel };
}> {
  return { props: { ssrPage: (await fetchPage(ID)).data } };
}
