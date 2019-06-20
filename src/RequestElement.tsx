import {VNode, CreateElement} from 'vue'
import {Component, Watch, Prop, Vue} from 'vue-property-decorator'
import {
  renderRequestElement,
  RequestData,
  QROptions,
  ButtonOptions,
  ShouldRenderButton,
  RequestElementResult,
} from '@bloomprotocol/share-kit'

@Component
class RequestElement extends Vue {
  private requestElementResult: RequestElementResult | null = null
  $refs!: {
    containerRef: HTMLElement
  }

  @Prop() requestData!: RequestData
  @Prop() qrOptions?: Partial<QROptions>
  @Prop() shouldRenderButton?: ShouldRenderButton
  @Prop() buttonOptions!: ButtonOptions

  mounted() {
    if (!this.$refs.containerRef) return

    const {requestData, shouldRenderButton, qrOptions, buttonOptions} = this
    this.requestElementResult = renderRequestElement({
      container: this.$refs.containerRef,
      requestData,
      qrOptions,
      shouldRenderButton,
      buttonOptions,
    })
  }

  @Watch('requestData')
  @Watch('qrOptions')
  @Watch('buttonOptions')
  onPropertyChanged() {
    if (!this.requestElementResult) return

    const {requestData, qrOptions, buttonOptions} = this
    this.requestElementResult.update({requestData, qrOptions, buttonOptions})
  }

  beforeDestroy() {
    if (this.requestElementResult) {
      this.requestElementResult.remove()
    }
  }

  render(h: CreateElement): VNode {
    const {requestData, shouldRenderButton, qrOptions, buttonOptions, ...rest} = this
    return <div {...rest} ref="containerRef" />
  }
}

export {RequestElement}
