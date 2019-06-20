import Vue from 'vue'
import Component from 'vue-class-component'

import {RequestElement, Action} from '../src/index'

@Component({
  props: {
    qrOptions: Object,
    shouldRenderButton: Object,
    buttonOptions: Object,
  },
})
class Updating extends Vue {
  counter = 0

  getData() {
    return {
      action: Action.attestation,
      token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
      url: 'https://receive-kit.bloom.co/api/receive',
      org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
      org_name: `Bloom ${this.counter}`,
      org_usage_policy_url: 'https://bloom.co/legal/terms',
      org_privacy_policy_url: 'https://bloom.co/legal/privacy',
      types: ['phone', 'email'],
    }
  }

  handleUpdate() {
    this.counter = this.counter + 1
  }

  render(h) {
    const {getData, handleUpdate, qrOptions, buttonOptions, shouldRenderButton} = this
    return (
      <fragment>
        <RequestElement
          buttonOptions={buttonOptions}
          shouldRenderButton={shouldRenderButton}
          qrOptions={qrOptions}
          requestData={getData()}
        />
        <button onClick={handleUpdate}>Update RequestQRCode</button>
      </fragment>
    )
  }
}

export {Updating}
