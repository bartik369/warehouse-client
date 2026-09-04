import { Empty, Flex, Spin } from 'antd';

interface LoadingContentProps {
  className?: string;
}

export const LoadingContent = ({ className }: LoadingContentProps) => {
  return (
    <Spin spinning>
      <Flex className={className} align="center" justify="center">
        <Empty description={false} />
      </Flex>
    </Spin>
  );
};
