export type Expense = {
    id: number;
    amount: string;
    note: string;
    category: string;
    date: string;
  };

  export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    AddExpense: (expense:ModalExpense) => void;
    isEditing?: boolean;
  currentExpense?: ModalExpense | null;
  onEditSave?: (expense: ModalExpense) => void;
  };

  export type ModalExpense = {
    id:string;
    amount:number;
    note: string;
    category: string;
    date: string;
  };