import { PropsWithChildren } from "react";

type GeneralLayoutProviderProps = PropsWithChildren;

export const GeneralLayoutProvider = ({
  children,
}: GeneralLayoutProviderProps) => {
  return <main>{children}</main>;
};
