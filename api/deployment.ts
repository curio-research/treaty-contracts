import axios from 'axios';
import { assert } from 'console';
import { GameConfig } from './types/index';

const api = axios.create();
api.defaults.baseURL = process.env.BACKEND_URL;

export const publishDeployment = async (gameConfig: GameConfig) => {
  try {
    const { data } = await api.post(`/deployments/add`, gameConfig);

    if (data) {
      // check for data flags
      console.log('Published successfully');
    }
  } catch (err) {
    // check for data flags
    console.log(err);
  }
};

export const isConnectionLive = async (): Promise<boolean> => {
  try {
    const { data } = await api.get(`/check`);
    return data.status === 'success';
  } catch (err: any) {
    throw new Error(err.message);
  }
};
