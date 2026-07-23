import { ManageAccess } from '@/features/manage-access/ui/ManageAccess';

const AccessPage = () => {
  return (
    <ManageAccess />
    // <section className={styles.inner}>
    //   <section className={styles.layoutLeft}>
    //     <UserRolesForm
    //       roles={roles || []}
    //       actions={actions}
    //       state={roleState}
    //       title={SECTION_TITLES.grantAccess}
    //       isFetching={isFetching}
    //       isSuccess={isSuccess}
    //     />
    //   </section>
    //   <section className={styles.layoutRight}>
    //     {/* <UserInfo userRoles={roleState.assignedUserRoles} /> */}
    //   </section>
    // </section>
  );
};

export default AccessPage;
