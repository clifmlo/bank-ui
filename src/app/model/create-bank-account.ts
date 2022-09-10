import { Deposit } from '../model/deposit';

export class CreateBankAccount {
    userId: number;
    accountType: string;
    deposit: Deposit;    
}