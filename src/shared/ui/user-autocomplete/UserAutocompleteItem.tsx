import { Flex, Typography } from 'antd';

import { User } from '@/entities/ user/model/types';

interface UserAutocompleteItemProps {
  user: User;
}
export const UserAutocompleteItem = ({ user }: UserAutocompleteItemProps) => {
  return <Flex gap={10}>{user.email}</Flex>;
};
