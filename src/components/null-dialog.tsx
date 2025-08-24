import type { DialogComponentProps } from "../constants/dialog-type";
import { Dialog } from "./dialog";
import { DialogContent } from "./dialog-content";
import { DialogPrimaryText } from "./dialog-primary-text";
import { DialogTitle } from "./dialog-title";
import underConstruction from "../assets/under-construction.svg";

export default function NullDialog(_config: DialogComponentProps) {
  return <Dialog title="Oh No!">
    <DialogTitle>Under Construction</DialogTitle>
    <DialogContent>
      <div className="flex justify-center">
        <img src={ underConstruction } width="150px" />
      </div>
      <DialogPrimaryText className="text-center">Thanks for playing!</DialogPrimaryText>
    </DialogContent>
  </Dialog>;
}