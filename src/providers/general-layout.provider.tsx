import { Header } from "@/components";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

type GeneralLayoutProviderProps = PropsWithChildren;

export const GeneralLayoutProvider = ({
  children,
}: GeneralLayoutProviderProps) => {
  return (
    <main className="selection:!bg-[#ddff00]/40">
      <Toaster />
      <Header />
      {children}
    </main>
  );
};
