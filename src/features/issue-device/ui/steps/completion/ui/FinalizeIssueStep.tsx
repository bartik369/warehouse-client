import { Flex, Typography } from 'antd';
import { Divider } from 'antd';
import { BsBoxSeam } from 'react-icons/bs';
import { BsFillSendFill } from 'react-icons/bs';
import { FcIdea } from 'react-icons/fc';
import { GrInfo } from 'react-icons/gr';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuDownload } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { IssueState } from '@/features/issue-device/model/issueTypes';
import { ROUTES } from '@/shared/config/routes/routes';

import successIcon from '../../../../../../assets/elements/success.png';
import styles from './FinalizeIssueStep.module.scss';

interface FinalizeIssueStepProps {
  issueState: IssueState;
  file: Blob | null;
}

export const FinalizeIssueStep = ({ issueState, file }: FinalizeIssueStepProps) => {
  const navigate = useNavigate();
  const issueNumber = issueState.issueNumber;

  const handleDownload = () => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = url;
    link.download = `Акт-выдачи-${issueState.issueNumber}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <Flex vertical gap={40}>
      <Flex align="center" vertical gap={10}>
        <div className={styles.successIcon}>
          <img src={successIcon} alt="" />
        </div>
        <Typography.Title level={4}>
          Выдача оборудования <span className={styles.issueNumber}>{issueNumber}</span> завершена!
        </Typography.Title>
        <Typography.Text>
          Оборудование успешно выдано пользователю, все документы сформированы и отправлены .
        </Typography.Text>
      </Flex>
      <Flex gap={30} className={styles.cards}>
        <Flex align="flex-start" gap={10} className={styles.block}>
          <div className={styles.icon}>
            <BsBoxSeam size={20} />
          </div>
          <Flex vertical>
            <Typography.Text strong>Оборудование выдано</Typography.Text>
            <Typography.Text className={styles.description}>
              Оборудование передано пользовтелю и зафиксировано в системе
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex align="flex-start" gap={10} className={styles.block}>
          <div className={styles.icon}>
            <HiOutlineEnvelope size={22} />
          </div>
          <Flex vertical>
            <Typography.Text strong>Письмо отправлено</Typography.Text>
            <Typography.Text className={styles.description}>
              Пользователю отправлено письмо на почту с PDF-файлом акта выдачи.
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex align="flex-start" gap={10} className={styles.block}>
          <div className={styles.icon}>
            <IoDocumentTextOutline size={22} />
          </div>
          <Flex vertical>
            <Typography.Text strong>Документы сохранены</Typography.Text>
            <Typography.Text className={styles.description}>
              Акт выдачи сохранен в системе и доступен для просмотра и скачивания.
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider style={{ margin: '0' }} />
      <Flex className={styles.information}>
        <Flex gap={10} align="center">
          <div className={styles.icon}>
            <FcIdea size={26} />
          </div>
          <Flex vertical>
            <Typography.Title level={4}>Что дальше?</Typography.Title>
            <Typography.Text className={styles.description}>
              Пользователь получит письмо с актом выдачи оборудования.
            </Typography.Text>
            <Typography.Text className={styles.description}>
              Вы можете посмотреть выданное оборудование в разделе "Выдачи"
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex gap={15}>
          <button className={styles.primary} onClick={() => navigate(ROUTES.ISSUES)}>
            Перейти к выдачам
          </button>
          <button className={styles.secondary} onClick={handleDownload}>
            <LuDownload size={17} />
            <span>Скачать акт выдачи</span>
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
};
