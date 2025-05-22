import { use, useMemo } from "react";
import type { Decision } from "../constants/decision-type";
import { DecisionContext } from "../contexts/decision-context";

interface DecisionValueProps {
  decisionId: Decision,
  defaultValue?: any,
}

export function DecisionValue({
  decisionId,
  defaultValue,
}: DecisionValueProps) {
  const decisionsApi = use(DecisionContext);
  const value = useMemo<any>(() => {
    return decisionsApi.decisions[decisionId];
  }, [decisionsApi.decisions[decisionId], decisionId]);
  console.log(decisionsApi.decisions);

  return <span className="font-bold">{ value || defaultValue }</span>;
}