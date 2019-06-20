import { mount } from '@vue/test-utils';
import * as shareKit from '@bloomprotocol/share-kit'

import {RequestElement} from './RequestElement'
import {Action, QROptions, RequestData} from '../'

const requestData: RequestData = {
  action: Action.attestation,
  token: 'token',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}
const requestData2: RequestData = {
  action: Action.attestation,
  token: 'token 2',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}

const buttonCallbackUrl = 'https://mysite.com/bloom-callback'
const buttonCallbackUrl2 = 'https://mysite.com/bloom-callback-2'

const qrOptions: Partial<QROptions> = {size: 300}

describe('RequestElement', () => {
  test('calls renderRequestElement with correct params', () => {
    const shareKitSpy = jest.spyOn(shareKit, 'renderRequestElement')
    const called: string[] = []

    const testRequestElement:any = mount(RequestElement, {
      propsData: {
        requestData,
        buttonCallbackUrl,
        qrOptions,
        shouldRenderButton: () => {
          called.push('shouldRenderButton')
          return true
        }
      }
    })

    expect(shareKitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        container: expect.any(HTMLElement),
        requestData: expect.objectContaining(requestData),
        qrOptions: expect.objectContaining(qrOptions),
        shouldRenderButton: expect.any(Function),
      })
    )
    expect(called).toHaveLength(1)
    expect(called).toContain('shouldRenderButton')
    testRequestElement.destroy();
  })

  describe('updates when', () => {
    test('requestData changes', () => {
      const result:any = mount(RequestElement, {
        propsData: {
          requestData,
          buttonCallbackUrl,
          qrOptions,
          shouldRenderButton: () => true
        }
      })

      const search = result.find('a').attributes('href').replace('https://bloom.co/download', '')
      const urlParams = new URLSearchParams(search)

      const requestParam = urlParams.get('request')
      const callbackUrlParam = urlParams.get('callback-url')

      if (typeof requestParam !== 'string' || typeof callbackUrlParam !== 'string') {
        if (typeof requestParam !== 'string') {
          fail(`requestParam is not set: ${urlParams}`)
        }

        if (typeof callbackUrlParam !== 'string') {
          fail('callbackUrlParam is not set')
        }
      } else {
        expect(JSON.parse(window.atob(requestParam))).toMatchSnapshot()
        expect(callbackUrlParam).toMatchSnapshot()

        result.setProps({
          requestData: requestData2
        })

        const search2 = String(result.find('a').attributes('href')).replace('https://bloom.co/download', '')
        const urlParams2 = new URLSearchParams(search2)

        const requestParam2 = urlParams2.get('request')
        const callbackUrlParam2 = urlParams2.get('callback-url')

        if (typeof requestParam2 !== 'string' || typeof callbackUrlParam2 !== 'string') {
          if (typeof requestParam2 !== 'string') {
            fail('requestParam is not set')
          }

          if (typeof callbackUrlParam2 !== 'string') {
            fail('callbackUrlParam is not set')
          }
        } else {
          expect(JSON.parse(window.atob(requestParam2))).toMatchSnapshot()
          expect(callbackUrlParam2).toMatchSnapshot()
        }
      }

      result.destroy()
    })

    test('buttonCallbackUrl changes', () => {
      const result = mount(RequestElement, {
        propsData: {
          requestData,
          buttonCallbackUrl,
          qrOptions,
          shouldRenderButton: () => true
        }
      })

      const search = String(result.find('a').attributes('href')).replace('https://bloom.co/download', '')
      const urlParams = new URLSearchParams(search)

      const requestParam = urlParams.get('request')
      const callbackUrlParam = urlParams.get('callback-url')

      if (typeof requestParam !== 'string' || typeof callbackUrlParam !== 'string') {
        if (typeof requestParam !== 'string') {
          fail('requestParam is not set')
        }

        if (typeof callbackUrlParam !== 'string') {
          fail('callbackUrlParam is not set')
        }
      } else {
        expect(JSON.parse(window.atob(requestParam))).toMatchSnapshot()
        expect(callbackUrlParam).toMatchSnapshot()

        result.setProps({
          buttonCallbackUrl: buttonCallbackUrl2
        })

        const search2 = String(result.find('a').attributes('href')).replace('https://bloom.co/download', '')
        const urlParams2 = new URLSearchParams(search2)

        const requestParam2 = urlParams2.get('request')
        const callbackUrlParam2 = urlParams2.get('callback-url')

        if (typeof requestParam2 !== 'string' || typeof callbackUrlParam2 !== 'string') {
          if (typeof requestParam2 !== 'string') {
            fail('requestParam is not set')
          }

          if (typeof callbackUrlParam2 !== 'string') {
            fail('callbackUrlParam is not set')
          }
        } else {
          expect(JSON.parse(window.atob(requestParam2))).toMatchSnapshot()
          expect(callbackUrlParam2).toMatchSnapshot()
        }
      }
      result.destroy()
    })
  })
})
