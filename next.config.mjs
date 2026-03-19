import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Force React resolution from root node_modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': resolve(__dirname, 'node_modules/react/jsx-runtime'),
    };
    
    return config;
  },
  transpilePackages: ['dayjs','@ankamala/filter', '@ankamala/select', '@ankamala/core'],
};

export default nextConfig;