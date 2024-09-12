{
    test: /\.svg$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192, // Set a limit for the size to inline
        },
      },
    ],
  }
  