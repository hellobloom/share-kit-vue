![Share Kit Vue](https://github.com/hellobloom/share-kit/raw/master/images/logo.png)

# Share Kit Vue

Vue wrapper for [Share Kit](https://github.com/hellobloom/share-kit#readme)

- [Share Kit Vue](#share-kit-vue)
  - [Installation](#installation)
  - [Usage](#usage)
  - [More](#more)

## Installation

```
npm install --save @bloomprotocol/share-kit-vue
```

### Known Installation Issues
In the past we've received reports of users encountering problems with installation. The most likely cause is our [node-gyp](https://github.com/nodejs/node-gyp) dependecy. Please make sure you follow the [installation docs for your platform here](https://github.com/nodejs/node-gyp#installation) and if that doesn't work reach out.

## Usage

`RequestElement` will render a QR code or button based on the client's platform. By defualt it will render a button when the client is mobile or tablet and on iOS.

```tsx
import {RequestElement, RequestData, QROptions, ButtonOptions} from '@bloomprotocol/share-kit-vue'

const requestData: RequestData = {...}
const buttonOptions: ButtonOptions = {
  callbackUrl: 'https://mysite.com/bloom-callback'
}

<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
/>

// Setting QR Options

const qrOptions: Partial<QROptions> = {
  size: 200,
}

<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
  qrOptions={qrOptions}
/>

// Overriding shouldRenderButton
<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
  shouldRenderButton={(parsedResult) => {
    if (parsedResult.platform.type === 'mobile') return true

    return false
  }}
/>

// Passing props to the container
<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
  className="request-element-container"
/>
```


## More

For more information and documentation see [Share Kit](https://github.com/hellobloom/share-kit#readme)
