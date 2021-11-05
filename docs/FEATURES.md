# Flowser features

- **Emulator configuration**
    - add support for all config variables defined [here](https://github.com/onflow/flow-emulator#configuration)
    - setup & manage multiple independant emulators from the Flowser UI
- **Blockchain explorer:**
    - accounts
        - transactions
        - contracts (cadence syntax highlighting)
        - keys
        - storage (nicely formatted & highlighted json view)
    - blocks
        - transactions
        - collections
    - transactions
        - script (cadence syntax highlighting)
        - signatures
        - events
    - contracts
        - code
    - events
        - data
- **Emulator logs**
    - View and easily search through the log output of the emulator.
    - Nicely highlighted & formatted log syntax
- **Support for other networks**
    - "out of the box" support for other flow networks (currently testnet, possibly mainnet in the future)
    - app is containerised and is therefore easily deployable/portable to any server or cloud provider
- **Native support for [fcl-dev-wallet](https://github.com/onflow/fcl-dev-wallet)**
    - log in with service account
    - send arbitrary transactions (tx arguments are also supported)