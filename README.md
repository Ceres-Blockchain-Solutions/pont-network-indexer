# Pont Network Indexer

This repository contains code for indexing the Solana blockchain so observer stations can track data and verify its integrity.

## Indexed Events

1. **Ship Initialized**
   
   A new ship has been registered in the network.
   ```rust
   #[event]
   pub struct ShipInitialized {
       pub ship: Pubkey,
       pub ship_management: Pubkey,
   }
   ```
   <br/>

2. **Data Account Initialized**

    A new sailing has been initialized for the ship.
    ```rust
    #[event]
    pub struct DataAccountInitialized {
        pub ship: Pubkey,
        pub data_account: Pubkey,
        pub external_observers: Vec<Pubkey>,
        pub external_observers_keys: Vec<[u8; 128]>,
    }
    ```
    <br/>

3. **Data Fingerprint Added**

    New sensor readings have been submitted to the Solana blockchain.
    ```rust
    #[event]
    pub struct DataFingerprintAdded {
        pub ship: Pubkey,
        pub fingerprint: Fingerprint,
        pub ciphertext: Vec<u8>,
        pub tag: Vec<u8>,
        pub iv: Vec<u8>,
        pub ciphertext_timestamp: u64,
        pub data_account: Pubkey,
    }
    ```
    <br/>

4. **External Observer Requested**

    An observing station is requesting access.
    ```rust
    #[event]
    pub struct ExternalObserverRequested {
        pub data_account: Pubkey,
        pub external_observer: Pubkey,
    }
    ```
    <br/>

5. **External Observer Added**

    Ship management has approved the external observer.
    ```rust
    #[event]
    pub struct ExternalObserverAdded {
        pub data_account: Pubkey,
        pub external_observer: Pubkey,
        pub external_observers_account: Pubkey,
        pub ship_account: Pubkey,
        pub ship_management: Pubkey,
        pub external_observer_encrypted_master_key: [u8; 128],
    }
    ```
