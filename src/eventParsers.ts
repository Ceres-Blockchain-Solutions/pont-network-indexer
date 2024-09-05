import * as anchor from "@coral-xyz/anchor";
import { EventParser, BorshCoder } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import pontNetworkIdl from './types/pont_network.json';

const coder = new BorshCoder(pontNetworkIdl as anchor.Idl);

export function parseShipInitialized(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('ApvfQGqW8kzLyiG8x8PTrWJS7o2uLxXNjns6bYLh3H1R'), coder);
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
    const eventParser = new EventParser(new PublicKey('ApvfQGqW8kzLyiG8x8PTrWJS7o2uLxXNjns6bYLh3H1R'), coder);
    const events = eventParser.parseLogs(logs);
    const parsedEvents = [];
    for (let event of events) {
        if (event.name === 'DataAccountInitialized') {
            const { ship, data_acc_count, external_observers, external_observers_keys } = event.data;
            console.log('\nDataAccountInitialized event:');
            console.log(`\tShip: ${ship.toBase58()}`);
            console.log(`\tData Account Count: ${data_acc_count}`);
            console.log(`\tExternal Observers: ${external_observers.map((observer: PublicKey) => observer.toBase58()).join(', ')}`);
            console.log(`\tExternal Observers Keys: ${external_observers_keys.map((key: number[]) => Buffer.from(key).toString('hex')).join(' | ')}`);

            const timestamp = new Date();
            const timestampUnix = timestamp.getTime();
            const timestampString = timestamp.toLocaleString();

            parsedEvents.push({
                event: 'DataAccountInitialized',
                ship: ship.toBase58(),
                data_acc_count,
                external_observers: external_observers.map((observer: PublicKey) => observer.toBase58()),
                external_observers_keys: external_observers_keys.map((key: number[]) => Buffer.from(key).toString('hex')),
                timestamp
            });

        }
    }
    return parsedEvents;
}

export function parseDataFingerprintAdded(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('ApvfQGqW8kzLyiG8x8PTrWJS7o2uLxXNjns6bYLh3H1R'), coder);
    const events = eventParser.parseLogs(logs);
    const parsedEvents = [];
    for (let event of events) {
        if (event.name === 'DataFingerprintAdded') {
            const { ship, fingerprint, data } = event.data;
            const data_timestamp = event.data.data_timestamp.toNumber();

            const humanReadableDate = new Date(data_timestamp).toLocaleString();
            console.log('\nDataFingerprintAdded event:');
            console.log(`\tShip: ${ship.toBase58()}`);
            console.log(`\tFingerprint: ${Buffer.from(fingerprint[0]).toString('hex')}`);
            console.log(`\tData: ${Buffer.from(data).toString('utf-8')}`);
            console.log(`\tData Timestamp: ${humanReadableDate} (Unix Time: ${data_timestamp})`);

            const timestamp = new Date();
            const timestampUnix = timestamp.getTime();
            const timestampString = timestamp.toLocaleString();

            parsedEvents.push({
                event: 'DataFingerprintAdded',
                ship: ship.toBase58(),
                fingerprint: Buffer.from(fingerprint[0]).toString('hex'),
                data: Buffer.from(data).toString('utf-8'),
                data_timestamp: humanReadableDate,
                timestamp
            });
        }
    }
    return parsedEvents;
}

export function parseExternalObserverRequested(logs: string[]) {
    const eventParser = new EventParser(new PublicKey('ApvfQGqW8kzLyiG8x8PTrWJS7o2uLxXNjns6bYLh3H1R'), coder);
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