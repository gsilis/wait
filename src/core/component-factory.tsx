import AlertDialog from "../components/alert-dialog";
import type { DialogComponentProps } from "../constants/dialog-type";

export class ComponentFactory {
  alert(
    title: string,
    message: any,
    confirmText: string,
    confirmTitle?: string
  ): React.FunctionComponent {
    return ({ onAccept }: DialogComponentProps) => (
      <AlertDialog
        title={ title }
        accept={ onAccept }
        confirmText={ confirmText }
        confirmTitle={ confirmTitle }
      >
        { message }
      </AlertDialog>
    );
  }
}