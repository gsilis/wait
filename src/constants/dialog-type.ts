import type { DecisionInterface } from "../contexts/decision-context";

export type DialogRouter = (decisionApi: DecisionInterface) => string;
export type DialogHandler = (result: any, decisionApi: DecisionInterface) => void;
export type DialogComponentProps = {
  onAccept?: CallableFunction,
  onDecline?: CallableFunction,
};

export type DialogType = {
  id: string,
  title: string,
  component?: React.FunctionComponent<DialogComponentProps>,
  route: DialogRouter,
  handle: DialogHandler,
}