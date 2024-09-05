import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from '@solana/web3.js';
import {BorshCoder, EventParser, Program} from '@coral-xyz/anchor';
import { PontNetwork } from "./types/pont_network";
import pontNetworkIdl from './types/pont_network.json';
import { parseShipInitialized, parseDataAccountInitialized, parseDataFingerprintAdded, parseExternalObserverRequested } from './eventParsers';

const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

const programId = new PublicKey('ApvfQGqW8kzLyiG8x8PTrWJS7o2uLxXNjns6bYLh3H1R');

// const eventParser = new EventParser(programId, new BorshCoder(pontNetworkIdl as anchor.Idl));

// connection.onProgramAccountChange(programId, (accountInfo) => {
//     console.log('Account change detected:', accountInfo);
// });

connection.onLogs('all', (logs) => {
    parseShipInitialized(logs.logs);
    parseDataAccountInitialized(logs.logs);
    parseDataFingerprintAdded(logs.logs);
    parseExternalObserverRequested(logs.logs);
});

console.log('Solana indexer running...');
