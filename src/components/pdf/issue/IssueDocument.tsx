import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import printLogo from '@/assets/elements/print_logo.png';
import { Device } from '@/types/devices';
import { AssignedDevice } from '@/types/issue';
import { baseDeviceLabelConfig } from '@/utils/data/menus';

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
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 20,
  },
  date: {
    fontSize: 11,
  },
  logoText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  docNumberText: {
    marginRight: 5,
  },
  docNumber: {
    fontWeight: 'medium',
  },
  act: {
    fontSize: 11,
    marginTop: 30,
    marginBottom: 30,
  },
  numberBlock: {
    justifyContent: 'center',
    marginBottom: 4,
  },
  centeredBlock: {
    alignItems: 'center',
    textAlign: 'center',
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
  bold: {
    fontWeight: 'medium',
  },
  infoText: {
    fontSize: 11,
  },
  image: {
    width: 140,
    height: 90,
    marginTop: 10,
  },
  signaturesWrapper: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signatureBlock: {
    width: '48%',
  },
});

interface IssueDocumentProps {
  date: string;
  docNumber: string;
  tableData: AssignedDevice[];
  firstNameRuCurrent: string;
  lastNameRuCurrent: string;
  firstNameRuPartner: string;
  lastNameRuPartner: string;
  receiverSignature: string | null;
  issuerSignature: string | null;
}

const formatValue = (val: unknown): string => {
  if (val === null || val === undefined) return '';
  if (val instanceof Date) return val.toLocaleDateString('ru-RU');
  if (typeof val === 'boolean') return val ? 'Да' : 'Нет';
  return String(val);
};

const IssueDocument = ({
  date,
  docNumber,
  tableData,
  firstNameRuCurrent,
  lastNameRuCurrent,
  firstNameRuPartner,
  lastNameRuPartner,
  receiverSignature,
  issuerSignature,
}: IssueDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Шапка */}
      <View style={styles.headerLogo}>
        <View style={styles.logo}>
          <Image src={printLogo} style={styles.logoIcon} />
          <Text style={styles.logoText}>ITAM</Text>
        </View>
      </View>
      <View style={styles.centeredBlock}>
        <Text style={styles.numberBlock}>
          <Text style={styles.docNumberText}>Номер акта выдачи: </Text>
          <Text style={styles.docNumber}>{docNumber}</Text>
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      {/* Текст */}
      <View>
        <Text style={styles.act}>
          ООО «Компания Х», в лице директора Иванова Алексея Ивановича, действующего на основании
          устава, именуемое в дальнейшем{' '}
          <Text style={styles.bold}>
            {firstNameRuCurrent} {lastNameRuCurrent}
          </Text>
          , и ООО «Фирма У», в лице генерального директора Сидорова Анатолия Сергеевича,
          действующего на основании устава, именуемое в дальнейшем{' '}
          <Text style={styles.bold}>
            {firstNameRuPartner} {lastNameRuPartner}
          </Text>{' '}
          подписали настоящий акт приема передачи на основании договора №123456789
        </Text>
      </View>

      <View style={styles.table}>
        {/* Заголовки */}
        <View style={styles.tableRow}>
          {baseDeviceLabelConfig.map((col) => (
            <Text key={col.key} style={styles.tableColHeader}>
              {col.label}
            </Text>
          ))}
        </View>
        {/* Данные */}
        {tableData.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            {baseDeviceLabelConfig.map((col, i) => (
              <Text key={i} style={styles.tableCol}>
                {formatValue(row[col.key as keyof AssignedDevice])}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Подписи */}
      <View style={styles.signaturesWrapper}>
        <View style={styles.signatureBlock}>
          <Text style={styles.infoText}>
            {firstNameRuCurrent} {lastNameRuCurrent}
          </Text>
          {issuerSignature && <Image style={styles.image} src={issuerSignature} />}
        </View>

        <View style={styles.signatureBlock}>
          <Text style={styles.infoText}>
            {firstNameRuPartner} {lastNameRuPartner}
          </Text>
          {receiverSignature && <Image style={styles.image} src={receiverSignature} />}
        </View>
      </View>
    </Page>
  </Document>
);

export default IssueDocument;
