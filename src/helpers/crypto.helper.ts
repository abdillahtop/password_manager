import * as CryptoJS from 'crypto-js';
import { GlobalConfig } from 'src/configs/app.config';

export abstract class CryptoHelper {
  public static encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data, GlobalConfig.secretKey).toString();
  };

  public static decrypt = (data: string): string => {
    if (data === null) return null;
    return CryptoJS.AES.decrypt(data, GlobalConfig.secretKey).toString(
      CryptoJS.enc.Utf8,
    );
  };
}
