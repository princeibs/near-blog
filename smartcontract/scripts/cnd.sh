#!/bin/bash
yarn asb
echo "------------------------------------------"
near deploy --accountId=nblog.ibs.testnet --wasmFile=../build/release/smartcontract.wasm