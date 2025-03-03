import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: '0e96f321-ed5c-4c25-bba2-90cab892de67',
        enableAutoRouteTracking: true, // Optional: Enables automatic route tracking for Single Page Applications
        loggingLevelConsole: 2 // 0: OFF, 1: ERROR, 2: WARN, 3: INFO, 4: DEBUG
    }
});
appInsights.loadAppInsights();
appInsights.trackPageView(); // Manually call trackPageView to establish the current user/session/pageview

// Automatically collect unhandled exceptions
window.onerror = function (message, source, lineno, colno, error) {
    appInsights.trackException({ error: error });
};

// Manually track a custom exception
try {
    // Simulate an error
    throw new Error('This is a custom error');
} catch (error) {
    appInsights.trackException({ error: error });
}