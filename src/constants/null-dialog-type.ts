import NullDialog from "../components/null-dialog";

export const DialogId = 'null';

export const NullDialogType = {
  id: DialogId,
  title: 'End of the Road',
  component: NullDialog,
  route: () => '',
  handle: () => {},
};