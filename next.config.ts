import { withPayload } from '@payloadcms/next/withPayload'
import { createRequire } from 'module'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const require = createRequire(import.meta.url)
const payloadScssDir = path.dirname(require.resolve('@payloadcms/ui/scss'))

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: [payloadScssDir],
    includePaths: [payloadScssDir],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/docs/**',
      },
      {
        pathname: '/templates/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
