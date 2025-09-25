# conversIA Frontend

Frontend de la plataforma conversIA - Panel web para gestión de bots conversacionales inteligentes de WhatsApp.

## 🚀 Descripción

conversIA Frontend es el panel de administración web que permite a las empresas configurar y gestionar sus bots conversacionales de WhatsApp. Incluye dashboards, configuración de IA, gestión de productos, visualización de conversaciones y más.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 15
- **Lenguaje:** TypeScript
- **UI:** Material UI (MUI)
- **Estado:** Redux Toolkit
- **Autenticación:** Auth0
- **Formularios:** React Hook Form + Yup
- **Gráficos:** Recharts
- **Tiempo real:** Socket.io Client

## 📋 Características Principales

- ✅ Dashboard con métricas en tiempo real
- ✅ Configuración de empresa y usuarios
- ✅ Gestión de productos y catálogo
- ✅ Configuración de IA (OpenAI)
- ✅ Configuración de WhatsApp
- ✅ Visualización de conversaciones
- ✅ Gestión de clientes
- ✅ Panel de pagos y órdenes
- ✅ Integraciones con sistemas externos
- ✅ Diseño responsive y moderno

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── dashboard/         # Panel principal
│   ├── configuracion/     # Configuraciones
│   ├── productos/         # Gestión de productos
│   ├── clientes/          # Gestión de clientes
│   ├── conversaciones/    # Chat y conversaciones
│   ├── pagos/            # Gestión de pagos
│   └── integraciones/    # Integraciones externas
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI
│   ├── forms/            # Formularios
│   ├── charts/           # Gráficos y métricas
│   └── layout/           # Layout y navegación
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y configuraciones
├── store/                # Redux store
└── types/                # Tipos de TypeScript
```

## 🎨 Componentes Principales

### Dashboard
- Métricas de conversaciones
- Gráficos de ventas
- Estado de bots
- Notificaciones en tiempo real

### Configuración
- Configuración de empresa
- Usuarios y permisos
- Configuración de IA
- Configuración de WhatsApp

### Gestión
- Productos y catálogo
- Clientes y contactos
- Conversaciones y chats
- Pagos y órdenes

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🌐 Rutas Principales

- `/` - Dashboard principal
- `/configuracion` - Configuración de empresa
- `/configuracion/ia` - Configuración de IA
- `/configuracion/whatsapp` - Configuración de WhatsApp
- `/productos` - Gestión de productos
- `/clientes` - Gestión de clientes
- `/conversaciones` - Visualización de chats
- `/pagos` - Gestión de pagos
- `/integraciones` - Integraciones externas

## 📝 Variables de Entorno

```env
# Auth0
AUTH0_SECRET="your-auth0-secret"
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_ISSUER_BASE_URL="https://your-domain.auth0.com"
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"

# API Backend
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_WS_URL="ws://localhost:3001"

# Socket.io
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

## 🎨 Temas y Personalización

El sistema soporta temas personalizados por empresa:

- Colores corporativos
- Logos personalizados
- Configuración de marca
- Temas claro/oscuro

## 📱 Responsive Design

- ✅ Mobile First
- ✅ Tablet optimizado
- ✅ Desktop completo
- ✅ PWA ready

## 🔒 Seguridad

- ✅ Autenticación con Auth0
- ✅ Autorización por roles
- ✅ Protección de rutas
- ✅ Validación de formularios
- ✅ Sanitización de datos

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t conversia-frontend .
docker run -p 3000:3000 conversia-frontend
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico, contacta a: [soporte@conversia.com](mailto:soporte@conversia.com)