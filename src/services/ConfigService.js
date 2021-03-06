import axios from 'axios';
import config from '../appConf';

const headers = {
  Accept: 'application/json',
};

class ConfigService {
  static async setConfigVariables() {
    const { data } = await axios.get('/config', { ...headers });
    config.uri = { ...data.uri };
    config.length_limitations = { ...data.length_limitations };
    config.roles = { ...data.roles };
    config.token_name = data.token_name;
  }
}

export default ConfigService;
