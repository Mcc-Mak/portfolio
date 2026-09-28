# Assistance - Monitoring Alert (Email.{Intranet,Internet}.Sender)
## Installation
> [!IMPORTANT]
> Run under `email/`:
> ```shell
> docker-compose build --no-cache \
>   && docker-compose up -d
> ```

> [!CAUTION]
> Running this code will permanently destroy both the container and image. Proceed with care.
> 
> ```shell
> docker rm -f monitoring-alert-email \
>   && docker rmi monitoring-alert-email
> ```
## Environment
- __Mail Server Settings__
  - __Internet__
    ```shell
    INTERNET_SMTP_HOST="smtp.gmail.com"
    INTERNET_SMTP_PORT="587"
    INTERNET_SMTP_USE_TLS="true"
    ```
  - __Intranet__
    ```shell
    INTRANET_SMTP_HOST="imail2.hko.hksarg"
    INTRANET_SMTP_PORT="25"
    INTRANET_SMTP_USE_TLS="false"
    ```
- __Sender__
  - __Credential(s)__
    - __Internet__
        ```shell
        INTERNET_SMTP_USER="hko.ccmak.timesheet.5804@gmail.com"
        INTERNET_SMTP_PASSWORD=<PASSCODE>
        ```
    - __Intranet__
        ```shell
        INTRANET_SMTP_USER="hkoqeme@hko.hksarg"
        INTRANET_SMTP_PASSWORD=<PASSWORD>
        ```
  - __`Optional:`__ Nickname
    ```shell
    SMTP_FROM="martinmcc5804@gmail.com"
    ```
- __Recipient(s)__
  - __CASIS__
    ```shell
    SMTP_TO_CASIS="ccmak@hko.hksarg"
    ```
  - __QEM__
    ```shell
    SMTP_TO_QEM="ccmak@hko.hksarg"
    ```
  - __GMAIL__
    ```shell
    SMTP_TO_GMAIL="martinmcc5804@gmail.com"
    ```
## FAQ
### How to setup `App Password` for `Gmail`?
Goto [`App Password (Gmail)`](https://myaccount.google.com/apppasswords)