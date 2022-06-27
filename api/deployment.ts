import axios from 'axios';
import { gameConfig } from './types/index';

const api = axios.create();
api.defaults.baseURL = process.env.BACKEND_URL;

export const publishDeployment = async (gameConfig: gameConfig) => {
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

export const addTask = async (task: any) => {
  try {
    const { data } = await api.post(`/task/add`, task);

    if (data) {
      console.log('Added task successfully');
    }
  } catch (err) {
    console.log(err);
  }
};

export const setTaskActiveMode = async (network: string, address: string, status: string) => {
  try {
    const { data } = await api.post(`/task/setStatus`, { network: network, address: address, status: status });
    if (data) {
      console.log(`Set task from ${address} on network ${network} to ${status} mode successful!`);
    }
  } catch (err) {
    console.log(err);
  }
};
