import * as anchor from "@coral-xyz/anchor";
import { EventParser, BorshCoder } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import pontNetworkIdl from './types/pont_network.json';

const coder = new BorshCoder(pontNetworkIdl as anchor.Idl);

export function parseShipInitialized(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('3dnBfuMPHW52smosEsJwsnLGCR56DrphyUG68GqAcVxb'), coder);
    const events = eventParser.parseLogs(logs);
    const parsedEvents = [];
    for (let event of events) {
        if (event.name === 'ShipInitialized') {
            const { ship, ship_management } = event.data;
            console.log('\nShipInitialized event:');
            console.log(`\tShip: ${ship.toBase58()}`);
            console.log(`\tShip Management: ${ship_management.toBase58()}`);

            const timestamp = new Date();
            const timestampUnix = timestamp.getTime();
            const timestampString = timestamp.toLocaleString();

            parsedEvents.push({
                event: 'ShipInitialized',
                ship: ship.toBase58(),
                shipManagement: ship_management.toBase58(),
                timestamp
            });
        }
    }
    return parsedEvents;
}

export function parseDataAccountInitialized(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('3dnBfuMPHW52smosEsJwsnLGCR56DrphyUG68GqAcVxb'), coder);
    const events = eventParser.parseLogs(logs);
    const parsedEvents = [];
    for (let event of events) {
        console.log('\nEvent: ', event);
        if (event.name === 'DataAccountInitialized') {
            const { ship, data_account, external_observers, external_observers_keys } = event.data;
            console.log('\nDataAccountInitialized event:');
            console.log(`\tShip: ${ship.toBase58()}`);
            console.log(`\tData Account Count: ${data_account.toBase58()}`);
            console.log(`\tExternal Observers: ${external_observers.map((observer: PublicKey) => observer.toBase58()).join(', ')}`);
            console.log(`\tExternal Observers Keys: ${external_observers_keys.map((key: number[]) => Buffer.from(key).toString('hex')).join(' | ')}`);

            const timestamp = new Date();
            const timestampUnix = timestamp.getTime();
            const timestampString = timestamp.toLocaleString();

            parsedEvents.push({
                event: 'DataAccountInitialized',
                ship: ship.toBase58(),
                data_account: data_account.toBase58(),
                external_observers: external_observers.map((observer: PublicKey) => observer.toBase58()),
                external_observers_keys: external_observers_keys.map((key: number[]) => Buffer.from(key).toString('hex')),
                timestamp
            });

        }
    }
    return parsedEvents;
}

export function parseDataFingerprintAdded(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('3dnBfuMPHW52smosEsJwsnLGCR56DrphyUG68GqAcVxb'), coder);
    const events = eventParser.parseLogs(logs);
    const parsedEvents = [];
    for (let event of events) {
        if (event.name === 'DataFingerprintAdded') {
            const { ship, fingerprint, ciphertext, tag, iv, data_account } = event.data;
            const ciphertext_timestamp = event.data.ciphertext_timestamp.toNumber();

            const ciphertextTimestampDate = new Date(ciphertext_timestamp);
            const humanReadableDate = ciphertextTimestampDate.toLocaleString();
            console.log('\nDataFingerprintAdded event:');
            console.log(`\tShip: ${ship.toBase58()}`);
            console.log(`\tFingerprint: ${Buffer.from(fingerprint[0]).toString('hex')}`);
            console.log(`\tCiphertext: ${Buffer.from(ciphertext).toString('hex')}`);
            console.log(`\tTag: ${Buffer.from(tag).toString('hex')}`);
            console.log(`\tIV: ${Buffer.from(iv).toString('hex')}`);
            console.log(`\tData Account: ${data_account.toBase58()}`);
            console.log(`\tCiphertext Timestamp: ${humanReadableDate} (Unix Time: ${ciphertext_timestamp})`);

            parsedEvents.push({
                event: 'DataFingerprintAdded',
                ship: ship.toBase58(),
                fingerprint: Buffer.from(fingerprint[0]).toString('hex'),
                ciphertext: Buffer.from(ciphertext).toString('hex'),
                tag: Buffer.from(tag).toString('hex'),
                iv: Buffer.from(iv).toString('hex'),
                data_account: data_account.toBase58(),
                ciphertext_timestamp_unix: ciphertext_timestamp,
                ciphertext_timestamp_date: ciphertextTimestampDate,
            });
        }
    }
    return parsedEvents;
}

export function parseExternalObserverRequested(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('3dnBfuMPHW52smosEsJwsnLGCR56DrphyUG68GqAcVxb'), coder);
    const events = eventParser.parseLogs(logs);
    const parsedEvents = [];
    for (let event of events) {
        if (event.name === 'ExternalObserverRequested') {
            const { data_account, external_observer } = event.data;
            console.log('\nExternalObserverRequested event:');
            console.log(`\tData Account: ${data_account.toBase58()}`);
            console.log(`\tExternal Observer: ${external_observer.toBase58()}`);
            
            const timestamp = new Date();
            const timestampUnix = timestamp.getTime();
            const timestampString = timestamp.toLocaleString();

            parsedEvents.push({
                event: 'ExternalObserverRequested',
                data_account: data_account.toBase58(),
                external_observer: external_observer.toBase58(),
                timestamp
            });
        }
    }
    return parsedEvents;
}

export function parseExternalObserverAdded(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('3dnBfuMPHW52smosEsJwsnLGCR56DrphyUG68GqAcVxb'), coder);
    const events = eventParser.parseLogs(logs);
    const parsedEvents = [];
    for (let event of events) {
        if (event.name === 'ExternalObserverAdded') {
            const { data_account, external_observer, external_observers_account, ship_account, ship_management, external_observer_encrypted_master_key } = event.data;
            console.log('\nExternalObserverAdded event:');
            console.log(`\tData Account: ${data_account.toBase58()}`);
            console.log(`\tExternal Observer: ${external_observer.toBase58()}`);
            console.log(`\tExternal Observers Account: ${external_observers_account.toBase58()}`);
            console.log(`\tShip Account: ${ship_account.toBase58()}`);
            console.log(`\tShip Management: ${ship_management.toBase58()}`);
            console.log(`\tExternal Observer Encrypted Master Key: ${Buffer.from(external_observer_encrypted_master_key).toString('hex')}`);

            const timestamp = new Date();
            const timestampUnix = timestamp.getTime();
            const timestampString = timestamp.toLocaleString();

            parsedEvents.push({
                event: 'ExternalObserverAdded',
                data_account: data_account.toBase58(),
                external_observer: external_observer.toBase58(),
                external_observers_account: external_observers_account.toBase58(),
                ship_account: ship_account.toBase58(),
                ship_management: ship_management.toBase58(),
                external_observer_encrypted_master_key: Buffer.from(external_observer_encrypted_master_key).toString('hex'),
                timestamp_unix: timestampUnix,
                timestamp_string: timestampString
            });
        }
    }
    return parsedEvents;
}