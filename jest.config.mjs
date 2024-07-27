/** @type {import('jest').Config} */
const config = {
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                filename: 'api-tests-report.html',
                darkTheme: true,
                openReport: false,
            },
        ],
    ]
}

export default config
