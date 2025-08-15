import type { DecisionInterface } from "../contexts/decision-context";

export type DialogRouter = (result: any, decisionApi: DecisionInterface) => string;
export type DialogHandler = (result: any, decisionApi: DecisionInterface) => void;

export type DialogComponentProps = {
  onAccept?: CallableFunction,
  onDecline?: CallableFunction,
  className?: string,
};

export type DialogType = {
  id: string,
  title: string,
  component?: React.FunctionComponent<DialogComponentProps>,
  route: DialogRouter,
  handle: DialogHandler,
}