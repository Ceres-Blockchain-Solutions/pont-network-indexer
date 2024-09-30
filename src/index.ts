import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from '@solana/web3.js';
import {BorshCoder, EventParser, Program} from '@coral-xyz/anchor';
// import { PontNetwork } from "./types/pont_network";
import pontNetworkIdl from './types/pont_network.json';
import { parseShipInitialized, parseDataAccountInitialized, parseDataFingerprintAdded, parseExternalObserverRequested, parseExternalObserverAdded } from './eventParsers';
import { Collection, MongoClient } from "mongodb";
import { DataAccountDocument } from "./schemas/dataAccount";

const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

const programId = new PublicKey('3dnBfuMPHW52smosEsJwsnLGCR56DrphyUG68GqAcVxb');

// const eventParser = new EventParser(programId, new BorshCoder(pontNetworkIdl as anchor.Idl));

// connection.onProgramAccountChange(programId, (accountInfo) => {
//     console.log('Account change detected:', accountInfo);
// });

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('pontNetwork');
        const shipsCollection = database.collection('ships');
        const dataAccountsCollection: Collection<DataAccountDocument> = database.collection('dataAccounts');
        const dataFingerprintsCollection = database.collection('dataFingerprints');
        const externalObserverRequestsCollection = database.collection('externalObserverRequests');
        const externalObserverAddedEventsCollection = database.collection('externalObserverAddedEvents');

        connection.onLogs('all', async (logs) => {
            const dataAccountEvents = parseDataAccountInitialized(logs.logs);
            const shipEvents = parseShipInitialized(logs.logs);
            const dataFingerprintEvents = parseDataFingerprintAdded(logs.logs);
            const externalObserverRequestEvents = parseExternalObserverRequested(logs.logs);
            const externalObserverAddedEvents = parseExternalObserverAdded(logs.logs);

            for (let event of shipEvents) {
                await shipsCollection.insertOne(event);
                console.log('Ship event stored in MongoDB:', event);
            }

            for (let event of dataAccountEvents) {
                await dataAccountsCollection.insertOne(event);
                console.log('Data Account event stored in MongoDB:', event);
            }
            
            for (let event of dataFingerprintEvents) {
                const exists = await dataFingerprintsCollection.findOne({ fingerprint: event.fingerprint });
                if (!exists) {
                    await dataFingerprintsCollection.insertOne(event);
                    console.log('Data Fingerprint event stored in MongoDB:', event);
                }
            }

            for (let event of externalObserverRequestEvents) {
                await externalObserverRequestsCollection.insertOne(event);
                console.log('External Observer Request event stored in MongoDB:', event);
            }

            for (let event of externalObserverAddedEvents) {
                await externalObserverAddedEventsCollection.insertOne(event);
                console.log('External Observer Added event stored in MongoDB:', event);

                await dataAccountsCollection.updateOne(
                    { data_account: event.data_account },
                    {
                        $push: {
                            external_observers: event.external_observer,
                            external_observers_keys: event.external_observer_encrypted_master_key
                        }
                    },
                    { upsert: true }
                );

            }
            
        });

        console.log('Solana indexer running...');
    } finally {
        // Ensure the client will close when you finish/error
        // await client.close();
    }
}

run().catch(console.dir);