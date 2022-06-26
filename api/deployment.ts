import axios from 'axios';
import { gameConfig } from './types/index';

const { BACKEND_URL } = process.env;

export const publishDeployment = async (gameConfig: gameConfig) => {
  try {
    console.log('Backend URL', BACKEND_URL);
    const { data } = await axios.post(`${BACKEND_URL}/deployments/add`, gameConfig);

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
    const { data } = await axios.post(`${BACKEND_URL}/task/add`, task);

    if (data) {
      // check for data flags
      console.log('Added task successfully');
    }
  } catch (err) {
    console.log(err);
  }
};

interface setTaskActive {}

export const setTaskActiveMode = async (network: string, address: string, status: string) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/task/setStatus`, { network: network, address: address, status: status });
  } catch (err) {
    console.log(err);
  }
};
