import { FetchOptions, SearchParams } from 'ohmyfetch'
import { Ref, ref } from '@vue/reactivity'
import { IncomingMessage, ServerResponse } from 'http'
import { useCookie } from 'h3'
import { TailvueToast } from 'tailvue'
import { useAsyncData, useFetch } from '#app'
import { _AsyncData } from '#app/composables/asyncData'

export interface OAuthResult {
  token: string
  user: models.User
  provider: string
  error?: string
}

export interface AuthConfig {
  fetchOptions: FetchOptions
  req?: IncomingMessage
  res?: ServerResponse
  redirect: {
    logout: string
    login: undefined|string
  }
}

const authConfigDefaults:AuthConfig = {
  fetchOptions: {},
  req: undefined,
  res: undefined,
  redirect: {
    logout: '/',
    login: undefined,
  }
}

export default class Api {

  private token = ref<string|undefined>(undefined)
  public config: AuthConfig
  public $user = ref<models.User>(undefined)
  public $toast:TailvueToast
  public loggedIn = ref(false)

  constructor(config: AuthConfig, toast: TailvueToast) {
    this.$toast = toast
    this.config = { ...authConfigDefaults,...config }
    this.token.value = this.getToken()
    if (this.token.value)  {
      this.loggedIn.value = true
      this.setUser().then()
    }
  }

  async login (result: OAuthResult): Promise<undefined|string> {
    this.loggedIn.value = true
    this.token.value = result.token
    this.$user.value = result.user
    await this.set()
    return this.config.redirect.login
  }

  private async set(): Promise<string> {
    return await $fetch('/api/set', { params: { token: this.token.value } })
  }

  private getToken(): string {
    if (this.config.req) return useCookie(this.config.req, 'token')
    return `; ${document.cookie}`.split(`; token=`).pop().split(';').shift()
  }

  private fetchOptions(params?: SearchParams): FetchOptions {
    const fetchOptions = this.config.fetchOptions
    fetchOptions.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.value}`,
    }
    if (params) this.config.fetchOptions.params = params
    return this.config.fetchOptions
  }

  private async setUser(): Promise<void> {
    const result = await $fetch<api.MetApiResponse & { data: models.User }>('/me', this.fetchOptions())
    this.$user.value = result.data
  }

  public async index <Results>(endpoint: string, params?: SearchParams): Promise<api.MetApiResults & { data: Results }> {
    try {
      return (await $fetch<api.MetApiResults & { data: Results }>(endpoint, this.fetchOptions(params)))
    } catch (error) {
      if (error.response.data.exception) {
        this.$toast.show({
          type: 'danger',
          message: `<b>[${error.response.data.exception}]</b> <br /> ${error.response.data.message} <br /> <a href="phpstorm://open?file=/${error.response.data.file}&line=${error.response.data.line}">${error.response.data.file}:${error.response.data.line}</a>`,
          timeout: 0,
        })
      } else {
      for (const err of error.response.data.errors)
        this.$toast.show({
          type: 'danger',
          message: err.detail ?? err.message ?? '',
          timeout: 0,
        })
      }
    }
  }


  public async logout (): Promise<api.MetApiResponse> {
    const response = (await $fetch<api.MetApiResponse>('/logout', this.config.fetchOptions)).data
    // if (this.config.req) setCookie(this.config.res, 'token', '', { maxAge: -99999 })
    this.invalidate()
    return response
  }

  private invalidate (): void {
    this.token = undefined
    this.loggedIn.value = false
    this.$user.value = undefined
    //if (this.config.req) setCookie(this.config.res, 'token', '', { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') })
    if (!this.config.req) document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}
