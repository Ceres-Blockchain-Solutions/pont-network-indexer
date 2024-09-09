import { PublicKey } from "@solana/web3.js";

export interface DataAccountDocument {
    data_account: string;
    external_observers: PublicKey[];
    external_observers_keys: string[];  // Declare it as an array of strings
}