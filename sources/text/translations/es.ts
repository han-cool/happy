/**
 * Spanish translations for the Happy app
 */

function plural({ count, singular, plural }: { count: number; singular: string; plural: string }): string {
    return count === 1 ? singular : plural;
}

export const es = {
    common: {
        cancel: 'Cancelar',
        authenticate: 'Autenticar',
        save: 'Guardar',
        error: 'Error',
        success: 'Éxito',
        ok: 'OK',
        continue: 'Continuar',
        back: 'Atrás',
        rename: 'Renombrar',
        reset: 'Restablecer',
        logout: 'Cerrar sesión',
        yes: 'Sí',
        no: 'No',
        version: 'Versión',
        copied: 'Copiado',
        scanning: 'Escaneando...',
        urlPlaceholder: 'https://ejemplo.com',
        home: 'Inicio',
        message: 'Mensaje',
        files: 'Archivos',
        fileViewer: 'Visor de archivos',
    },

    status: {
        connected: 'conectado',
        connecting: 'conectando',
        disconnected: 'desconectado',
        error: 'error',
        online: 'en línea',
        offline: 'sin conexión',
    },

    connect: {
        restoreAccount: 'Restaurar cuenta',
        enterSecretKey: 'Por favor, ingrese una clave secreta',
        invalidSecretKey: 'Clave secreta inválida. Por favor, verifique e intente de nuevo.',
        enterUrlManually: 'Ingresar URL manualmente',
    },

    settings: {
        title: 'Configuración',
        connectedAccounts: 'Cuentas conectadas',
        github: 'GitHub',
        machines: 'Máquinas',
        features: 'Características',
        account: 'Cuenta',
        accountSubtitle: 'Administra los detalles de tu cuenta',
        appearance: 'Apariencia',
        appearanceSubtitle: 'Personaliza cómo se ve la aplicación',
        voiceAssistant: 'Asistente de voz',
        voiceAssistantSubtitle: 'Configura las preferencias de interacción por voz',
        featuresTitle: 'Características',
        featuresSubtitle: 'Habilitar o deshabilitar características de la aplicación',
        developer: 'Desarrollador',
        developerTools: 'Herramientas de desarrollador',
        about: 'Acerca de',
        aboutFooter: 'Happy Coder es un cliente móvil de Claude Code. Está completamente cifrado de extremo a extremo y tu cuenta se almacena solo en tu dispositivo. No afiliado con Anthropic.',
        whatsNew: 'Novedades',
        whatsNewSubtitle: 'Ver las últimas actualizaciones y mejoras',
        reportIssue: 'Reportar un problema',
        privacyPolicy: 'Política de privacidad',
        termsOfService: 'Términos de servicio',
        eula: 'EULA',
        supportUs: 'Apóyanos',
        supportUsSubtitlePro: '¡Gracias por tu apoyo!',
        supportUsSubtitle: 'Apoya el desarrollo del proyecto',
        scanQrCodeToAuthenticate: 'Escanea el código QR para autenticar',
        githubConnected: ({ login }: { login: string }) => `Conectado como @${login}`,
        connectGithubAccount: 'Conecta tu cuenta de GitHub',
    },

    // Add more sections as needed...
};