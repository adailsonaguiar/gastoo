import {Alert} from 'react-native';
import RNFS from 'react-native-fs';

// function to handle exporting
export async function exportDataToExcel(sample_data_to_export: any) {
  RNFS.writeFile(
    RNFS.DownloadDirectoryPath + '/gastoo_data_backup.json',
    JSON.stringify(sample_data_to_export),
    'ascii',
  )
    .then(() => {
      Alert.alert(`Exportado com sucesso: ${'gastoo_data_backup.json'}`);
    })
    .catch(e => {
      console.log('Error', e);
    });
}
