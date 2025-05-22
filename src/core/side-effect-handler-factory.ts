import type { Decision } from "../constants/decision-type";
import type { DialogHandler } from "../constants/dialog-type";
import type { DecisionInterface } from "../contexts/decision-context";

export class SideEffectHandlerFactory {
  saveTo(key: Decision): DialogHandler {
    return (result: any, decisionApi: DecisionInterface) => {
      decisionApi.make(key, result);
    };
  }
}