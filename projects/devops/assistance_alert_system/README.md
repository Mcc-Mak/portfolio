# Assistance - Monitoring Alert
## Specifications
```shell
docker network create -d bridge \
  --subnet=172.32.0.0/24 \
  --gateway=172.32.0.1 \
  monitoring-alert
```
## Progress
|Status|Service|Description|
|:---|:---|:---|
|:green_circle:|Telegram|`(n.a.)`|
|:green_circle:|Email|Internet|
|:green_circle:|Email|Intranet|
## Services
### Telegram
Refer to [_*README.md*_](telegram/README.md)
### Email
Refer to [_*README.md*_](email/README.md)
#### Internet
- __Mail Server Settings__
  - __Internet__
    ```shell
    INTERNET_SMTP_HOST="smtp.gmail.com"
    INTERNET_SMTP_PORT="587"
    INTERNET_SMTP_USE_TLS="true"
    ```
- __Sender__
  - __Credential(s)__
    - __Internet__
        ```shell
        INTERNET_SMTP_USER="hko.ccmak.timesheet.5804@gmail.com"
        INTERNET_SMTP_PASSWORD=<PASSCODE>
        ```
  - __`Optional:`__ Nickname
    ```shell
    SMTP_FROM="martinmcc5804@gmail.com"
    ```
#### Intranet
- __Mail Server Settings__
  - __Intranet__
    ```shell
    INTRANET_SMTP_HOST="imail2.hko.hksarg"
    INTRANET_SMTP_PORT="25"
    INTRANET_SMTP_USE_TLS="false"
    ```
- __Sender__
  - __Credential(s)__
    - __Intranet__
        ```shell
        INTRANET_SMTP_USER="hkoqeme@hko.hksarg"
        INTRANET_SMTP_PASSWORD=<PASSWORD>
        ```
  - __`Optional:`__ Nickname
    ```shell
    SMTP_FROM="martinmcc5804@gmail.com"
    ```