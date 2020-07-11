import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from '../store';
import axios from 'axios';
import $const from '../constants';

@Module
class AuthModule extends VuexModule {
  // State
  private user: object = {};
  private token: string = localStorage.getItem('token') || '';
  private status: string = '';

  // Getters
  get userToken(): string {
    return this.token;
  }
  get isLoggedIn(): boolean {
    return !!this.token;
  }
  get authStatus(): string {
    return this.status;
  }

  // Mutations
  @Mutation
  public setAuthStatus(status: string): void {
    this.status = status;
  }
  @Mutation
  public setToken(token: string): void {
    this.token = token;
  }
  @Mutation
  public setUser(user: object): void {
    this.user = user;
  }
  @Mutation
  public logout(): void {
    this.status = '';
    this.token = '';
  }

  // Actions
  @Action
  public async login(payload: object) {
    const endpoint: string = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.LOGIN}`;
    try {
      this.setAuthStatus($const.API.STATUS.LOADING);
      const { data: { user, token } } = await axios.post(endpoint, payload);
      this.setAuthStatus($const.API.STATUS.SUCCESS);
      this.setToken(token);
      this.setUser(user);
      localStorage.setItem('token', token);
    } catch (error) {
      this.setAuthStatus($const.API.STATUS.ERROR);
      localStorage.removeItem('token');
    }
  }
};

export const authModule = new AuthModule({ store, name: 'auth' });
