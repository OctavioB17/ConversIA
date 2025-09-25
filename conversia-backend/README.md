# conversIA Backend

Backend de la plataforma conversIA - Sistema multiempresa para bots conversacionales inteligentes de WhatsApp.

## 🚀 Descripción

conversIA es una plataforma que permite configurar bots conversacionales inteligentes para WhatsApp, orientados a ventas y soporte técnico. El sistema permite a múltiples empresas gestionar sus propios bots, clientes, productos y conversaciones desde un panel web centralizado.

## 🛠️ Stack Tecnológico

- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **Base de datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** JWT (vinculado a Auth0)
- **IA:** OpenAI API
- **Pagos:** Mercado Pago API
- **Mensajería:** WhatsApp API (Twilio)
- **Tiempo real:** WebSocket
- **Email:** Nodemailer

## 📋 Características Principales

- ✅ Sistema multiempresa (multi-tenant)
- ✅ Integración con OpenAI para IA conversacional
- ✅ Gestión de productos y catálogo
- ✅ Sistema de pagos con Mercado Pago
- ✅ Webhooks de WhatsApp
- ✅ Notificaciones en tiempo real
- ✅ Integraciones con sistemas externos (CRM, ERP)
- ✅ Panel de administración web

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Configurar base de datos
npx prisma generate
npx prisma db push

# Ejecutar en desarrollo
npm run start:dev
```

## 📁 Estructura del Proyecto

```
src/
├── modules/
│   ├── auth/           # Autenticación y autorización
│   ├── empresa/        # Gestión de empresas
│   ├── usuario/        # Gestión de usuarios
│   ├── whatsapp/       # Configuración de WhatsApp
│   ├── ia/            # Configuración de IA
│   ├── producto/      # Gestión de productos
│   ├── cliente/       # Gestión de clientes
│   ├── chat/          # Conversaciones
│   ├── pago/          # Sistema de pagos
│   └── integracion/   # Integraciones externas
├── common/
│   ├── decorators/    # Decoradores personalizados
│   ├── guards/        # Guards de autenticación
│   ├── interceptors/  # Interceptores
│   └── pipes/         # Pipes de validación
└── config/           # Configuraciones
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Tests
npm run test
npm run test:e2e
npm run test:cov

# Linting
npm run lint

# Base de datos
npx prisma studio
npx prisma migrate dev
```

## 🌐 API Endpoints

- `POST /auth/login` - Autenticación de usuarios
- `GET /empresas` - Listar empresas
- `POST /empresas` - Crear empresa
- `GET /chats` - Listar conversaciones
- `POST /webhooks/whatsapp` - Webhook de WhatsApp
- `POST /webhooks/mercadopago` - Webhook de Mercado Pago

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