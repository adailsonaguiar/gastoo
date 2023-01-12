import React from 'react';
import Header from '../../components/Header';
import ArrowRightIcon from '../../assets/arrow-right-blue.png';
import {version} from '../../../package.json';

import * as S from './styles';
import {exportDataToExcel} from '../../services/csvFileService';
import {PermissionsAndroid} from 'react-native';
import {useExportData} from '../../hooks/useExportData';

type ConfigProps = {
  navigation: any;
};

export const Config = ({navigation}: ConfigProps) => {
  const {getAllData} = useExportData();

  const handleClick = async () => {
    const dataToExport = await getAllData();
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportDataToExcel(dataToExport);
        }
      } else {
        exportDataToExcel(dataToExport);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };
  return (
    <S.Container>
      <Header title="Configurações" onClose={() => navigation.goBack()} />
      <S.MenuWrapper>
        <S.SelectOption onPress={() => handleClick()}>
          <S.LabelOption>Exportar dados</S.LabelOption>
          <S.ChevRightIcon source={ArrowRightIcon} />
        </S.SelectOption>
      </S.MenuWrapper>
      <S.Footer>
        <S.LabelOption>v {version}</S.LabelOption>
      </S.Footer>
    </S.Container>
  );
};
