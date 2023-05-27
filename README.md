# Bitcoin to UAH exchange rate API

## Manual setup
1) **Clone the repository**

2) **Build docker image**

To build docker image you need to write this command in terminal inside root directory of cloned project:
```shell
docker build . -t [image name]
```
3) **Run docker image by this command:**

```shell
docker run -p 8890:8890 -d [image name]
```

After success steps, you will be able to call the API which is running on **8890** port.
You can use Postman to test the api.

### API endpoints:
>1) **/rate** - Get the current BTC to UAH exchange rate
>2) **/subscribe** - Add email that will receive current BTC to UAH exchange rate
>   1) Require **email** parameter in application/x-www-form-urlencoded content type
>3) **/sendEmails** - Send email with current BTC to UAH exchange rate to all subscribed emails
