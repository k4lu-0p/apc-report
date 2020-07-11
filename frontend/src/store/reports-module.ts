import { VuexModule, Action, Mutation, Module } from 'vuex-class-modules';
import store from '../store';
import axios from 'axios';
import $const from '../constants';
import { authModule } from './auth-module';

@Module()
class ReportsModule extends VuexModule {
  // State
  private reports: Array<object> = [];
  private status: string = '';

  // Mutation
  @Mutation
  public setReports(reports: Array<object>) {
    this.reports = reports;
  }
  @Mutation
  public setStatus(status: string) {
    this.status = status;
  }

  // Getters
  get requestStatus(): string {
    return this.status;
  }
  get allReportsUser(): Array<object> {
    return this.reports
  }

  // Actions
  @Action
  async fetchUserReports() {
    const token: string = authModule.userToken;
    const endpoint: string = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.FETCH_REPORTS}`;
    const config: object = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      this.setStatus($const.API.STATUS.LOADING);
      const { data: reports } = await axios.get(endpoint, config);
      localStorage.setItem('reports', JSON.stringify(reports));
      this.setReports(reports);
      this.setStatus($const.API.STATUS.SUCCESS);
    } catch (error) {
      this.setStatus($const.API.STATUS.ERROR);
      if (error.response) {
        if (error.response.status === 401) {
          this.setStatus($const.API.STATUS.UNAUTHORIZED);
        }
      }
    }
  }
}

export const reportsModule = new ReportsModule({ store, name: 'report' })
