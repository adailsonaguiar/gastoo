import {showMessage} from 'react-native-flash-message';

import {fontMedium} from '../styles/fonts';

const BOX_MENSAGE_STYLE = {
  borderBottomEndRadius: 5,
  borderBottomStartRadius: 5,
  paddingTop: 50,
};
const MESSAGE_STYLE = {fontFamily: fontMedium};

export function showAlertError(error) {
  showMessage({
    message: error,
    type: 'warning',
    icon: 'info',
    style: BOX_MENSAGE_STYLE,
    titleStyle: MESSAGE_STYLE,
  });
}

export function showError(error) {
  showMessage({
    message: error,
    type: 'danger',
    icon: 'info',
    style: BOX_MENSAGE_STYLE,
    titleStyle: MESSAGE_STYLE,
  });
}

export function showAlert(message) {
  showMessage({
    message: message,
    type: 'danger',
    icon: 'success',
    style: BOX_MENSAGE_STYLE,
    titleStyle: MESSAGE_STYLE,
  });
}
