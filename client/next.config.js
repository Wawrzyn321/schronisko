// to nietranspilowany .js, nie można użyć TSa

module.exports = {
  async redirects() {
    return [
      {
        source: '/animals',
        destination: '/',
        permanent: true,
      },
      {
        source: '/animals/details',
        destination: '/',
        permanent: true,
      },
      {
        source: '/animals/v-adopt',
        destination: '/',
        permanent: true,
      },
      {
        source: '/animals/to-adopt',
        destination: '/',
        permanent: true,
      },
      {
        source: '/volunteering',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['localhost', 'http://schronisko-backend2.oto-jest-wawrzyn.pl'],
  },
  i18n: {
    locales: ['pl'],
    defaultLocale: 'pl'
  }
};
