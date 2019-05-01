import { VNode, CreateElement } from 'vue'
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'
import {
  renderRequestElement,
  RequestData,
  QROptions,
  ShouldRenderButton,
  RequestElementResult,
} from '@bloomprotocol/share-kit'

@Component
class RequestElement extends Vue {
  private requestElementResult: RequestElementResult
  $refs!: {
    containerRef: HTMLElement
  }
  
  @Prop() requestData!: RequestData
  @Prop() qrOptions?: Partial<QROptions>
  @Prop() shouldRenderButton?: ShouldRenderButton
  @Prop() buttonCallbackUrl: string

  mounted() {
    if (!this.$refs.containerRef) return

    const {requestData, shouldRenderButton, qrOptions, buttonCallbackUrl} = this
    this.requestElementResult = renderRequestElement({
      container: this.$refs.containerRef,
      requestData,
      qrOptions,
      shouldRenderButton,
      buttonCallbackUrl,
    })
  }

  @Watch('requestData')
  @Watch('qrOptions')
  @Watch('buttonCallbackUrl')
  onPropertyChanged() {
    const {requestData, qrOptions, buttonCallbackUrl} = this
    this.requestElementResult.update({requestData, qrOptions, buttonCallbackUrl})
  }

  beforeDestroy() {
    this.requestElementResult.remove()
  }

  render(h: CreateElement): VNode {
    const {requestData, shouldRenderButton, qrOptions, buttonCallbackUrl, ...rest} = this
    return <div {...rest} ref="containerRef" />
  }
}

export {RequestElement}
