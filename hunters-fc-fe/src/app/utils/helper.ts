import { JWT_TOKEN } from '../constants/constants';
import { DeviceType } from '../constants/enums';

function getJwtToken(): string {
  return localStorage.getItem(JWT_TOKEN)!;
}

export function getRequestOption() {
  const token = getJwtToken();
  const headers = { authorization: token };
  return { headers: headers };
}

export function getCurrentDeviceType(): DeviceType {
  if (window.innerWidth > 1024) {
    return DeviceType.PC;
  } else if (window.innerWidth > 740) {
    return DeviceType.TABLE;
  } else {
    return DeviceType.MOBILE;
  }
}
