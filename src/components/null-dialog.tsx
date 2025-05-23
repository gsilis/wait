import type { DialogComponentProps } from "../constants/dialog-type";
import { Dialog } from "./dialog";
import { DialogContent } from "./dialog-content";
import { DialogPrimaryText } from "./dialog-primary-text";
import { DialogTitle } from "./dialog-title";

export default function NullDialog(_config: DialogComponentProps) {
  return <Dialog title="Oh No!">
    <DialogTitle>Error fetching alert.</DialogTitle>
    <DialogContent>
      <DialogPrimaryText>This is actually an error. Something went wrong, you're not really supposed to see this. So, congratulations! In a way.</DialogPrimaryText>
    </DialogContent>
  </Dialog>;
}