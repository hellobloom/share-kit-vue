import Vue from 'vue'
import Component from 'vue-class-component'
import {RequestElement} from '../src/index'

@Component({
  props: {
    requestData: Object,
    qrOptions: Object,
    shouldRenderButton: Object,
    buttonCallbackUrl: String,
  },
})
class Logo extends Vue {
  hideLogo = false
  toggleLogo() {
    this.hideLogo = !this.hideLogo
  }
  render(h) {
    const {hideLogo, toggleLogo, qrOptions, requestData, buttonCallbackUrl, shouldRenderButton} = this
    return (
      <div>
        <input type="checkbox" checked={hideLogo} onChange={toggleLogo} />
        <label>Hide center logo</label>
        <br />
        <RequestElement
          requestData={requestData}
          buttonCallbackUrl={buttonCallbackUrl}
          shouldRenderButton={shouldRenderButton}
          qrOptions={{...(qrOptions || {}), hideLogo}}
        />
      </div>
    )
  }
}

export {Logo}
