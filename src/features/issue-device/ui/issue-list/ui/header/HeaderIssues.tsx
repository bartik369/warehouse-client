import { Flex, Typography } from 'antd';
import { AiOutlineFileDone } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { TbListDetails } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { DeleteConfirm } from '@/features/delete-confirm/ui/DeleteConfirm';
import { IssueProcessListItem, IssueProcessStatus } from '@/features/issue-device/model/types';
import { PAGE_TITLES } from '@/shared/config/page-titles';
import { ActionButton } from '@/shared/ui/action-button/ActionButton';
import { ISSUE_LIST_DESCRIPTION } from '@/shared/ui/action-button/constants';
import { StartProcessButton } from '@/shared/ui/start-process-button/StartProcessButton';

import { DELETE_ISSUE_DESCRIPTION, TITLES } from '../../model/constants';
import styles from './HeaderIssues.module.scss';

interface HeaderIssuesProps {
  selectedIssue: IssueProcessListItem | null;
  onStart: () => void;
  onDelete: (id: string) => void;
}
export const HeaderIssues = ({ selectedIssue, onStart, onDelete }: HeaderIssuesProps) => {
  const navigate = useNavigate();
  const isDraft = selectedIssue?.status === IssueProcessStatus.Draft;
  const isCompleted = selectedIssue?.status === IssueProcessStatus.Completed;
  return (
    <Flex className={styles.header} justify="space-between">
      <Flex vertical>
        <Typography.Title className={styles.title} level={1}>
          {PAGE_TITLES.issueList}
        </Typography.Title>
        <span className={styles.description}>{ISSUE_LIST_DESCRIPTION}</span>
      </Flex>
      <Flex gap={10}>
        {isDraft && (
          <Flex gap={10}>
            <ActionButton
              title="Завершить"
              variant="apply"
              iconSize={18}
              icon={AiOutlineFileDone}
              onClick={() => navigate(`/issues/${selectedIssue.id}/edit`)}
            />
            <DeleteConfirm
              placement="topRight"
              title={TITLES.deleteIssueProcess}
              description={`${DELETE_ISSUE_DESCRIPTION} ${selectedIssue.documentNo}?`}
              onConfirm={() => onDelete(selectedIssue.id)}
            >
              <ActionButton title="Удалить" variant="delete" icon={IoTrashOutline} />
            </DeleteConfirm>
          </Flex>
        )}
        {isCompleted && (
          <ActionButton
            title="Детали выдачи"
            variant="apply"
            iconSize={16}
            icon={TbListDetails}
            onClick={() =>
              navigate(`/issues/${selectedIssue.id}`, {
                replace: true,
              })
            }
          />
        )}
        <StartProcessButton title="Выдать устройства" onClick={onStart} icon={RxOpenInNewWindow} />
      </Flex>
    </Flex>
  );
};
