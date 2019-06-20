import {storiesOf} from '@storybook/vue'

import {Logo} from './Logo'
import {Updating} from './Updating'
import {Action, RequestElement} from '../src/index'

const defaultData = {
  action: Action.attestation,
  token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}

const buttonCallbackUrl = 'https://mysite.com/bloom-callback'

storiesOf('RequestElement', module)
  .add('Base', () => ({
    render: h => <RequestElement requestData={defaultData} buttonOptions={{callbackUrl: buttonCallbackUrl}} />,
  }))
  .add('Colors', () => ({
    render: h => (
      <RequestElement
        requestData={defaultData}
        buttonOptions={{callbackUrl: buttonCallbackUrl}}
        qrOptions={{bgColor: '#EBF0F1', fgColor: '#3C3C3D'}}
      />
    ),
  }))
  .add('Logo', () => ({
    render: h => <Logo requestData={defaultData} buttonOptions={{callbackUrl: buttonCallbackUrl}} />,
  }))
  .add('Size', () => ({
    render: h => <RequestElement requestData={defaultData} buttonOptions={{callbackUrl: buttonCallbackUrl}} qrOptions={{size: 300}} />,
  }))
  .add('Updating', () => ({
    render: h => <Updating buttonOptions={{callbackUrl: buttonCallbackUrl}} />,
  }))
  .add('Button', () => ({
    render: h => (
      <div style={{width: '335px'}}>
        <RequestElement requestData={defaultData} buttonOptions={{callbackUrl: buttonCallbackUrl}} shouldRenderButton={() => true} />
      </div>
    ),
  }))
