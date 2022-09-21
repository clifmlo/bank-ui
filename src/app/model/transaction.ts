export class Transaction {
    id: number;
    debitAccount: string;
    creditAccount: string;
    debitEntry: number;
    creditEntry: number;
    debitBalance: number;
    creditBalance: number;
    transactionStatus: string;
    transactionType: string;
    reference: string;
    date_processed: Date;
}