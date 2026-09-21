import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { GoLock } from 'react-icons/go';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks/data/useAuth';
import { Button } from '@/shared/ui/button/Button';
import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { MESSAGES } from '@/utils/constants/ui/messages';
import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';

import { LoginFormValues, loginSchema } from '../../model/schema';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
  const { authHandler } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  return (
    <FormProvider {...form}>
      <Flex className={styles.auth} vertical>
        <form onSubmit={form.handleSubmit(authHandler)}>
          <Flex vertical gap={15}>
            <RhfTextField<LoginFormValues>
              prefix={<HiOutlineEnvelope size={16} />}
              name="email"
              label={PLACEHOLDER_LABELS.fillEmail}
            />
            <RhfTextField<LoginFormValues>
              name="password"
              label={PLACEHOLDER_LABELS.fillPassword}
              type="password"
              prefix={<GoLock size={16} />}
            />
          </Flex>
          <div className={styles.actions}>
            <Button type="submit" title={BUTTON_LABELS.signin} color="primary" size="md" />
          </div>
        </form>
        <div className={styles.reset}>
          {MESSAGES.forgetPassword}
          <Link to={import.meta.env.VITE_RESET_PASSWORD}>{BUTTON_LABELS.reset}</Link>
        </div>
      </Flex>
    </FormProvider>
  );
};

export default AuthForm;
