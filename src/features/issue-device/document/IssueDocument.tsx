import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import printLogo from '@/assets/elements/print_logo.png';
import { Device } from '@/entities/device/model/types';

import { baseDeviceLabelConfig } from './constants';

Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto/Roboto-Regular.ttf',
  fontWeight: 'normal',
});

Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto/Roboto-Medium.ttf',
  fontWeight: 'medium',
});

Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto/Roboto-Bold.ttf',
  fontWeight: 'bold',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Roboto',
    position: 'relative',
  },

  headerLogo: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoIcon: {
    width: 22,
  },

  logoText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  centeredBlock: {
    alignItems: 'center',
    textAlign: 'center',
  },

  numberBlock: {
    justifyContent: 'center',
    marginBottom: 4,
  },

  docNumberText: {
    marginRight: 5,
  },

  docNumber: {
    fontWeight: 'medium',
  },

  date: {
    fontSize: 11,
  },

  act: {
    fontSize: 11,
    marginTop: 30,
    marginBottom: 30,
    lineHeight: 1.5,
  },

  bold: {
    fontWeight: 'medium',
  },

  table: {
    fontSize: 9,
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },

  tableRow: {
    flexDirection: 'row',
  },

  tableColHeader: {
    width: `${100 / 3}%`,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#eee',
    padding: 5,
  },

  tableCol: {
    width: `${100 / 3}%`,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },

  signaturesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  signatureBlock: {
    width: '48%',
  },

  infoText: {
    fontSize: 11,
  },

  image: {
    width: 140,
    height: 90,
    marginTop: 10,
    objectFit: 'contain',
  },

  signatureDate: {
    fontSize: 9,
    marginTop: 5,
  },
});

export interface IssueDocumentProps {
  date: string;
  docNumber: string;
  tableData: Device[];
  firstNameRuCurrent: string;
  lastNameRuCurrent: string;
  firstNameRuPartner: string;
  lastNameRuPartner: string;
  receiverSignature: string | null;
  issuerSignature: string | null;
  receiverSignedAt: string | null;
  issuerSignedAt: string | null;
}

const formatValue = (val: unknown): string => {
  if (val === null || val === undefined) {
    return '';
  }

  if (val instanceof Date) {
    return val.toLocaleDateString('ru-RU');
  }

  if (typeof val === 'boolean') {
    return val ? 'Да' : 'Нет';
  }

  return String(val);
};

const formatSignatureDate = (value: string | null): string => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString('ru-RU');
};

export const IssueDocument = ({
  date,
  docNumber,
  tableData,
  firstNameRuCurrent,
  lastNameRuCurrent,
  firstNameRuPartner,
  lastNameRuPartner,
  receiverSignature,
  issuerSignature,
  receiverSignedAt,
  issuerSignedAt,
}: IssueDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Логотип */}
        <View style={styles.headerLogo}>
          <View style={styles.logo}>
            <Image src={printLogo} style={styles.logoIcon} />
            <Text style={styles.logoText}>IT ASSET PORTAL</Text>
          </View>
        </View>

        {/* Номер акта и дата документа */}
        <View style={styles.centeredBlock}>
          <Text style={styles.numberBlock}>
            <Text style={styles.docNumberText}>Номер акта выдачи: </Text>

            <Text style={styles.docNumber}>{docNumber}</Text>
          </Text>

          <Text style={styles.date}>{date}</Text>
        </View>

        {/* Основной текст акта */}
        <View>
          <Text style={styles.act}>
            ООО «Компания Х», в лице директора Иванова Алексея Ивановича, действующего на основании
            устава, именуемое в дальнейшем{' '}
            <Text style={styles.bold}>
              {lastNameRuCurrent} {firstNameRuCurrent}
            </Text>
            , и ООО «Фирма У», в лице генерального директора Сидорова Анатолия Сергеевича,
            действующего на основании устава, именуемое в дальнейшем{' '}
            <Text style={styles.bold}>
              {lastNameRuPartner} {firstNameRuPartner}
            </Text>{' '}
            подписали настоящий акт приема-передачи на основании договора №123456789.
          </Text>
        </View>

        {/* Таблица оборудования */}
        <View style={styles.table}>
          {/* Заголовки таблицы */}
          <View style={styles.tableRow}>
            {baseDeviceLabelConfig.map((col) => (
              <Text key={col.key} style={styles.tableColHeader}>
                {col.label}
              </Text>
            ))}
          </View>

          {/* Данные таблицы */}
          {tableData.map((row, idx) => (
            <View key={idx} style={styles.tableRow}>
              {baseDeviceLabelConfig.map((col) => (
                <Text key={col.key} style={styles.tableCol}>
                  {formatValue(row[col.key as keyof Device])}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Подписи */}
        <View style={styles.signaturesWrapper}>
          {/* Подпись выдающей стороны */}
          <View style={styles.signatureBlock}>
            <Text style={styles.infoText}>
              {firstNameRuCurrent} {lastNameRuCurrent}
            </Text>

            {issuerSignature && (
              <>
                <Image style={styles.image} src={issuerSignature} />

                {issuerSignedAt && (
                  <Text style={styles.signatureDate}>
                    Дата подписания: {formatSignatureDate(issuerSignedAt)}
                  </Text>
                )}
              </>
            )}
          </View>

          {/* Подпись принимающей стороны */}
          <View style={styles.signatureBlock}>
            <Text style={styles.infoText}>
              {firstNameRuPartner} {lastNameRuPartner}
            </Text>

            {receiverSignature && (
              <>
                <Image style={styles.image} src={receiverSignature} />

                {receiverSignedAt && (
                  <Text style={styles.signatureDate}>
                    Дата подписания: {formatSignatureDate(receiverSignedAt)}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
