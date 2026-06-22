import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'

export default defineConfig({
  plugins: [
    react({
      // Hỗ trợ emotion (MUI dùng emotion để styling)
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],

  // Alias đường dẫn - import '@/components/...' thay vì '../../components/...' => config sau
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },

  // Tối ưu pre-bundle cho các thư viện lớn
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      '@tanstack/react-query',
      'axios',
      'react-router-dom',
      'react-hook-form',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
    ],
  },

  // Cấu hình build output
  build: {
    outDir: 'dist',
    sourcemap: false, // bật true nếu cần debug production
    chunkSizeWarningLimit: 1000, // tăng giới hạn cảnh báo chunk (KB)
    rollupOptions: {
      output: {
        // Tách các thư viện lớn thành chunk riêng → tăng tốc load
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': [
            '@mui/material',
            '@mui/icons-material',
            '@mui/system',
            '@emotion/react',
            '@emotion/styled',
          ],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'editor-vendor': ['react-quill'],
        },
      },
    },
  },

  // Cấu hình dev server
  server: {
    port: 3000,       // đổi port tuỳ ý
    open: true,       // tự động mở browser khi chạy dev
    cors: true,
    proxy: {
      // Proxy API để tránh CORS khi dev (tuỳ chỉnh theo backend của bạn)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // Biến môi trường - prefix VITE_ sẽ được expose ra client
  // Dùng trong code: import.meta.env.VITE_API_URL
  envPrefix: 'VITE_',
})