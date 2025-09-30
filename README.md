# 🤖 conversIA

**Plataforma Multiempresa para Bots Conversacionales Inteligentes de WhatsApp**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green?style=for-the-badge&logo=openai)](https://openai.com/)

## 🚀 Descripción

conversIA es una plataforma completa que permite a múltiples empresas configurar y gestionar bots conversacionales inteligentes para WhatsApp, orientados a ventas y soporte técnico. El sistema incluye un panel web de administración, integración con IA, sistema de pagos y gestión completa de conversaciones.

### ✨ Características Principales

- 🏢 **Sistema Multiempresa** - Cada empresa gestiona sus propios bots y configuraciones
- 🤖 **IA Conversacional** - Integración con OpenAI para respuestas inteligentes
- 💬 **WhatsApp Business** - Gestión completa de conversaciones y webhooks
- 💳 **Sistema de Pagos** - Integración con Mercado Pago para transacciones
- 📊 **Panel de Administración** - Dashboard completo con métricas en tiempo real
- 🔌 **Integraciones** - Conectores para CRM, ERP y sistemas externos
- 📱 **Responsive Design** - Panel web optimizado para todos los dispositivos

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WhatsApp      │    │   Panel Web     │    │   Integraciones │
│   Business API  │◄──►│   (Next.js)     │◄──►│   (CRM/ERP)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (NestJS)                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │   Auth  │ │  IA     │ │  Chat   │ │  Pagos  │ │  Webhooks│  │
│  │  Module │ │ Module  │ │ Module  │ │ Module  │ │ Module   │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   (Prisma ORM)  │
                    └─────────────────┘
```

## 🛠️ Stack Tecnológico

### 🖥️ Frontend
- **Framework:** Next.js 15 con App Router
- **UI:** Material UI (MUI) v7
- **Estado:** Redux Toolkit + React Query
- **Autenticación:** Auth0
- **Formularios:** React Hook Form + Yup
- **Gráficos:** Recharts
- **Tiempo Real:** Socket.io Client

### ⚙️ Backend
- **Framework:** NestJS 11
- **Lenguaje:** TypeScript 5
- **Base de Datos:** PostgreSQL 15
- **ORM:** Prisma
- **Autenticación:** JWT + Auth0
- **IA:** OpenAI API (GPT-4)
- **Pagos:** Mercado Pago API
- **Mensajería:** WhatsApp Business API (Twilio)
- **Tiempo Real:** WebSocket (Socket.io)
- **Email:** Nodemailer
- **Documentación:** Swagger/OpenAPI

### 🐳 Infraestructura
- **Contenedores:** Docker + Docker Compose
- **Base de Datos:** PostgreSQL + PgAdmin
- **Despliegue:** Vercel (Frontend) + Railway/Heroku (Backend)

## 📋 Flujo del Sistema

### 🔄 Flujo Conversacional

1. **Cliente inicia conversación** por WhatsApp
2. **Webhook recibe mensaje** y lo procesa en el backend
3. **IA analiza la intención** (consulta técnica o compra)
4. **Sistema responde** según el tipo de consulta:
   - **Consulta técnica:** Busca en base de datos de productos
   - **Intención de compra:** Consulta precio, stock y genera link de pago
5. **Cliente realiza pago** → Webhook de Mercado Pago confirma
6. **Sistema registra orden** y notifica al equipo de expedición
7. **Conversación queda registrada** para seguimiento

### 🏢 Sistema Multiempresa

- Cada empresa tiene su propia configuración
- Usuarios vinculados a empresas específicas
- Configuraciones independientes de IA y WhatsApp
- Productos y clientes separados por empresa
- Métricas y reportes individuales

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

- Node.js 18+ 
- Docker y Docker Compose
- Cuenta de OpenAI
- Cuenta de Twilio (WhatsApp Business)
- Cuenta de Mercado Pago
- Cuenta de Auth0

### 🔧 Instalación Local

#### Opción 1: Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/conversia.git
cd conversia

# Configurar Docker Compose
cp docker-compose.example.yml docker-compose.yml
# Editar docker-compose.yml con tus credenciales

# Configurar variables de entorno del backend
cd conversia-backend
cp env.example .env
# Editar .env con tus credenciales

# Iniciar todo el entorno con Docker
npm run dev:up
```

#### Opción 2: Instalación Manual

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/conversia.git
cd conversia

# Configurar variables de entorno
cp conversia-backend/env.example conversia-backend/.env
# Editar .env con tus credenciales

# Instalar dependencias del backend
cd conversia-backend
npm install
npx prisma generate
npx prisma db push

# Instalar dependencias del frontend
cd ../conversia-frontend
npm install

# Iniciar en desarrollo
npm run dev:all
```

### 🐳 Comandos Docker

```bash
# Desde conversia-backend/
npm run dev:up      # Levantar todo el entorno
npm run dev:down    # Detener servicios
npm run dev:logs    # Ver logs en tiempo real
npm run dev:clean   # Limpiar volúmenes y contenedores
```

### 🌐 URLs de Desarrollo

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Frontend** | http://localhost:3001 | - |
| **Backend API** | http://localhost:3000 | - |
| **API Docs (Swagger)** | http://localhost:3000/api | - |
| **PgAdmin** | http://localhost:5050 | admin@conversia.com / admin123 |
| **PostgreSQL** | localhost:5432 | conversia_user / conversia_password |

## 📁 Estructura del Proyecto

```
conversia/
├── 📁 conversia-backend/          # Backend NestJS
│   ├── 📁 src/
│   │   ├── 📁 modules/           # Módulos de la aplicación
│   │   │   ├── 📁 auth/          # Autenticación
│   │   │   ├── 📁 empresa/       # Gestión de empresas
│   │   │   ├── 📁 usuario/       # Gestión de usuarios
│   │   │   ├── 📁 whatsapp/      # Configuración WhatsApp
│   │   │   ├── 📁 ia/            # Configuración IA
│   │   │   ├── 📁 producto/      # Gestión de productos
│   │   │   ├── 📁 cliente/       # Gestión de clientes
│   │   │   ├── 📁 chat/          # Conversaciones
│   │   │   ├── 📁 pago/          # Sistema de pagos
│   │   │   └── 📁 integracion/   # Integraciones externas
│   │   ├── 📁 common/            # Utilidades comunes
│   │   └── 📁 config/            # Configuraciones
│   ├── 📁 prisma/                # Esquema de base de datos
│   └── 📄 package.json
├── 📁 conversia-frontend/         # Frontend Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/               # App Router
│   │   │   ├── 📁 (auth)/        # Rutas de autenticación
│   │   │   ├── 📁 dashboard/     # Panel principal
│   │   │   ├── 📁 configuracion/ # Configuraciones
│   │   │   ├── 📁 productos/     # Gestión de productos
│   │   │   ├── 📁 clientes/      # Gestión de clientes
│   │   │   ├── 📁 conversaciones/# Chat y conversaciones
│   │   │   ├── 📁 pagos/         # Gestión de pagos
│   │   │   └── 📁 integraciones/ # Integraciones externas
│   │   ├── 📁 components/        # Componentes reutilizables
│   │   ├── 📁 hooks/             # Custom hooks
│   │   ├── 📁 lib/               # Utilidades
│   │   ├── 📁 store/             # Redux store
│   │   └── 📁 types/             # Tipos TypeScript
│   └── 📄 package.json
├── 📁 docker/                    # Configuración Docker
├── 📄 docker-compose.yml         # Servicios Docker
├── 📄 .env.example               # Variables de entorno
└── 📄 README.md                  # Este archivo
```

## 🎯 Funcionalidades por Módulo

### 🏢 Gestión de Empresas
- Registro y configuración de empresas
- Usuarios y roles por empresa
- Configuraciones personalizadas
- Métricas y reportes individuales

### 🤖 Configuración de IA
- Modelos de OpenAI configurables
- Prompts personalizados por empresa
- Parámetros de temperatura y tokens
- Entrenamiento con productos específicos

### 💬 WhatsApp Business
- Configuración de webhooks
- Gestión de plantillas de mensajes
- Estados de conversación
- Integración con múltiples números

### 🛍️ Gestión de Productos
- Catálogo de productos
- Precios y stock
- Categorías y filtros
- Imágenes y descripciones

### 👥 Gestión de Clientes
- Base de datos de clientes
- Historial de conversaciones
- Clasificación de clientes
- Seguimiento de compras

### 💳 Sistema de Pagos
- Integración con Mercado Pago
- Generación de links de pago
- Webhooks de confirmación
- Gestión de órdenes

### 📊 Dashboard y Métricas
- Conversaciones en tiempo real
- Métricas de ventas
- Estado de bots
- Reportes personalizados

## 🔧 Scripts Disponibles

### Backend
```bash
npm run start:dev      # Desarrollo
npm run start:prod     # Producción
npm run test           # Tests
npm run test:e2e       # Tests E2E
npm run lint           # Linting
npx prisma studio      # Admin de BD
npx prisma migrate dev # Migraciones
```

### Frontend
```bash
npm run dev            # Desarrollo
npm run build          # Build producción
npm run start          # Servidor producción
npm run lint           # Linting
npm run type-check     # Verificación tipos
```

## 🌐 API Endpoints Principales

### Autenticación
- `POST /auth/login` - Login de usuarios
- `POST /auth/refresh` - Renovar token
- `GET /auth/profile` - Perfil del usuario

### Empresas
- `GET /empresas` - Listar empresas
- `POST /empresas` - Crear empresa
- `PUT /empresas/:id` - Actualizar empresa

### Conversaciones
- `GET /chats` - Listar conversaciones
- `GET /chats/:id` - Obtener conversación
- `POST /chats/:id/messages` - Enviar mensaje

### Webhooks
- `POST /webhooks/whatsapp` - Webhook WhatsApp
- `POST /webhooks/mercadopago` - Webhook Mercado Pago

## 📝 Variables de Entorno

```env
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/conversia"

# JWT
JWT_SECRET="your-jwt-secret"

# OpenAI
OPENAI_API_KEY="your-openai-key"

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN="your-mp-token"
MERCADOPAGO_WEBHOOK_SECRET="your-webhook-secret"

# Auth0
AUTH0_DOMAIN="your-auth0-domain"
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

## 🚀 Despliegue

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway/Heroku)
```bash
npm run build
# Configurar variables de entorno en la plataforma
# Desplegar
```

### Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
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

- **Email:** [soporte@conversia.com](mailto:soporte@conversia.com)
- **Documentación:** [docs.conversia.com](https://docs.conversia.com)
- **Issues:** [GitHub Issues](https://github.com/tu-usuario/conversia/issues)

## 🎯 Roadmap

### ✅ Fase 1 - Core (Completado)
- [x] Estructura base del proyecto
- [x] Configuración de desarrollo
- [x] Autenticación básica

### 🚧 Fase 2 - Funcionalidades Core (En Desarrollo)
- [ ] Esquema de base de datos
- [ ] Módulos del backend
- [ ] Panel web básico
- [ ] Integración con OpenAI

### 📋 Fase 3 - Integraciones (Planificado)
- [ ] WhatsApp Business API
- [ ] Sistema de pagos
- [ ] Webhooks
- [ ] Notificaciones

### 🔮 Fase 4 - Avanzado (Futuro)
- [ ] Integraciones externas
- [ ] Analytics avanzados
- [ ] Multi-idioma
- [ ] Mobile app

---

<div align="center">
  <strong>Desarrollado con ❤️ para revolucionar el comercio conversacional</strong>
</div>
