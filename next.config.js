module.exports = {
  basePath: "/postik",
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
  sassOptions: {
    implementation: "sass-embedded",
  },
  webpack(config) {
    config.module.rules.push({
      /*test: /\.s[ac]ss$/i,*/ test: /\.(scss|sass|less|css)$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            // Options for Sass compilation
          },
        },
        "sass-loader",
      ],
    });
    return config;
  },
  experimental: {
    serverActions: true,
  },

  async rewrite() {
    return [
      {
        source: "/messages",
        destination: "http://localhost:3001",
      },
    ];
  },
};
