const Home = () => {
  return (
    <div>
      <p>На данный момент доступен функционал </p>
      <p>
        <a style={{ fontSize: '26px', color: 'var(--blue-600)' }} href="admin/add-device">
          админ-части
        </a>
      </p>
      <p>
        <a style={{ fontSize: '26px', color: 'var(--blue-600)' }} href="devices/locations/msk">
          Информация по уcтройствам
        </a>
      </p>
      <a style={{ fontSize: '26px', color: 'var(--blue-600)' }} href="/issues">
        Процесс выдачи устройства
      </a>
    </div>
  );
};

export default Home;
