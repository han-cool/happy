/**
 * Vietnamese translations for the Happy app
 * Bản dịch tiếng Việt cho ứng dụng Happy
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
        aboutFooter: 'Happy Coder là ứng dụng di động cho Claude Code. Được mã hóa đầu cuối hoàn toàn và tài khoản của bạn chỉ được lưu trên thiết bị. Không liên kết với Anthropic.',
        whatsNew: 'Có gì mới',
        whatsNewSubtitle: 'Xem các cập nhật và cải tiến mới nhất',
        reportIssue: 'Báo cáo vấn đề',
        privacyPolicy: 'Chính sách bảo mật',
        termsOfService: 'Điều khoản dịch vụ',
        eula: 'EULA',
        supportUs: 'Ủng hộ chúng tôi',
        supportUsSubtitlePro: 'Cảm ơn sự ủng hộ của bạn!',
        supportUsSubtitle: 'Hỗ trợ phát triển dự án',
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
        webFeatures: 'Tính năng Web',
        webFeaturesDescription: 'Tính năng chỉ có trong phiên bản web của ứng dụng.',
        commandPalette: 'Bảng lệnh',
        commandPaletteEnabled: 'Nhấn ⌘K để mở',
        commandPaletteDisabled: 'Truy cập lệnh nhanh đã tắt',
    },

    settingsLanguage: {
        title: 'Ngôn ngữ',
        description: 'Chọn ngôn ngữ hiển thị cho ứng dụng',
        currentLanguage: 'Ngôn ngữ hiện tại',
        automatic: 'Tự động',
        languages: {
            en: 'Tiếng Anh',
            ru: 'Tiếng Nga',
            pl: 'Tiếng Ba Lan',
            es: 'Tiếng Tây Ban Nha',
            vi: 'Tiếng Việt',
        },
    },

    settingsVoice: {
        title: 'Giọng nói',
        description: 'Cấu hình cài đặt trợ lý giọng nói',
        language: 'Ngôn ngữ giọng nói',
        languageDescription: 'Chọn ngôn ngữ cho trợ lý giọng nói',
        automatic: 'Tự động phát hiện',
        currentLanguage: 'Ngôn ngữ hiện tại',
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
        noMachinesFound: 'Không tìm thấy máy nào. Hãy khởi động phiên Happy trên máy tính trước.',
        allMachinesOffline: 'Tất cả máy đều ngoại tuyến',
        machineOfflineHelp: {
            computerOnline: '• Máy tính của bạn có trực tuyến không?',
            daemonRunning: '• Happy daemon có đang chạy không? Kiểm tra với `happy daemon status`'
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
        // Used by Server Configuration screen
        title: 'Cấu hình máy chủ',
        currentServer: 'Máy chủ hiện tại',
        changeServer: 'Đổi máy chủ',
        serverUrl: 'URL máy chủ',
        testConnection: 'Kiểm tra kết nối',
        connectionSuccessful: 'Kết nối thành công',
        connectionFailed: 'Kết nối thất bại',
    },

    welcome: {
        title: 'Chào mừng đến với Happy',
        subtitle: 'Điều khiển Claude Code từ bất cứ đâu',
        createAccount: 'Tạo tài khoản',
        linkOrRestoreAccount: 'Liên kết hoặc khôi phục tài khoản',
        alreadyHaveAccount: 'Đã có tài khoản?',
        signIn: 'Đăng nhập',
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
        confirm: 'Xác nhận',
        cancel: 'Hủy',
        delete: 'Xóa',
        save: 'Lưu',
        discard: 'Hủy bỏ',
        apply: 'Áp dụng',
        close: 'Đóng',
        areYouSure: 'Bạn có chắc chắn không?',
        unsavedChanges: 'Bạn có thay đổi chưa lưu. Bạn có muốn lưu không?',
        deleteConfirmation: 'Hành động này không thể hoàn tác.',
    },

    sessionInfo: {
        title: 'Thông tin phiên',
        id: 'ID phiên',
        created: 'Đã tạo',
        updated: 'Cập nhật',
        status: 'Trạng thái',
        messages: 'Tin nhắn',
        files: 'Tệp tin',
        context: 'Ngữ cảnh',
        agentState: 'Trạng thái Agent',
        metadata: 'Metadata',
    },

    tools: {
        view: 'Xem',
        edit: 'Chỉnh sửa',
        delete: 'Xóa',
        create: 'Tạo',
        update: 'Cập nhật',
        read: 'Đọc',
        write: 'Ghi',
        execute: 'Thực thi',
        search: 'Tìm kiếm',
        replace: 'Thay thế',
        approve: 'Chấp thuận',
        deny: 'Từ chối',
        skip: 'Bỏ qua',
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
        home: 'Trang chủ',
        settings: 'Cài đặt',
        profile: 'Hồ sơ',
        help: 'Trợ giúp',
        about: 'Giới thiệu',
        logout: 'Đăng xuất',
        back: 'Quay lại',
        forward: 'Tiếp',
        refresh: 'Làm mới',
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
};