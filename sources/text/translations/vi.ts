/**
 * Vietnamese translations for the D3 AI app
 * Bản dịch tiếng Việt cho ứng dụng D3 AI
 */

function plural({ count, singular, plural }: { count: number; singular: string; plural: string }): string {
    // Vietnamese doesn't have plural forms like English
    // We use classifiers and numbers instead
    return count === 1 ? singular : plural;
}

export const vi = {
    common: {
        // Simple string constants
        cancel: 'Hủy',
        authenticate: 'Xác thực',
        save: 'Lưu',
        error: 'Lỗi',
        success: 'Thành công',
        ok: 'OK',
        continue: 'Tiếp tục',
        back: 'Quay lại',
        rename: 'Đổi tên',
        reset: 'Đặt lại',
        logout: 'Đăng xuất',
        yes: 'Có',
        no: 'Không',
        version: 'Phiên bản',
        copied: 'Đã sao chép',
        scanning: 'Đang quét...',
        urlPlaceholder: 'https://vidu.com',
        home: 'Trang chủ',
        message: 'Tin nhắn',
        files: 'Tệp tin',
        fileViewer: 'Trình xem tệp',
    },

    status: {
        connected: 'đã kết nối',
        connecting: 'đang kết nối',
        disconnected: 'đã ngắt kết nối',
        error: 'lỗi',
        online: 'trực tuyến',
        offline: 'ngoại tuyến',
    },

    connect: {
        restoreAccount: 'Khôi phục tài khoản',
        enterSecretKey: 'Vui lòng nhập khóa bí mật',
        invalidSecretKey: 'Khóa bí mật không hợp lệ. Vui lòng kiểm tra và thử lại.',
        enterUrlManually: 'Nhập URL thủ công',
    },

    settings: {
        title: 'Cài đặt',
        connectedAccounts: 'Tài khoản đã kết nối',
        github: 'GitHub',
        machines: 'Máy tính',
        features: 'Tính năng',
        account: 'Tài khoản',
        accountSubtitle: 'Quản lý chi tiết tài khoản của bạn',
        appearance: 'Giao diện',
        appearanceSubtitle: 'Tùy chỉnh giao diện ứng dụng',
        voiceAssistant: 'Trợ lý giọng nói',
        voiceAssistantSubtitle: 'Cấu hình tùy chọn tương tác bằng giọng nói',
        featuresTitle: 'Tính năng',
        featuresSubtitle: 'Bật hoặc tắt các tính năng ứng dụng',
        developer: 'Nhà phát triển',
        developerTools: 'Công cụ phát triển',
        about: 'Giới thiệu',
        aboutFooter: 'D3 AI là ứng dụng di động cho AI Assistant Platform. Được mã hóa đầu cuối hoàn toàn và tài khoản của bạn chỉ được lưu trên thiết bị. Không liên kết với Anthropic.',
        whatsNew: 'Có gì mới',
        whatsNewSubtitle: 'Xem các cập nhật và cải tiến mới nhất',
        reportIssue: 'Báo cáo vấn đề',
        privacyPolicy: 'Chính sách bảo mật',
        termsOfService: 'Điều khoản dịch vụ',
        eula: 'EULA',
        support: 'Hỗ trợ',
        supportUs: 'Ủng hộ chúng tôi',
        supportUsSubtitlePro: 'Cảm ơn sự ủng hộ của bạn!',
        supportUsSubtitle: 'Đăng ký tính năng Pro',
        buyMeCoffee: 'Mua cà phê cho tôi',
        buyMeCoffeeSubtitle: 'Ủng hộ phát triển bằng một khoản quyên góp nhỏ',
        sendFeedback: 'Gửi phản hồi',
        feedbackSubtitle: 'Giúp chúng tôi cải thiện với phản hồi của bạn',
        scanQrCodeToAuthenticate: 'Quét mã QR để xác thực',
        githubConnected: ({ login }: { login: string }) => `Đã kết nối với @${login}`,
        connectGithubAccount: 'Kết nối tài khoản GitHub của bạn',

        // Dynamic settings messages
        accountConnected: ({ service }: { service: string }) => `Tài khoản ${service} đã kết nối`,
        machineStatus: ({ name, status }: { name: string; status: 'online' | 'offline' }) =>
            `${name} đang ${status === 'online' ? 'trực tuyến' : 'ngoại tuyến'}`,
        featureToggled: ({ feature, enabled }: { feature: string; enabled: boolean }) =>
            `${feature} đã ${enabled ? 'bật' : 'tắt'}`,
    },

    settingsAppearance: {
        // Appearance settings screen
        theme: 'Giao diện',
        themeDescription: 'Chọn bảng màu ưa thích của bạn',
        themeOptions: {
            adaptive: 'Tự động',
            light: 'Sáng',
            dark: 'Tối',
        },
        themeDescriptions: {
            adaptive: 'Theo cài đặt hệ thống',
            light: 'Luôn dùng giao diện sáng',
            dark: 'Luôn dùng giao diện tối',
        },
        display: 'Hiển thị',
        displayDescription: 'Điều khiển bố cục và khoảng cách',
        inlineToolCalls: 'Hiển thị công cụ nội tuyến',
        inlineToolCallsDescription: 'Hiển thị lệnh gọi công cụ trực tiếp trong tin nhắn',
        expandTodoLists: 'Mở rộng danh sách việc cần làm',
        expandTodoListsDescription: 'Hiển thị tất cả công việc thay vì chỉ thay đổi',
        showLineNumbersInDiffs: 'Hiển thị số dòng trong Diff',
        showLineNumbersInDiffsDescription: 'Hiển thị số dòng trong mã diff',
        showLineNumbersInToolViews: 'Hiển thị số dòng trong công cụ',
        showLineNumbersInToolViewsDescription: 'Hiển thị số dòng trong diff của công cụ',
        alwaysShowContextSize: 'Luôn hiển thị kích thước ngữ cảnh',
        alwaysShowContextSizeDescription: 'Hiển thị mức sử dụng ngữ cảnh kể cả khi chưa gần giới hạn',
        avatarStyle: 'Kiểu avatar',
        avatarStyleDescription: 'Chọn kiểu hiển thị avatar phiên làm việc',
        avatarOptions: {
            pixelated: 'Pixel',
            gradient: 'Gradient',
            brutalist: 'Brutalist',
        },
    },

    settingsFeatures: {
        // Features settings screen
        experiments: 'Thử nghiệm',
        experimentsDescription: 'Bật các tính năng thử nghiệm đang trong giai đoạn phát triển. Các tính năng này có thể không ổn định hoặc thay đổi mà không báo trước.',
        experimentalFeatures: 'Tính năng thử nghiệm',
        experimentalFeaturesEnabled: 'Tính năng thử nghiệm đã bật',
        experimentalFeaturesDisabled: 'Chỉ dùng tính năng ổn định',
        supportFeatures: 'Tùy chọn hỗ trợ',
        supportFeaturesDescription: 'Điều khiển các tùy chọn hỗ trợ và phản hồi được hiển thị trong cài đặt chính.',
        supportUs: 'Ủng hộ chúng tôi',
        supportUsEnabled: 'Tùy chọn đăng ký có sẵn',
        supportUsDisabled: 'Tùy chọn đăng ký bị ẩn',
        buyMeCoffee: 'Mua cà phê cho tôi',
        buyMeCoffeeEnabled: 'Tùy chọn quyên góp có sẵn',
        buyMeCoffeeDisabled: 'Tùy chọn quyên góp bị ẩn',
        sendFeedback: 'Gửi phản hồi',
        sendFeedbackEnabled: 'Biểu mẫu phản hồi có sẵn',
        sendFeedbackDisabled: 'Biểu mẫu phản hồi bị ẩn',
        aiFeatures: 'AI & Tự động hóa',
        aiFeaturesDescription: 'Các tính năng quản lý tác vụ và tự động hóa được hỗ trợ bởi AI.',
        aiBoard: 'Bảng AI',
        aiBoardEnabled: 'Bảng kanban cho tác vụ AI đã bật',
        aiBoardDisabled: 'Quản lý tác vụ AI đã tắt',
        webFeatures: 'Tính năng Web',
        webFeaturesDescription: 'Tính năng chỉ có trong phiên bản web của ứng dụng.',
        commandPalette: 'Bảng lệnh',
        commandPaletteEnabled: 'Nhấn ⌘K để mở',
        commandPaletteDisabled: 'Truy cập lệnh nhanh đã tắt',
    },

    feedback: {
        // Feedback form screen
        selectCategory: 'Chọn danh mục',
        selectCategoryFooter: 'Chọn loại phản hồi bạn muốn gửi',
        selectCategoryMessage: 'Vui lòng chọn danh mục phản hồi',
        enterMessage: 'Nhập tin nhắn',
        enterMessageMessage: 'Vui lòng nhập tin nhắn phản hồi của bạn',
        message: 'Tin nhắn',
        messageFooter: 'Mô tả chi tiết phản hồi của bạn. Càng nhiều thông tin, chúng tôi càng có thể hỗ trợ tốt hơn.',
        messagePlaceholder: 'Nhập phản hồi của bạn tại đây...',
        sendFeedback: 'Gửi phản hồi',
        completeForm: 'Vui lòng điền đầy đủ thông tin để gửi phản hồi',
        readyToSend: 'Chạm để gửi phản hồi của bạn',
        thankYou: 'Cảm ơn bạn!',
        feedbackSentMessage: 'Phản hồi của bạn đã được gửi thành công. Chúng tôi trân trọng đóng góp của bạn!',
        errorSending: 'Lỗi gửi phản hồi',
        errorSendingMessage: 'Không thể gửi phản hồi. Vui lòng thử lại sau.',
        mailNotAvailable: 'Không có email',
        mailNotAvailableMessage: 'Vui lòng cấu hình tài khoản email trên thiết bị để gửi phản hồi.',
        category: 'Danh mục',
        appVersion: 'Phiên bản ứng dụng',
        platform: 'Nền tảng',
        feedbackSubject: 'Phản hồi',
        categories: {
            issue: 'Báo cáo vấn đề',
            improve: 'Đề xuất cải tiến',
            feature: 'Yêu cầu tính năng',
            other: 'Phản hồi khác',
        },
    },

    aiBoard: {
        // AI Board main screen
        title: 'Bảng AI',
        subtitle: 'Theo dõi tác vụ được giao cho AI qua các kho lưu trữ',
        featureDisabled: 'Bảng AI đã tắt',
        featureDisabledDescription: 'Bật Bảng AI trong Cài đặt > Tính năng để theo dõi tác vụ được giao cho AI từ GitHub và GitLab.',
        enableFeature: 'Bật Bảng AI',
        welcomeTitle: 'Chào mừng đến với Bảng AI',
        welcomeDescription: 'Kết nối tài khoản GitHub và GitLab của bạn để bắt đầu theo dõi các tác vụ được giao cho AI với nhãn như "ai-d3".',
        setupProviders: 'Thiết lập Nhà cung cấp',
        selectRepository: 'Chọn Kho lưu trữ',
        selectRepositoryFooter: 'Chọn một kho lưu trữ để xem các tác vụ được giao cho AI.',
        chooseRepository: 'Chọn Kho lưu trữ',
        noRepositorySelected: 'Chưa chọn kho lưu trữ',
        kanbanComingSoon: 'Bảng Kanban',
        kanbanComingSoonDescription: 'Giao diện bảng kanban đang được xây dựng. Hãy quay lại sớm nhé!',
        
        // Task statuses
        todo: 'Cần làm',
        inProgress: 'Đang thực hiện',
        done: 'Hoàn thành',
        
        // Providers
        github: 'GitHub',
        gitlab: 'GitLab',
        
        // Setup
        setup: {
            title: 'Thiết lập Bảng AI',
            subtitle: 'Cấu hình nhà cung cấp GitHub và GitLab',
            configured: 'Đã cấu hình',
            notConfigured: 'Chưa cấu hình',
            testConnection: 'Kiểm tra kết nối',
            testing: 'Đang kiểm tra...',
            testSuccess: 'Kết nối thành công',
            testFailed: 'Kết nối thất bại',
            saveConfiguration: 'Lưu cấu hình',
            saveError: 'Không thể lưu cấu hình. Vui lòng thử lại.',
            
            // GitHub
            githubInstructions: 'Nhập mã token truy cập cá nhân GitHub với phạm vi "repo" để truy cập các vấn đề của kho lưu trữ.',
            githubTokenPlaceholder: 'ghp_xxxxxxxxxxxxxxxxxxxx',
            githubTokenInstructions: 'Tạo token truy cập cá nhân tại',
            githubConnected: ({ username }: { username: string }) => `Đã kết nối thành công với GitHub dưới tên ${username}`,
            githubConnectionError: 'Không thể kết nối với GitHub. Vui lòng kiểm tra token của bạn.',
            
            // GitLab
            gitlabInstructions: 'Nhập mã token truy cập cá nhân GitLab với phạm vi "api". Để trống tên miền cho gitlab.com.',
            gitlabDomainLabel: 'Tên miền GitLab (tùy chọn)',
            gitlabDomainPlaceholder: 'gitlab.example.com',
            gitlabTokenLabel: 'Token truy cập cá nhân',
            gitlabTokenPlaceholder: 'glpat-xxxxxxxxxxxxxxxxxxxx',
            gitlabTokenInstructions: 'Tạo token truy cập cá nhân tại',
            gitlabConnected: ({ username, domain }: { username: string; domain: string }) => `Đã kết nối thành công với GitLab dưới tên ${username} trên ${domain}`,
            gitlabConnectionError: ({ domain }: { domain: string }) => `Không thể kết nối với GitLab trên ${domain}. Vui lòng kiểm tra token và tên miền.`,
        },
    },

    settingsLanguage: {
        // Language settings screen
        title: 'Ngôn ngữ',
        description: 'Chọn ngôn ngữ ưa thích cho giao diện ứng dụng. Cài đặt này sẽ đồng bộ trên tất cả thiết bị của bạn.',
        currentLanguage: 'Ngôn ngữ hiện tại',
        automatic: 'Tự động',
        automaticSubtitle: 'Phát hiện từ cài đặt thiết bị',
        needsRestart: 'Ngôn ngữ đã thay đổi',
        needsRestartMessage: 'Ứng dụng cần khởi động lại để áp dụng cài đặt ngôn ngữ mới.',
        restartNow: 'Khởi động lại ngay',
        languages: {
            en: 'English',
            ru: 'Русский',
            pl: 'Polski',
            vi: 'Tiếng Việt',
        }
    },

    settingsVoice: {
        // Voice settings screen
        languageTitle: 'Ngôn ngữ',
        languageDescription: 'Chọn ngôn ngữ ưa thích cho tương tác với trợ lý giọng nói. Cài đặt này đồng bộ trên tất cả thiết bị.',
        preferredLanguage: 'Ngôn ngữ ưa thích',
        preferredLanguageSubtitle: 'Ngôn ngữ dùng cho phản hồi trợ lý giọng nói',
        language: {
            searchPlaceholder: 'Tìm kiếm ngôn ngữ...',
            title: 'Ngôn ngữ',
            footer: ({ count }: { count: number }) => `${count} ${plural({ count, singular: 'ngôn ngữ', plural: 'ngôn ngữ' })} có sẵn`,
            autoDetect: 'Tự động phát hiện',
        }
    },

    errors: {
        networkError: 'Lỗi kết nối mạng',
        serverError: 'Lỗi máy chủ',
        unknownError: 'Đã xảy ra lỗi không xác định',
        connectionTimeout: 'Hết thời gian kết nối',
        authenticationFailed: 'Xác thực thất bại',
        permissionDenied: 'Quyền truy cập bị từ chối',
        fileNotFound: 'Không tìm thấy tệp',
        invalidFormat: 'Định dạng không hợp lệ',
        operationFailed: 'Thao tác thất bại',
        tryAgain: 'Vui lòng thử lại',
        contactSupport: 'Liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục',
        sessionNotFound: 'Không tìm thấy phiên làm việc',
        voiceSessionFailed: 'Không thể bắt đầu phiên giọng nói',

        // Error functions with context
        fieldError: ({ field, reason }: { field: string; reason: string }) =>
            `${field}: ${reason}`,
        validationError: ({ field, min, max }: { field: string; min: number; max: number }) =>
            `${field} phải nằm trong khoảng ${min} đến ${max}`,
        retryIn: ({ seconds }: { seconds: number }) =>
            `Thử lại sau ${seconds} giây`,
        errorWithCode: ({ message, code }: { message: string; code: number | string }) =>
            `${message} (Mã lỗi ${code})`,
    },

    newSession: {
        // Used by new-session screen and launch flows
        title: 'Bắt đầu phiên mới',
        noMachinesFound: 'Không tìm thấy máy nào. Hãy khởi động phiên D3 AI trên máy tính trước.',
        allMachinesOffline: 'Tất cả máy đều ngoại tuyến',
        machineOfflineHelp: {
            computerOnline: '• Máy tính của bạn có trực tuyến không?',
            daemonRunning: '• D3 AI daemon có đang chạy không? Kiểm tra với `happy daemon status`'
        },
        machineDetails: 'Xem chi tiết máy →',
        sessionStarted: 'Phiên đã bắt đầu',
        sessionStartedMessage: 'Phiên đã được khởi động nhưng có thể mất một lúc để hiển thị.',
        sessionSpawningFailed: 'Không thể tạo phiên - không có ID phiên được trả về.',
        failedToStart: 'Không thể bắt đầu phiên. Đảm bảo daemon đang chạy trên máy đích.',
        sessionTimeout: 'Hết thời gian khởi động phiên. Máy có thể chậm hoặc daemon không phản hồi.',
        notConnectedToServer: 'Chưa kết nối với máy chủ. Kiểm tra kết nối internet của bạn.'
    },

    session: {
        inputPlaceholder: 'Nhập tin nhắn ...',
        viewDetails: 'Xem chi tiết',
        copyMessage: 'Sao chép tin nhắn',
        deleteSession: 'Xóa phiên',
        confirmDelete: 'Bạn có chắc muốn xóa phiên này?',
    },

    commandPalette: {
        placeholder: 'Nhập lệnh hoặc tìm kiếm...',
        noResults: 'Không tìm thấy kết quả',
        searchSessions: 'Tìm kiếm phiên...',
        recentSessions: 'Phiên gần đây',
    },

    server: {
        // Used by Server Configuration screen (app/(app)/server.tsx)
        serverConfiguration: 'Cấu hình máy chủ',
        enterServerUrl: 'Vui lòng nhập URL máy chủ',
        notValidD3AIServer: 'Không phải máy chủ D3 AI hợp lệ',
        changeServer: 'Đổi máy chủ',
        continueWithServer: 'Tiếp tục với máy chủ này?',
        resetToDefault: 'Đặt lại về mặc định',
        resetServerDefault: 'Đặt lại máy chủ về mặc định?',
        validating: 'Đang xác thực...',
        validatingServer: 'Đang xác thực máy chủ...',
        serverReturnedError: 'Máy chủ trả về lỗi',
        failedToConnectToServer: 'Không thể kết nối với máy chủ',
        currentlyUsingCustomServer: 'Hiện đang sử dụng máy chủ tùy chỉnh',
        customServerUrlLabel: 'URL máy chủ tùy chỉnh',
        advancedFeatureFooter: "Đây là tính năng nâng cao. Chỉ thay đổi máy chủ nếu bạn biết mình đang làm gì. Bạn sẽ cần đăng xuất và đăng nhập lại sau khi thay đổi máy chủ."
    },

    welcome: {
        title: 'AI Assistant Platform',
        subtitle: 'Mã hóa đầu cuối và tài khoản của bạn chỉ được lưu trữ trên thiết bị của bạn.',
        createAccount: 'Tạo tài khoản',
        linkOrRestoreAccount: 'Liên kết hoặc khôi phục tài khoản',
        loginWithMobileApp: 'Đăng nhập bằng ứng dụng di động',
    },

    restore: {
        title: 'Khôi phục tài khoản',
        subtitle: 'Nhập khóa bí mật của bạn để khôi phục tài khoản',
        secretKeyPlaceholder: 'Nhập khóa bí mật...',
        restoring: 'Đang khôi phục...',
        restoreSuccess: 'Tài khoản đã được khôi phục thành công',
        restoreFailed: 'Không thể khôi phục tài khoản',
    },

    machines: {
        title: 'Máy tính',
        noMachines: 'Chưa có máy nào được kết nối',
        addMachine: 'Thêm máy',
        machineOnline: 'Trực tuyến',
        machineOffline: 'Ngoại tuyến',
        lastSeen: 'Lần cuối thấy',
        remove: 'Xóa',
        confirmRemove: 'Bạn có chắc muốn xóa máy này?',
    },

    time: {
        justNow: 'Vừa xong',
        secondsAgo: ({ count }: { count: number }) => `${count} giây trước`,
        minutesAgo: ({ count }: { count: number }) => `${count} phút trước`,
        hoursAgo: ({ count }: { count: number }) => `${count} giờ trước`,
        daysAgo: ({ count }: { count: number }) => `${count} ngày trước`,
        weeksAgo: ({ count }: { count: number }) => `${count} tuần trước`,
        monthsAgo: ({ count }: { count: number }) => `${count} tháng trước`,
        yearsAgo: ({ count }: { count: number }) => `${count} năm trước`,
    },

    modals: {
        // Used across connect flows and settings
        authenticateTerminal: 'Xác thực Terminal',
        pasteUrlFromTerminal: 'Dán URL xác thực từ terminal của bạn',
        deviceLinkedSuccessfully: 'Thiết bị đã liên kết thành công',
        terminalConnectedSuccessfully: 'Terminal đã kết nối thành công',
        invalidAuthUrl: 'URL xác thực không hợp lệ',
        developerMode: 'Chế độ phát triển',
        developerModeEnabled: 'Đã bật chế độ phát triển',
        developerModeDisabled: 'Đã tắt chế độ phát triển',
        disconnectGithub: 'Ngắt kết nối GitHub',
        disconnectGithubConfirm: 'Bạn có chắc chắn muốn ngắt kết nối tài khoản GitHub của mình?',
        disconnect: 'Ngắt kết nối',
        failedToConnectTerminal: 'Không thể kết nối terminal',
        cameraPermissionsRequiredToConnectTerminal: 'Cần quyền truy cập camera để kết nối terminal',
        failedToLinkDevice: 'Không thể liên kết thiết bị',
        cameraPermissionsRequiredToScanQr: 'Cần quyền truy cập camera để quét mã QR'
    },

    sessionInfo: {
        // Used by Session Info screen (app/(app)/session/[id]/info.tsx)
        killSession: 'Hủy phiên',
        killSessionConfirm: 'Bạn có chắc chắn muốn kết thúc phiên này không?',
        happySessionIdCopied: 'ID phiên D3 AI đã sao chép vào clipboard',
        failedToCopySessionId: 'Không thể sao chép ID phiên D3 AI',
        happySessionId: 'ID phiên D3 AI',
        claudeCodeSessionId: 'ID phiên Claude Code',
        claudeCodeSessionIdCopied: 'ID phiên Claude Code đã sao chép vào clipboard',
        failedToCopyClaudeCodeSessionId: 'Không thể sao chép ID phiên Claude Code',
        metadataCopied: 'Metadata đã sao chép vào clipboard',
        failedToCopyMetadata: 'Không thể sao chép metadata',
        failedToKillSession: 'Không thể hủy phiên',
        connectionStatus: 'Trạng thái kết nối',
        created: 'Đã tạo',
        lastUpdated: 'Cập nhật lần cuối',
        sequence: 'Thứ tự',
        quickActions: 'Hành động nhanh',
        viewMachine: 'Xem máy',
        viewMachineSubtitle: 'Xem chi tiết máy và phiên',
        killSessionSubtitle: 'Kết thúc phiên ngay lập tức',
        metadata: 'Metadata',
        host: 'Máy chủ',
        path: 'Đường dẫn',
        operatingSystem: 'Hệ điều hành',
        processId: 'ID tiến trình',
        happyHome: 'Trang chủ D3 AI',
        copyMetadata: 'Sao chép Metadata',
        agentState: 'Trạng thái Agent',
        controlledByUser: 'Được điều khiển bởi người dùng',
        pendingRequests: 'Yêu cầu đang chờ',
        activity: 'Hoạt động',
        thinking: 'Đang suy nghĩ',
        thinkingSince: 'Suy nghĩ từ',
        
    },

    tools: {
        fullView: {
            description: 'Mô tả',
            inputParams: 'Tham số đầu vào',
            output: 'Đầu ra',
            error: 'Lỗi',
            completed: 'Công cụ hoàn thành thành công',
            noOutput: 'Không có đầu ra nào được tạo',
            running: 'Công cụ đang chạy...',
            rawJsonDevMode: 'JSON thô (Chế độ phát triển)',
        },
        taskView: {
            initializing: 'Đang khởi tạo agent...',
            moreTools: ({ count }: { count: number }) => `+${count} công cụ khác`,
        },
        multiEdit: {
            editNumber: ({ index, total }: { index: number; total: number }) => `Chỉnh sửa ${index} trong ${total}`,
            replaceAll: 'Thay thế tất cả',
        },
        names: {
            task: 'Nhiệm vụ',
            terminal: 'Terminal',
            searchFiles: 'Tìm tệp',
            search: 'Tìm kiếm',
            searchContent: 'Tìm nội dung',
            listFiles: 'Liệt kê tệp',
            planProposal: 'Đề xuất kế hoạch',
            readFile: 'Đọc tệp',
            editFile: 'Chỉnh sửa tệp',
            writeFile: 'Ghi tệp',
            fetchUrl: 'Lấy URL',
            readNotebook: 'Đọc notebook',
            editNotebook: 'Chỉnh sửa notebook',
            todoList: 'Danh sách việc cần làm',
            webSearch: 'Tìm kiếm web',
        },
        desc: {
            terminalCmd: ({ cmd }: { cmd: string }) => `Terminal(cmd: ${cmd})`,
            searchPattern: ({ pattern }: { pattern: string }) => `Tìm(pattern: ${pattern})`,
            searchPath: ({ basename }: { basename: string }) => `Tìm(path: ${basename})`,
            fetchUrlHost: ({ host }: { host: string }) => `Lấy URL(url: ${host})`,
            editNotebookMode: ({ path, mode }: { path: string; mode: string }) => `Chỉnh sửa Notebook(file: ${path}, mode: ${mode})`,
            todoListCount: ({ count }: { count: number }) => `Danh sách việc cần làm(count: ${count})`,
            webSearchQuery: ({ query }: { query: string }) => `Tìm kiếm web(query: ${query})`,
            grepPattern: ({ pattern }: { pattern: string }) => `grep(pattern: ${pattern})`,
            multiEditEdits: ({ path, count }: { path: string; count: number }) => `${path} (${count} chỉnh sửa)`,
        }
    },

    fileTypes: {
        document: 'Tài liệu',
        image: 'Hình ảnh',
        video: 'Video',
        audio: 'Âm thanh',
        code: 'Mã nguồn',
        archive: 'Lưu trữ',
        text: 'Văn bản',
        pdf: 'PDF',
        spreadsheet: 'Bảng tính',
        presentation: 'Trình chiếu',
        unknown: 'Không xác định',
    },

    permissions: {
        camera: 'Máy ảnh',
        microphone: 'Microphone',
        location: 'Vị trí',
        notifications: 'Thông báo',
        storage: 'Lưu trữ',
        contacts: 'Danh bạ',
        calendar: 'Lịch',
        required: 'Yêu cầu',
        optional: 'Tùy chọn',
        denied: 'Đã từ chối',
        granted: 'Đã cấp',
    },

    components: {
        emptyMainScreen: {
            // Used by EmptyMainScreen component
            readyToCode: 'Sẵn sàng để code?',
            installCli: 'Cài đặt D3 AI CLI',
            runIt: 'Chạy nó',
            scanQrCode: 'Quét mã QR',
            openCamera: 'Mở camera',
        },
        emptyState: {
            noData: 'Không có dữ liệu',
            noResults: 'Không có kết quả',
            tryAgain: 'Thử lại',
            goBack: 'Quay lại',
        },
        loading: {
            loading: 'Đang tải...',
            pleaseWait: 'Vui lòng đợi...',
            almostDone: 'Sắp xong...',
        },
        search: {
            search: 'Tìm kiếm',
            searchPlaceholder: 'Tìm kiếm...',
            clear: 'Xóa',
            filter: 'Lọc',
            sort: 'Sắp xếp',
        },
        pagination: {
            previous: 'Trước',
            next: 'Sau',
            first: 'Đầu',
            last: 'Cuối',
            page: 'Trang',
            of: 'của',
            showing: 'Hiển thị',
            to: 'đến',
            results: 'kết quả',
        },
    },

    navigation: {
        // Navigation titles and screen headers
        connectTerminal: 'Kết nối Terminal',
        linkNewDevice: 'Liên kết thiết bị mới', 
        restoreWithSecretKey: 'Khôi phục với khóa bí mật',
        whatsNew: "Có gì mới",
    },

    actions: {
        add: 'Thêm',
        remove: 'Xóa',
        edit: 'Sửa',
        save: 'Lưu',
        cancel: 'Hủy',
        delete: 'Xóa',
        duplicate: 'Nhân bản',
        copy: 'Sao chép',
        paste: 'Dán',
        cut: 'Cắt',
        undo: 'Hoàn tác',
        redo: 'Làm lại',
        selectAll: 'Chọn tất cả',
        clear: 'Xóa',
        reset: 'Đặt lại',
        submit: 'Gửi',
        confirm: 'Xác nhận',
        reject: 'Từ chối',
        approve: 'Chấp thuận',
        share: 'Chia sẻ',
        download: 'Tải xuống',
        upload: 'Tải lên',
        import: 'Nhập',
        export: 'Xuất',
        print: 'In',
        refresh: 'Làm mới',
        retry: 'Thử lại',
        skip: 'Bỏ qua',
        continue: 'Tiếp tục',
        finish: 'Hoàn thành',
        start: 'Bắt đầu',
        stop: 'Dừng',
        pause: 'Tạm dừng',
        resume: 'Tiếp tục',
        restart: 'Khởi động lại',
    },

    validation: {
        required: 'Trường này là bắt buộc',
        invalid: 'Giá trị không hợp lệ',
        tooShort: 'Quá ngắn',
        tooLong: 'Quá dài',
        invalidEmail: 'Email không hợp lệ',
        invalidUrl: 'URL không hợp lệ',
        invalidNumber: 'Số không hợp lệ',
        invalidDate: 'Ngày không hợp lệ',
        invalidTime: 'Thời gian không hợp lệ',
        invalidPassword: 'Mật khẩu không hợp lệ',
        passwordMismatch: 'Mật khẩu không khớp',
        weakPassword: 'Mật khẩu quá yếu',
        duplicateEntry: 'Mục này đã tồn tại',
    },

    notifications: {
        success: 'Thành công',
        error: 'Lỗi',
        warning: 'Cảnh báo',
        info: 'Thông tin',
        newMessage: 'Tin nhắn mới',
        updateAvailable: 'Có cập nhật mới',
        connectionLost: 'Mất kết nối',
        connectionRestored: 'Đã khôi phục kết nối',
        syncComplete: 'Đồng bộ hoàn tất',
        syncFailed: 'Đồng bộ thất bại',
    },

    settingsAccount: {
        // Account settings screen
        accountInformation: 'Thông tin tài khoản',
        status: 'Trạng thái',
        statusActive: 'Hoạt động',
        statusNotAuthenticated: 'Chưa xác thực',
        anonymousId: 'ID ẩn danh',
        publicId: 'ID công khai',
        notAvailable: 'Không có sẵn',
        linkNewDevice: 'Liên kết thiết bị mới',
        linkNewDeviceSubtitle: 'Quét mã QR để liên kết thiết bị',
        profile: 'Hồ sơ',
        name: 'Tên',
        github: 'GitHub',
        tapToDisconnect: 'Chạm để ngắt kết nối',
        server: 'Máy chủ',
        backup: 'Sao lưu',
        backupDescription: 'Khóa bí mật của bạn là cách duy nhất để khôi phục tài khoản. Hãy lưu nó ở nơi an toàn như trình quản lý mật khẩu.',
        secretKey: 'Khóa bí mật',
        tapToReveal: 'Chạm để hiển thị',
        tapToHide: 'Chạm để ẩn',
        secretKeyLabel: 'KHÓA BÍ MẬT (CHẠM ĐỂ SAO CHÉP)',
        secretKeyCopied: 'Đã sao chép khóa bí mật vào clipboard. Hãy lưu ở nơi an toàn!',
        secretKeyCopyFailed: 'Không thể sao chép khóa bí mật',
        privacy: 'Riêng tư',
        privacyDescription: 'Giúp cải thiện ứng dụng bằng cách chia sẻ dữ liệu sử dụng ẩn danh. Không thu thập thông tin cá nhân.',
        analytics: 'Phân tích',
        analyticsDisabled: 'Không chia sẻ dữ liệu',
        analyticsEnabled: 'Chia sẻ dữ liệu sử dụng ẩn danh',
        dangerZone: 'Khu vực nguy hiểm',
        logout: 'Đăng xuất',
        logoutSubtitle: 'Đăng xuất và xóa dữ liệu cục bộ',
        logoutConfirm: 'Bạn có chắc chắn muốn đăng xuất? Hãy đảm bảo đã sao lưu khóa bí mật!',
    },

    connectButton: {
        authenticate: 'Xác thực Terminal',
        authenticateWithUrlPaste: 'Xác thực Terminal với dán URL',
        pasteAuthUrl: 'Dán URL xác thực từ terminal của bạn',
    },

    updateBanner: {
        updateAvailable: 'Có cập nhật mới',
        pressToApply: 'Nhấn để áp dụng cập nhật',
        whatsNew: 'Có gì mới',
        seeLatest: 'Xem các cập nhật và cải tiến mới nhất',
    },

    changelog: {
        // Used by the changelog screen
        version: ({ version }: { version: number }) => `Phiên bản ${version}`,
        noEntriesAvailable: 'Không có mục nhật ký thay đổi nào.',
    },

    terminal: {
        // Used by terminal connection screens
        webBrowserRequired: 'Yêu cầu trình duyệt Web',
        webBrowserRequiredDescription: 'Liên kết kết nối terminal chỉ có thể mở trong trình duyệt web vì lý do bảo mật. Vui lòng sử dụng máy quét mã QR hoặc mở liên kết này trên máy tính.',
        processingConnection: 'Đang xử lý kết nối...',
        invalidConnectionLink: 'Liên kết kết nối không hợp lệ',
        invalidConnectionLinkDescription: 'Liên kết kết nối bị thiếu hoặc không hợp lệ. Vui lòng kiểm tra URL và thử lại.',
        connectTerminal: 'Kết nối Terminal',
        terminalRequestDescription: 'Một terminal đang yêu cầu kết nối tới tài khoản D3 AI của bạn. Điều này sẽ cho phép terminal gửi và nhận tin nhắn một cách an toàn.',
        connectionDetails: 'Chi tiết kết nối',
        publicKey: 'Khóa công khai',
        encryption: 'Mã hóa',
        endToEndEncrypted: 'Mã hóa đầu cuối',
        acceptConnection: 'Chấp nhận kết nối',
        connecting: 'Đang kết nối...',
        reject: 'Từ chối',
        security: 'Bảo mật',
        securityFooter: 'Liên kết kết nối này được xử lý an toàn trong trình duyệt và không bao giờ được gửi đến máy chủ. Dữ liệu riêng tư của bạn sẽ được bảo mật và chỉ bạn mới có thể giải mã tin nhắn.',
        securityFooterDevice: 'Kết nối này được xử lý an toàn trên thiết bị và không bao giờ được gửi đến máy chủ. Dữ liệu riêng tư của bạn sẽ được bảo mật và chỉ bạn mới có thể giải mã tin nhắn.',
        clientSideProcessing: 'Xử lý phía Client',
        linkProcessedLocally: 'Liên kết được xử lý cục bộ trong trình duyệt',
        linkProcessedOnDevice: 'Liên kết được xử lý cục bộ trên thiết bị',
    },

    agentInput: {
        permissionMode: {
            title: 'CHẾ ĐỘ QUYỀN',
            default: 'Mặc định',
            acceptEdits: 'Chấp nhận chỉnh sửa',
            plan: 'Chế độ kế hoạch',
            bypassPermissions: 'Chế độ Yolo',
            badgeAcceptAllEdits: 'Chấp nhận tất cả chỉnh sửa',
            badgeBypassAllPermissions: 'Bỏ qua tất cả quyền',
            badgePlanMode: 'Chế độ kế hoạch',
        },
        model: {
            title: 'MÔ HÌNH',
            default: 'Sử dụng cài đặt CLI',
            adaptiveUsage: 'Opus tới 50% sử dụng, sau đó Sonnet',
            sonnet: 'Sonnet',
            opus: 'Opus',
        },
        context: {
            remaining: ({ percent }: { percent: number }) => `Còn ${percent}%`,
        },
        suggestion: {
            fileLabel: 'TỆP',
            folderLabel: 'THƯ MỤC',
        }
    },

    machineLauncher: {
        showLess: 'Hiển thị ít hơn',
        showAll: ({ count }: { count: number }) => `Hiển thị tất cả (${count} đường dẫn)`,
        enterCustomPath: 'Nhập đường dẫn tùy chỉnh',
        offlineUnableToSpawn: 'Không thể tạo phiên mới, ngoại tuyến',
    },

    sidebar: {
        sessionsTitle: 'Phiên làm việc',
    },

    toolView: {
        input: 'Đầu vào',
        output: 'Đầu ra',
    },

    files: {
        searchPlaceholder: 'Tìm kiếm tệp...',
        detachedHead: 'detached HEAD',
        summary: ({ staged, unstaged }: { staged: number; unstaged: number }) => `${staged} đã staged • ${unstaged} chưa staged`,
        notRepo: 'Không phải repository git',
        notUnderGit: 'Thư mục này không nằm trong hệ thống quản lý phiên bản git',
        searching: 'Đang tìm kiếm tệp...',
        noFilesFound: 'Không tìm thấy tệp nào',
        noFilesInProject: 'Không có tệp trong dự án',
        tryDifferentTerm: 'Thử từ khóa tìm kiếm khác',
        searchResults: ({ count }: { count: number }) => `Kết quả tìm kiếm (${count})`,
        projectRoot: 'Thư mục gốc dự án',
        stagedChanges: ({ count }: { count: number }) => `Thay đổi đã staged (${count})`,
        unstagedChanges: ({ count }: { count: number }) => `Thay đổi chưa staged (${count})`,
        // File viewer strings
        loadingFile: ({ fileName }: { fileName: string }) => `Đang tải ${fileName}...`,
        binaryFile: 'Tệp nhị phân',
        cannotDisplayBinary: 'Không thể hiển thị nội dung tệp nhị phân',
        diff: 'So sánh',
        file: 'Tệp',
        fileEmpty: 'Tệp trống',
        noChanges: 'Không có thay đổi để hiển thị',
    },

    review: {
        // Used by utils/requestReview.ts
        enjoyingApp: 'Bạn có thích ứng dụng này không?',
        feedbackPrompt: "Chúng tôi rất muốn nghe phản hồi từ bạn!",
        yesILoveIt: 'Có, tôi yêu thích nó!',
        notReally: 'Không thực sự'
    },

    items: {
        // Used by Item component for copy toast
        copiedToClipboard: ({ label }: { label: string }) => `${label} đã sao chép vào clipboard`
    },

    machine: {
        launchNewSessionInDirectory: 'Khởi tạo phiên mới trong thư mục',
        daemon: 'Daemon',
        status: 'Trạng thái',
        stopDaemon: 'Dừng Daemon',
        lastKnownPid: 'PID cuối cùng đã biết',
        lastKnownHttpPort: 'Cổng HTTP cuối cùng đã biết',
        startedAt: 'Bắt đầu lúc',
        cliVersion: 'Phiên bản CLI',
        daemonStateVersion: 'Phiên bản trạng thái Daemon',
        activeSessions: ({ count }: { count: number }) => `Phiên hoạt động (${count})`,
        machineGroup: 'Máy',
        host: 'Máy chủ',
        machineId: 'ID máy',
        username: 'Tên người dùng',
        homeDirectory: 'Thư mục home',
        platform: 'Nền tảng',
        architecture: 'Kiến trúc',
        lastSeen: 'Lần thấy cuối',
        never: 'Không bao giờ',
        metadataVersion: 'Phiên bản metadata',
        untitledSession: 'Phiên không tên',
        back: 'Quay lại',
    },

    message: {
        switchedToMode: ({ mode }: { mode: string }) => `Đã chuyển sang chế độ ${mode}`,
        unknownEvent: 'Sự kiện không xác định',
        usageLimitUntil: ({ time }: { time: string }) => `Giới hạn sử dụng đến ${time}`,
        unknownTime: 'thời gian không xác định',
    }
};
