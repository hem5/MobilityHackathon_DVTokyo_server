# About

- This is dockerised project using Node.js.
- This repository includes server side code to control power supply between vehicle to vehicle.
- Communicate to smartphone via HTTP, to IoT device via MQTT, and Ethereum blockchain via jsonrpc on HTTP.
- blockchain information
  - Ethereum testnet (Rinkeby)
  - ERC20 based token
  - use Infura.io as Ethreum client
  - contract address: `0xf2F265c6c9c8232a08B55EF82D1ECEeD9347b9E3`

# Commands

## Build

```
$ sh script/build/all.sh
```

## Start containers

```
$ sh script/dev/start.sh
```

## Finish containers

```
$ sh script/dev/stop.sh
```

## Enter inside the container

```
$ sh script/dev/enter.sh
```

# AWS settings
This project was deployed on AWS instance with the following properties- 


| Setting Name      | Setting Value                                                       |
|-------------------|-------------------------------------------------------------|
| Instance type     | t2.xlarge                                                   |
| AMI ID            | amzn-ami-hvm-2017.09.1.20180115-x86_64-gp2 (ami-ceafcba8)   |                           |
| EBS-optimized     | False                                                       |
| Root device type  | ebs                                                         |


# Testing the APIs

## Download And install POSTMAN tool (REST client)
https://www.getpostman.com/

## Import json file
API-AWS.postman_collection.jso is present in root project directory.
Import this file into POSTMAN tool.

Replace the IP address appropriately.
E.x when testing on localhost
Change
```
http://<IP address>:3000/api/manuals
```
To
```
http://localhost:3000/api/manuals
```
