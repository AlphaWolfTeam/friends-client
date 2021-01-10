import { configInstance } from '../axiosConf';
import config from '../appConf';

class ConfigService {
  static async getConfigObject() {
    const { data } = await configInstance.get('/');
    config = { ...config, ...data };
    config.roles.forEach((roleObject) => {
      switch (roleObject.role) {
        case 'member':
          roleObject.value = data.memberRoleValue;
          break;
        case 'manager':
          roleObject.value = data.managerRoleValue;
          break;
        default:
          break;
      }
    });
  }
}

export default ConfigService;