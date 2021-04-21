export interface ListAction {
    type: 'delete' | 'edit';
    disabled?: boolean;
    func: (arg: any) => any;
  }
