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
