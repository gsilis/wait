import { createContext, useCallback, useMemo, useState } from "react";
import { type Decision } from "../constants/decision-type";
import type { ChildrenProps } from "./support/children-props";

export type DecisionRecords = Partial<Record<Decision, any>>;

export interface DecisionInterface {
  decisions: DecisionRecords;
  decisionKeys: Decision[];
  make(decision: Decision, value: any): void;
}

export const DecisionContext = createContext<DecisionInterface>({
  decisions: {},
  decisionKeys: [],
  make(_decision, _value) {},
});

export function DecisionProvider({ children }: ChildrenProps) {
  const [decisions, setDecisions] = useState<DecisionRecords>({});
  const decisionKeys = useMemo<Decision[]>(() => {
    return Object.keys(decisions) as Decision[];
  }, [JSON.stringify(decisions)]);
  const make = useCallback((decision: Decision, value: any) => {
    setDecisions((oldDecisions) => ({
      ...oldDecisions,
      [decision]: value,
    }));
  }, [setDecisions]);

  const api: DecisionInterface = {
    decisions,
    decisionKeys,
    make,
  };

  return <DecisionContext value={ api }>{ children }</DecisionContext>;
}